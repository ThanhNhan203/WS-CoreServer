import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkSpaceDTO , QueryWorkSpaceDTO , UpdateWorkSpaceDTO } from '@app/types'; // Giả sử DTO nằm ở đây, thay đổi đường dẫn nếu cần
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  
    @MessagePattern('workspace.create.workspace')
    create(@Payload() createWorkSpaceDTO: CreateWorkSpaceDTO) {
      return this.workspaceService.create(createWorkSpaceDTO);
    }

     @MessagePattern('workspace.findAll.workspaces')
      findAll(@Payload() payload : { query: QueryWorkSpaceDTO, IDUser: string }) {
        return this.workspaceService.findAll(payload.query, payload.IDUser);
      }
    
      @MessagePattern('workspace.findOne.workspace')
      findOne(@Payload() id: string) {
        return this.workspaceService.findOne(id);
      }

      @MessagePattern('workspace.update.workspace')
        update(@Payload() payload: { id: string; updateWorkSpaceDTO: UpdateWorkSpaceDTO }) {
          return this.workspaceService.update(payload.id, payload.updateWorkSpaceDTO);
        }

        
      @MessagePattern('workspace.remove.workspace')
      remove(@Payload() id: string) {
        return this.workspaceService.remove(id);
      }
}