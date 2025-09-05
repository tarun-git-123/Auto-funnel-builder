import { useEffect, useState } from 'react'

interface CRM{
    _id:string;
    label:string;
    crm:string;
    endpoint:string;
    username:string;
    password:string;
}
const useCRM = () => {
    const [crms, setCrms] = useState<CRM[]>([]);
    const getCRM = async()=>{
        try {
            const res = await fetch("/api/crm",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json();
            if(data.success){
                setCrms(data.crms);
            }
            
        } catch (error:unknown) {
            if(error instanceof Error){
                console.log("Server Error", error.message);
            }
        }
    }
    useEffect(()=>{
        getCRM();
    },[]);

    return {
        crms
    }
}

export default useCRM
