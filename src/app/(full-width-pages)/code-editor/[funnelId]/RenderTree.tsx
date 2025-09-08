"use client";
import FileExplorerContextMenu from '@/components/FileExplorerContextMenu';
import { useEditor } from '@/context/EditorContext';
import { FileType } from '@/types/site-config';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface RenderTreeProps {
    file: FileType;
}

const RenderTree: React.FC<RenderTreeProps> = ({ file }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = file.isDirectory && file.children?.length! > 0;

    const { setState, editorState, funnelName, readFileContent, handleAddClick, handleRenameClick } = useEditor();

    const toggleFolder = () => {
        if (file.isDirectory) {
            setIsOpen(!isOpen);
        } else {
            readFileContent(file.relativePath, file.name);
        }
        console.log(file.relativePath);
        setState({ selectedPath: file.relativePath });
    };

    const isSelected = file.relativePath === editorState.selectedPath;

    return (
        <>
            <FileExplorerContextMenu
                onAddFile={() => handleAddClick("file", file.relativePath)}
                onAddFolder={() => handleAddClick("folder", file.relativePath)}
                onRename={() => handleRenameClick(file.isDirectory ? "folder" : "file", file)}
                onDelete={() => console.log("Delete", file)}
                
                isDirectory={file.isDirectory}
            >
                <div
                    className={`flex cursor-pointer pl-3 py-[2px] text-gray-100 font-extralight ${isSelected ? 'bg-blue-600/30 hover:bg-blue-600/30' : 'hover:bg-gray-600/30'}`}
                    onClick={toggleFolder}
                >
                    <span className='m-[3px]'>
                        {file.isDirectory && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                    </span>
                    {file.name}
                </div>
            </FileExplorerContextMenu>

            {isOpen && hasChildren && (
                <ul className='pl-4'>
                    {file?.children?.map((item) => (
                        <RenderTree
                            key={item.absolutePath}
                            file={item}
                        />
                    ))}
                </ul>
            )}
        </>
    );
};

export default RenderTree;
