import React from 'react';
import Editor from '@monaco-editor/react';
import { EditorOpenedFile, EditorState } from '@/types/site-config';
import { detectLanguageByPath } from '@/utils/detectedLanguage';
import { X } from 'lucide-react';

interface CodeEditorProps {
    editorState: EditorState;
    setState: (updates: Partial<EditorState>) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ editorState, setState }) => {

    const handleActiveFile = (file: EditorOpenedFile) => {
        setState({ activeFile: file, selectedPath: file.path });
    };

    const handleCloseFile = (file: EditorOpenedFile) => {
        const updatedFile = editorState.openedFiles.filter(f => f.path !== file.path);
        setState({ openedFiles: updatedFile, activeFile: updatedFile[updatedFile.length - 1] || null });
    };

    const handleEditorChange = (value: string | undefined) => {
        if (!editorState.activeFile) return;
        setState({
            activeFile: { ...editorState.activeFile, content: value || '', dirty: true },
            openedFiles: editorState.openedFiles.map(file =>
                file.path === editorState.activeFile?.path
                    ? { ...file, content: value || '', dirty:true }
                    : file
            )
        });
    };

    return (
        <div className="w-[80%] bg-[#1e1e1e] flex flex-col h-[90vh]">
            {editorState.openedFiles.length > 0 ? (
                <>

                    {/* Tabs Section */}
                    <div className="w-full bg-[#252526] border-b border-gray-700 flex overflow-x-auto hide-scrollbar">
                        {editorState.openedFiles.map((openedFile) => {
                            const activeTab = editorState.activeFile?.path === openedFile.path;
                            return (
                                <div
                                    key={openedFile.path}
                                    onClick={() => handleActiveFile(openedFile)}
                                    className={`flex items-center px-4 py-[9px] text-sm cursor-pointer group transition-all duration-200
          ${activeTab ? "bg-[#1e1e1e] text-white" : "text-gray-400 hover:text-white hover:bg-[#2d2d2d]"}
          border-r border-gray-700 min-w-[140px] max-w-[220px] overflow-hidden`}
                                >
                                    {/* File Name */}
                                    <span className="truncate flex-1" title={openedFile.path}>
                                        {openedFile.name}
                                    </span>

                                    {/* Close Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCloseFile(openedFile);
                                        }}
                                        className="ml-2 opacity-0 group-hover:opacity-100 rounded-md text-gray-500 hover:text-white hover:bg-gray-600 p-1 transition"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Monaco Editor */}
                    <div className="flex-1 overflow-hidden">
                        <Editor
                            height="100%"
                            language={detectLanguageByPath(editorState?.activeFile?.path || '')}
                            value={editorState?.activeFile?.content || ''}
                            path={editorState?.activeFile?.path || ''}
                            theme={`vs-${editorState.theme}`}
                            onChange={handleEditorChange}
                            options={{
                                wordWrap: 'on',
                                minimap: { enabled: false },
                                quickSuggestions: true,
                                fontSize: 14,
                            }}
                        />
                    </div>
                </>
            )
                : (
                    <div className="flex-1 flex items-center justify-center">
                        <span className="text-gray-400 text-2xl">No files opened</span>
                    </div>
                )}
        </div>
    );
};

export default CodeEditor;
