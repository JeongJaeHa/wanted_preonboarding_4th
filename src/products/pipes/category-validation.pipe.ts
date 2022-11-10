import { ArgumentMetadata, BadRequestException, PipeTransform, UnauthorizedException } from "@nestjs/common";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { CATEGORY_LIST } from "../products.model";

export class categoryValidationPipe implements PipeTransform {

    readonly category_list = [
        CATEGORY_LIST.CLOTHING,
        CATEGORY_LIST.ELECTRONIC
    ]
    
    private categoryValidation(status: any) {
        const index = this.category_list.indexOf(status);
        return index !== -1
    }

    async transform(value: any) {
        const userId = value.email;
        let category = value.category.toUpperCase();
        if( !this.categoryValidation(category) ) {
            throw new BadRequestException("이게 외않됌?")
        }
        return {value};
    }

}