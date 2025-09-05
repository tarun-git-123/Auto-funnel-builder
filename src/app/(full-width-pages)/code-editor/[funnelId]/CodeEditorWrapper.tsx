"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CodeEditor from "./CodeEditor";
import { EditorOpenedFile, FileType } from "@/types/site-config";
import Loader from "@/components/Loader";
import EditorHeader from "./EditorHeader";

interface EditorState {
    selectedPath: string | null;
    fileTree: FileType[];
    openedFiles: EditorOpenedFile[];
    activeFile: EditorOpenedFile;
    theme: string;
    loading: boolean;
}

export default function CodeEditorWrapper({ funnelName, funnelUrl }: { funnelName: string, funnelUrl: string }) {
    const [editorState, setEditorState] = useState<EditorState>({
        selectedPath: '/',
        fileTree: [],
        openedFiles: [],
        activeFile: { name: '', path: '', content: '' },
        theme: 'dark',
        loading: true
    });


    const setState = (updates: Partial<EditorState>) => {
        setEditorState((prev) => ({ ...prev, ...updates }));
    };

    const fetchFileTree = async() => {
        try {
            const response = await fetch(`/api/files?filePath=${funnelName}`);
            const result = await response.json();
            console.log(result);
            if (result.success) {
                setState({ fileTree: result?.data });
            }
        } catch (error) {
            console.error('Error fetching file tree:', error);
        }finally{
            setState({loading:false})
        }
    };

    useEffect(() => {
        fetchFileTree();
        console.log("hello");
    }, [funnelName])

    // console.log(funnelName);

    return (
        <>
            {
                editorState.loading ? (
                    <Loader />
                ) : (
                    <>
                        <EditorHeader funnelUrl={funnelUrl} funnelName={funnelName} editorState={editorState} setState={setState} />
                        <div className="w-full flex text-white">

                            <Sidebar editorState={editorState} setState={setState} funnelName={funnelName} fetchFileTree={fetchFileTree} />
                            <CodeEditor editorState={editorState} setState={setState} />

                        </div>
                    </>
                )
            }
        </>
    );
}
