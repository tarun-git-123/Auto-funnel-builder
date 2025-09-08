import { connectToDB } from '@/lib/mongodb'
import { Funnel } from '@/models/Funnel';
import React from 'react'
import CodeEditorWrapper from './CodeEditorWrapper';
import { EditorProvider } from '@/context/EditorContext';
export default async function codeEditorPage({ params }: { params: { funnelId: string } }) {
    const { funnelId } = (await params)
    await connectToDB();
    const funnel = await Funnel.findById(funnelId);
    if (!funnel) return <div>Funnel not found</div>

    return (
        <>
            <div className="w-full h-full text-white">
                <EditorProvider funnelName={funnel.siteName} funnelUrl={funnel.deployedUrl}>
                    <CodeEditorWrapper/>
                </EditorProvider>
            </div>
        </>
    )
}
