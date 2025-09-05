import {Schema, models, model, InferSchemaType} from "mongoose";

const CRMSchema = new Schema({
    label:{
        type:String,
        unique:true,
        required:true
    },
    crm:{
        type:String,
        required:true
    },
    endpoint:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, {timestamps:true});

export type ICRM = InferSchemaType<typeof CRMSchema>

export const CRM = models.CRM || model("CRM", CRMSchema);