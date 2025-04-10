import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { WorkSpace, WorkSpaceSchema } from './workspace.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkSpace.name, schema: WorkSpaceSchema }]),
  ],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
})
export class WorkspaceModule {}