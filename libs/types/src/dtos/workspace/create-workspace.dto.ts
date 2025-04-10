import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, IsMongoId, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkspaceAccess } from '@app/types/interfaces/workspace-access.interface';
import { WorkSpaceAccessDTO } from './workspace-access.dto';

export class CreateWorkSpaceDTO {
  @IsMongoId()
  @IsNotEmpty()
  IDUser: string;

  @IsString()
  @IsNotEmpty()
  WorkSpaceName: string;

  @IsString()
  @IsOptional()
  WorkSpaceDescription?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkSpaceAccessDTO)
  access?: WorkspaceAccess[];
}