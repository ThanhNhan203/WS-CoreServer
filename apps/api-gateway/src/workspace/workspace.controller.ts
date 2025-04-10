import { MessagingService } from '@app/common';
import {
   CreateWorkSpaceDTO,
   QueryWorkSpaceDTO,
   PermissionEnum,
   UpdateWorkSpaceDTO
} from '@app/types';
import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Patch,
   Post,
   Query,
   UseGuards,
   Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('workspace')
@UseGuards(AuthGuard('jwt'))
export class WorkspaceController {
 constructor(private readonly messagingService: MessagingService) {}
 
    @Post()
    create(@Body() createWorkspaceDTO: CreateWorkSpaceDTO, @Request() req) {
       Object.assign(createWorkspaceDTO, {
          IDUser: req.user.IDUser,
          access: [
             {
                IDCollaborator: req.user.IDUser,
                permission: PermissionEnum.READ,
                isDeleted: false,
             },
          ],
       });
       return this.messagingService.send(
          'workspace.create.workspace',
          createWorkspaceDTO,
       );
}
 @Get()
   findAll(@Query() query: QueryWorkSpaceDTO, @Request() req) {
      return this.messagingService.send('workspace.findAll.workspaces', {
         query,
         IDUser: req.user.IDUser,
      });
   }

   @Get(':id')
   findOne(@Param('id') id: string) {
      return this.messagingService.send('workspace.findOne.workspace', id);
   }

     @Patch(':id')
      update(@Param('id') id: string, @Body() updateWorkSpaceDTO: UpdateWorkSpaceDTO) {
         return this.messagingService.send('workspace.update.workspace', {
            id,
            updateWorkSpaceDTO,
         });
      }
      @Delete(':id')
         remove(@Param('id') id: string) {
            return this.messagingService.send('workspace.remove.workspace', id);
         }
}