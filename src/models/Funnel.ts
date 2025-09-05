import mongoose, { models, model } from "mongoose";

const FunnelSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true,
    },
    template: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: true,
    },
    campaignId: {
        type: String,
        required: true,
    },
    products: [
        {
            id: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
        },
    ],
    primaryColor: {
        type: String,
        required: true,
    },
    secondaryColor: {
        type: String,
        required: true,
    },
    company: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        ein: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    deployedUrl: {
        type: String,
        required: true,
    },
    deployedId: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
    teamId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "active",
    },
    crm: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Funnel = models.Funnel || model("Funnel", FunnelSchema);