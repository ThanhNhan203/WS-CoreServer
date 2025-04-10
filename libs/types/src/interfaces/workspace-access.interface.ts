import {Types} from "mongoose";
import {PermissionEnum} from "../enums/workspace/permission.enum";

export interface WorkspaceAccess {
    IDCollaborator: Types.ObjectId;
    permission: PermissionEnum;
    isDeleted: boolean;
}