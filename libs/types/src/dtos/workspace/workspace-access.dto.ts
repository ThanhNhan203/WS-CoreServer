import { Types } from "mongoose";

export class WorkSpaceAccessDTO {
   IDCollaborator: Types.ObjectId;
    permission: string;
    isDeleted: boolean;
}