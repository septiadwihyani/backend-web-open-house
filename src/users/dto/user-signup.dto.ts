import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserSignInDto } from "./user-signin.dto";

export class UserSignUpDto extends UserSignInDto {
    @IsNotEmpty({message:'Name can not be empty'})
    @IsString({message:'Name should be string'})
    name:string;
}