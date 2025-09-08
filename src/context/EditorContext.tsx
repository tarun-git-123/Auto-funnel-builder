"use client";

import { ToastState, useToast } from "@/hooks/useToast";
import { EditorState, FileType } from "@/types/site-config";
import { set } from "mongoose";
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type EditorContextType = {
    editorState: EditorState;
    setState: (updates: Partial<EditorState>) => void;
    toast: ToastState;
    loading: boolean;
    funnelName: string;
    funnelUrl: string;
    modalType: "folder" | "file";
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    editModalOpen: boolean;
    setEditModalOpen: Dispatch<SetStateAction<boolean>>;
    submitting: boolean;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    handleAddClick: (type: "folder" | "file", filePath: string) => void;
    handleRenameClick: (type: "folder" | "file", file: FileType) => void;
    handleFileSave: () => Promise<void>;
    handlePreview: () => Promise<void>;
    fetchFileTree: () => Promise<void>;
    handleAddFile: () => Promise<void>;
    handleRenameFile: () => Promise<void>;
    readFileContent: (filePath: string, fileName: string) => void;

}

const EditorContext = createContext<EditorContextType>({
    editorState: {
        selectedPath: '/',
        fileTree: [],
        openedFiles: [],
        activeFile: null,
        theme: 'dark',
        loading: true
    },
    setState: () => { },
    toast: {
        message: '',
        show: false,
        color: "info"
    },
    loading: false,
    funnelName: '',
    funnelUrl: '',
    modalOpen: false,
    modalType: "folder",
    setModalOpen: () => { },
    editModalOpen: false,
    setEditModalOpen: () => { },
    submitting: false,
    name: '',
    setName: () => { },
    handleAddClick: () => { },
    handleRenameClick: () => { },
    handleFileSave: () => Promise.resolve(),
    handlePreview: () => Promise.resolve(),
    fetchFileTree: () => Promise.resolve(),
    handleAddFile: () => Promise.resolve(),
    handleRenameFile: () => Promise.resolve(),
    readFileContent: () => { },
})


