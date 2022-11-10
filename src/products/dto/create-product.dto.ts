import { IsNotEmpty, MaxLength } from "class-validator";
import { CATEGORY_LIST } from "../products.model";

export class CreateProductDto {
    @IsNotEmpty()
    @MaxLength(30)
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    category: CATEGORY_LIST;

    created_at: Date;

    updated_at: boolean;
}
