import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, IsMongoId, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkspaceAccess } from '@app/types/interfaces/workspace-access.interface';
import { WorkSpaceAccessDTO } from './workspace-access.dto';

export class UpdateWorkSpaceDTO {
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

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;
}