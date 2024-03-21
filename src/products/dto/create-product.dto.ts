import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

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
    @IsNumber({}, {message: 'Stock should be number'})
    @Min(0, { message: 'Stock cannot be negative'})
    stock:number;

    @IsNotEmpty({message: 'Category should not be empty'})
    @IsArray({ message: 'Images should not be empty'})
    images: string[];

    @IsNotEmpty({ message: 'catagory should not be empty'})
    @IsNumber({}, { message: 'category id should be a number'})
    categoryId: number;
}
