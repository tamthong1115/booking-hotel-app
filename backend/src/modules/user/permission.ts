import { model, Schema, Types } from "mongoose";
import { PermissionModelType } from "@type/models/userType";

const PermissionSchema = new Schema<PermissionModelType>(
    {
        name: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

export const PermissionModel = model<PermissionModelType>("Permission", PermissionSchema);
