import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { MessagingModule } from '@app/common';


@Module({
  imports: [ MessagingModule],
  providers: [WorkspaceService], // Đăng ký WorkspaceService
  controllers: [WorkspaceController], // Đăng ký WorkspaceController
})
export class WorkspaceModule {}