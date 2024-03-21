import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({message: 'Title cannot be blank'})
    @IsString()
    title:string;

    @IsNotEmpty({message: 'Description cannot be empty'})
    @IsString()
    description:string;

    @IsNotEmpty({ message: 'Price cannot be empty'})
    @IsNumber(
        {maxDecimalPlaces: 2},
        {message: 'Price should be number and max decimal precion is 2'}
    )
    @IsPositive({ message : 'Price should be positive number'})
    price:number;

    @IsNotEmpty({ message: 'Stock cannot be empty'})
}
