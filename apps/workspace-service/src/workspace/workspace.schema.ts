import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { WorkspaceAccess } from '@app/types'; // Adjust the import path as necessary
export type WorkSpaceDocument = WorkSpace & Document;

@Schema({ timestamps: true })
export class WorkSpace {
  
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  IDUser: Types.ObjectId;

  @Prop({ type: String, required: true })
  WorkSpaceName: string;

  @Prop({ type: String })
  WorkSpaceDescription: string;

  @Prop({ type: Boolean, required: true, default: false })
  isDeleted: boolean;


  @Prop({ type: Array })
  access: WorkspaceAccess[];
}

// Create the schema for the WorkSpace class
export const WorkSpaceSchema = SchemaFactory.createForClass(WorkSpace);