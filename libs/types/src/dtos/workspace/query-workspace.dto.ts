import { IsString, IsOptional, IsMongoId } from 'class-validator';


export class QueryWorkSpaceDTO {
    @IsOptional()
    @IsMongoId()
    id?: string;
    
    @IsOptional()
    @IsString()
    workSpaceName?: string;
    
    @IsOptional()
    @IsMongoId()
    user?: string;
}

