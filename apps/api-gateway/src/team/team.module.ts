import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MessagingModule } from '@app/common';

@Module({
   imports: [MessagingModule],
   providers: [TeamService],
   controllers: [TeamController],
})
export class TeamModule {}
