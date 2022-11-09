import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userSigninValidator, userSignupValidator } from './dto/create-user.dto';
import { userDocument, Users } from './Schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<userDocument>,
) {}
  async signup(createUserDto: userSignupValidator): Promise<Users> {
    const { email, password, phone, country } = createUserDto;
    const salt = await bcrypt.genSalt();
    const userCountry = country.toUpperCase();
    const hashedPassword = await bcrypt.hash(password, salt);
    const createUser  = await this.userModel.create(
      {
        email: email,
        password: hashedPassword,
        phone: phone,
        isSeller: false,
        country: userCountry,
        created: Date.now()
      }
    )
    createUser.save();
    return Object.assign({"message": "signup success", "statusCode": 201})
  }

  async signin(signinUserDto: userSigninValidator) {
    const {email, password} = signinUserDto;

    const user = await this.userModel.findOne({email: email}).exec();
    if( user && (await bcrypt.compare(password, user.password))) {
      return Object.assign({"message":"login success", "statusCode": 200})
    } else {
      throw new UnauthorizedException('login fail');
    }
  }
}
