"use client";
import { EditorState, FileType } from '@/types/site-config';
import React, {  useState } from 'react';

interface RenderTreeProps {
    file: FileType;
    editorState: EditorState
    setState: (updates: Partial<EditorState>) => void
    funnelName: string
    readFileContent: (filePath:string, fileName:string) => void
}

const RenderTree: React.FC<RenderTreeProps> = ({ file, setState, editorState, funnelName, readFileContent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = file.isDirectory && file.children?.length! > 0;

    const toggleFolder = () => {
        if (file.isDirectory) {
            setIsOpen(!isOpen);
        }else{
            readFileContent(file.relativePath, file.name);
        }
        console.log(file.relativePath);
        setState({ selectedPath: file.relativePath});
    };

    const isSelected = file.relativePath === editorState.selectedPath;

    return (
        <>
            <div
                className={`cursor-pointer px-1 py-[2px] text-gray-100 rounded font-extralight ${isSelected ? 'bg-gray-800' : ''} hover:bg-gray-800`}
                onClick={toggleFolder}
            >
                <span className='mr-1'>
                    {file.isDirectory && (isOpen ? '📂' : '📁')}
                </span>
                {file.name}
            </div>

            {isOpen && hasChildren && (
                <ul className='pl-4'>
                    {file?.children?.map((item) => (
                        <li key={item.absolutePath}>
                            <RenderTree
                                file={item}
                                editorState={editorState}
                                setState={setState}
                                funnelName={funnelName}
                                readFileContent={readFileContent}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default RenderTree;
