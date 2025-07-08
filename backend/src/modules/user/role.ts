import { model, Schema } from "mongoose";
import { RoleModelType } from "../../type/models/userType";

const RoleSchema = new Schema<RoleModelType>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    },
    { timestamps: true },
);

export const RoleModel = model<RoleModelType>("Role", RoleSchema);
