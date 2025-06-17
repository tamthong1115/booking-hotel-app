import { model, Schema, Types, Document } from "mongoose";

export interface Permission extends Document {
    _id: Types.ObjectId;
    name: string;
}

const PermissionSchema = new Schema<Permission>(
    {
        name: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

export const PermissionModel = model<Permission>("Permission", PermissionSchema);
