import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WorkSpace, WorkSpaceDocument } from './workspace.schema';
import {
   APIResponse,
   CreateWorkSpaceDTO,
   QueryWorkSpaceDTO,
   UpdateWorkSpaceDTO,
   PermissionEnum,
} from '@app/types';

@Injectable()
export class WorkspaceService {
   constructor(
      @InjectModel(WorkSpace.name) private workspaceModel: Model<WorkSpaceDocument>,
   ) {}

   async create(
      createWorkSpaceDTO: CreateWorkSpaceDTO,
   ): Promise<APIResponse<WorkSpaceDocument>> {
      const workspace = await this.workspaceModel.findOne({
         $or: [{ WorkSpaceName: createWorkSpaceDTO.WorkSpaceName }],
      });

      if (workspace && workspace.isDeleted === false) {
         throw new RpcException({
            message: 'WorkSpace with this name already exists',
            statusCode: HttpStatus.CONFLICT,
         });
      }

      const savedWorkspace = await new this.workspaceModel({
         ...createWorkSpaceDTO,
      }).save();

      return {
         message: 'WorkSpace created successfully',
         data: savedWorkspace,
      };
   }
    async findAll(
         query: QueryWorkSpaceDTO,
         IDUser: string,
      ): Promise<APIResponse<WorkSpaceDocument[]>> {
         const filter: any = {
            isDeleted: { $ne: true },
            'access.IDCollaborator': IDUser,
         };
   
         if (query.id) filter._id = query.id;
         if (query.workSpaceName)
            filter.workSpaceName = { $regex: query.workSpaceName, $options: 'i' };
         if (query.user) filter.user = query.user;
   
         const workspaces = await this.workspaceModel.find(filter).exec();
   
         if (!workspaces || workspaces.length === 0) {
            throw new RpcException({
               message: 'No WorkSpace found',
               statusCode: HttpStatus.NOT_FOUND,
            });
         }
   
         return {
            message: 'WorkSpaces retrieved successfully',
            data: workspaces,
         };
      }
   
      async findOne(id: string): Promise<APIResponse<WorkSpaceDocument>> {
         const workspace = await this.workspaceModel
            .findById(id)
            .where({ isDeleted: { $ne: true } })
            .exec();
         if (!workspace) {
            throw new RpcException({
               message: 'No workspace found',
               statusCode: HttpStatus.NOT_FOUND,
            });
         }
         return {
            message: 'WorkSpace retrieved successfully',
            data: workspace,
         };
      }

      async update(
            id: string,
            updateWorkSpaceDTO: UpdateWorkSpaceDTO,
         ): Promise<APIResponse<WorkSpaceDocument>> {
            const updateWorkSpaces = await this.workspaceModel
               .findByIdAndUpdate(
                  id,
                  { ...updateWorkSpaceDTO, $inc: { __v: 1 } },
                  { new: true },
               )
               .where({ isDeleted: { $ne: true } })
               .exec();
            if (!updateWorkSpaces) {
               throw new RpcException({
                  message: 'WorkSpace not found',
                  statusCode: HttpStatus.NOT_FOUND,
               });
            }
            return {
               message: 'WorkSpace updated successfully',
               data: updateWorkSpaces,
            };
         }



         async remove(id: string): Promise<APIResponse<null>> {
            const result = await this.workspaceModel
               .findOneAndUpdate(
                  { _id: id, isDeleted: { $ne: true } },
                  { isDeleted: true },
                  { new: true },
               )
               .exec();
               console.log(result?.isDeleted);
            if (!result) {
               

               throw new RpcException({
                  
                  message: 'WorkSpace not found or already deleted',
                  statusCode: HttpStatus.NOT_FOUND,
               });
            }
            return {
               message: 'WorkSpace deleted successfully',
               data: null,
            };
         }
      
  }