import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateHouseDto {
    @IsNotEmpty({message:'Title can not be blank'})
    @IsString()
    title:string;

    @IsNotEmpty({message:'Description can not be empty'})
    @IsString()
    description:string;

    @IsNotEmpty({message:'Price should not be empty'})
    @IsNumber({maxDecimalPlaces:2}, {message:'Price should not be number & max decimal precission 2'})
    @IsPositive({message:'Price should be positive number'})
    price:number;

    @IsNotEmpty({message:'Address can not be empty'})
    @IsString()
    address:string;

    @IsNotEmpty({message:'Link WhatsApp can not be empty'})
    @IsString()
    whatsapp:string;

    @IsNotEmpty({message:'Photo should not be empty'})
    @IsArray({message:'Photo should be in array format'})
    photos:string[];

    @IsNotEmpty({message:'Video should not be empty'})
    @IsArray({message:'Video should be in array format'})
    video:string[];
}
