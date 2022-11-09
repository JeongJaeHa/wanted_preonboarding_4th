import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { COUNTRY_LIST } from "../users.model";

export class signinValidationPipe implements PipeTransform {

    readonly country_list = [
        COUNTRY_LIST.KOREA,
        COUNTRY_LIST.JAPAN
    ]
    transform(value: any) {
        let country = value.country.toUpperCase();
        if( !this.countryCodeValidation(country) ) {
            throw new BadRequestException("현재 서비스중인 국가는 KOREA, JAPAN 입니다.")
        }
        
        return value;
    }
    
    private countryCodeValidation(status: any) {
        const index = this.country_list.indexOf(status);
        return index !== -1
    }
}