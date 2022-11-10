import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { CATEGORY_LIST } from '../products.model';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNotEmpty()
    @MaxLength(30)
    title: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    description: number;

    @IsNotEmpty()
    category: CATEGORY_LIST;

    created_at: Date;

    updated_at: boolean;


}

