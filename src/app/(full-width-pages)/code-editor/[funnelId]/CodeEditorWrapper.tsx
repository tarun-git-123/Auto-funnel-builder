"use client";
import Sidebar from "./Sidebar";
import CodeEditor from "./CodeEditor";
import Loader from "@/components/Loader";
import EditorHeader from "./EditorHeader";
import { useEditor } from "@/context/EditorContext";

export default function CodeEditorWrapper() {
    const { editorState } = useEditor();

    return (
        <>
            {
                editorState.loading ? (
                    <Loader />
                ) : (
                    <>
                        <EditorHeader />
                        <div className="w-full flex text-white">
                            <Sidebar />
                            <CodeEditor />
                        </div>
                    </>
                )
            }
        </>
    );
}
