import { IsArray, IsString, ArrayNotEmpty, ArrayUnique, IsEnum } from 'class-validator';
import { Roles } from 'src/utility/common/user-roles.enum';

export class UpdateUserRolesDto {
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsString({ each: true })
    @IsEnum(Roles, { each: true })
    roles: Roles[];
}