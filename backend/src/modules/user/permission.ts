import { model, Schema, Types, Document } from "mongoose";

const PermissionSchema = new Schema<Permission>(
    {
        name: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

export const PermissionModel = model<Permission>("Permission", PermissionSchema);
