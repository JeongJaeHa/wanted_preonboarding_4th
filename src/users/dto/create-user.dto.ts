import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { COUNTRY_LIST } from "../users.model";

export class userSignupValidator {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
        message: "Email 형식을 확인해주세요"
    })
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: "비밀번호는 6자 ~ 20자 사이의 영문, 숫자로 만들어주세요"
    })
    password: string;

    @IsNotEmpty()
    @Matches(/^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/, {
        message: "휴대폰 번호를 확인해 주세요"
    })

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    country: COUNTRY_LIST

    created: Date;
}

export class userSigninValidator {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
        message: "Email 형식을 확인해주세요"
    })
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: "비밀번호는 6자 ~ 20자 사이의 영문, 숫자로 만들어주세요"
    })
    password: string;
}
export class createSellerDto {
    @IsNotEmpty()
    bank: string;

    @IsNotEmpty()
    account: string;

    @IsNotEmpty()
    name: string;
}