export const EditorProvider: React.FC<{
    children: React.ReactNode, funnelName: string;
    funnelUrl: string;
}> = ({
    children,
    funnelName,
    funnelUrl
}) => {
        const [editorState, setEditorState] = useState<EditorState>({
            selectedPath: '/',
            fileTree: [],
            openedFiles: [],
            activeFile: null,
            theme: 'dark',
            loading: true
        });

        const { toast, showToast } = useToast();
        const [loading, setLoading] = useState<boolean>(false);

        const [modalOpen, setModalOpen] = useState(false);
        const [editModalOpen, setEditModalOpen] = useState(false);
        const [modalType, setModalType] = useState<"folder" | "file">("folder");
        const [name, setName] = useState("");
        const [submitting, setSubmitting] = useState<boolean>(false);

        const handleAddClick = (type: "folder" | "file", filePath: string) => {
            setState({selectedPath: filePath});
            setModalType(type);
            setName("");
            setModalOpen(true);
        };

        const handleRenameClick = (type: "folder" | "file", file: FileType) => {
            setState({selectedPath: file.relativePath});
            setModalType(type);
            setName("");
            setEditModalOpen(true);
        };

        const setState = (updates: Partial<EditorState>) => {
            setEditorState((prev) => ({ ...prev, ...updates }));
        };

        const fetchFileTree = async () => {
            try {
                const response = await fetch(`/api/files?filePath=${funnelName}`);
                const result = await response.json();
                console.log(result);
                if (result.success) {
                    setState({ fileTree: result?.data });
                }
            } catch (error) {
                console.error('Error fetching file tree:', error);
            } finally {
                setState({ loading: false })
            }
        };

        useEffect(() => {
            fetchFileTree();
            console.log("hello");
        }, [funnelName])

        async function handleFileSave() {
            try {
                if (!editorState.activeFile) return
                const file = editorState.activeFile;
                if (!file || !file.dirty) {
                    showToast("No changes to save", "warning");
                    return;
                }

                setLoading(true);
                const res = await fetch(`/api/files/saveFile`, {
                    method: 'POST',
                    body: JSON.stringify({ filePath: editorState.activeFile, funnelName: funnelName }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!res.ok) throw new Error("Failed to save file");

                showToast("File saved successfully", "success");

                setState({
                    activeFile: { ...file, dirty: false },
                    openedFiles: editorState.openedFiles.map((f) => (
                        f.path === file.path ? { ...f, dirty: false } : f
                    ))
                })
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.log(err.message);
                    showToast("Unable to save file. Please try again later.", "error");
                }
            } finally {
                setLoading(false);
            }
        }

        const handlePreview = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/deploy/cli/preview/", {
                    method: "POST",
                    body: JSON.stringify({ funnelName }),
                    headers: { "Content-Type": "application/json" },
                });

                const data = await res.json();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        //console.log(editorState);

        const handleRenameFile = async()=>{
            if(!name.trim()) return
            const oldFilePath = editorState.selectedPath;

            try{
                setSubmitting(true);
                const res = await fetch("/api/files/renameFile", {
                    method: 'PUT',
                    body: JSON.stringify({ oldFilePath: oldFilePath, funnelName: funnelName, name: name, type: modalType }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!res.ok) throw new Error("Failed to rename file");
                const result = await res.json();
                if (!result.success) throw new Error(result.error);
                await fetchFileTree();
                // update openedfile
                console.log(result.relativePath);
                setState({
                    selectedPath : editorState.selectedPath===oldFilePath? result.relativePath : editorState.selectedPath,
                    activeFile : editorState.activeFile?.path === oldFilePath? {...editorState.activeFile, name:name, path:result.relativePath} : editorState.activeFile,
                    openedFiles : editorState.openedFiles.map((f)=>(
                        f.path=== oldFilePath? {...f, name:name, path:result.relativePath} : f
                    )).filter((f) => f.path !== undefined),
                })

                setEditModalOpen(false);
                setName("");
                showToast(`${modalType} renamed successfully`, "success");
            }catch(err : unknown){
                if(err instanceof Error){
                    //console.error(err.message);
                    showToast(err.message, "error");
                }
            }finally{
                setSubmitting(false);
            }
        }
        console.log(editorState);

        const handleAddFile = async () => {
            if (!name.trim()) return;
            const newFilePath = `${editorState.selectedPath}/${name.trim()}`;

            try {
                setSubmitting(true);
                const res = await fetch("/api/files/addFile", {
                    method: 'POST',
                    body: JSON.stringify({ filePath: newFilePath, funnelName: funnelName, name: name, type: modalType }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!res.ok) throw new Error("Failed to add file");
                const result = await res.json();
                if (!result.success) throw new Error(result.error);

                await fetchFileTree();
                setModalOpen(false);
                setName("");
                showToast(`${modalType} added successfully`, "success");
                await readFileContent(result.relativePath, name);
                setState({ selectedPath: result.relativePath, activeFile: { name: name, path: result.relativePath, content: "" } });

            } catch (error: unknown) {
                if (error instanceof Error) {
                    // console.error(error.message);
                    showToast("Failed to add file:", "error");
                }
            } finally {
                setSubmitting(false);
            }
        };


        async function readFileContent(filePath: string, fileName: string) {
            const existingFile = editorState.openedFiles.find(file => file.path === filePath);
            if (existingFile) {
                editorState.activeFile = existingFile
                return;
            }

            try {
                const res = await fetch(`/api/files/readFile?funnelName=${funnelName}&filePath=${filePath}`);
                if (!res.ok) throw new Error("Failed to read file");
                const result = await res.json();

                if (result.success) {
                    const NewFile = { name: fileName, path: filePath, content: result.data };
                    setState({ openedFiles: [...editorState.openedFiles, NewFile], activeFile: NewFile });
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    if (error.name !== "AbortError") {
                        console.error("Error reading file:", error);
                    }
                }
            }
        }


        return (
            <EditorContext.Provider value={{
                editorState,
                setState,
                toast,
                loading,
                funnelUrl,
                funnelName,
                name,
                setName,
                modalType,
                modalOpen,
                setModalOpen,
                editModalOpen,
                setEditModalOpen,
                submitting,
                handleFileSave,
                fetchFileTree,
                handlePreview,
                handleAddFile,
                handleAddClick,
                handleRenameClick,
                readFileContent,
                handleRenameFile
            }}>
                {children}
            </EditorContext.Provider>
        );
    };


export default EditorContext

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a EditorProvider");
    }
    return context;
};