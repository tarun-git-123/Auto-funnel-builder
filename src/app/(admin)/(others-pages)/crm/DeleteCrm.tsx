"use client";
import { Delete } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
    const router = useRouter()
    async function handleDelete() {
        const confirmed = confirm("Are you sure you want to delete? This action cannot be undone.");
        if (!confirmed) return
        await fetch(`/api/crm/${id}`, { method: "DELETE" });
        router.refresh();
    }

    return <button className="text-red-600 mx-1" onClick={handleDelete}><Delete /></button>;
}
