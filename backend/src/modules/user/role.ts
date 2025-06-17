import { model, Schema, Document, Types } from "mongoose";
import { Permission } from "./permission";

export interface Role extends Document {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    permissions: Permission[];
}

const RoleSchema = new Schema<Role>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    },
    { timestamps: true },
);

export const RoleModel = model<Role>("Role", RoleSchema);
