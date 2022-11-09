import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userSigninValidator, userSignupValidator } from './dto/create-user.dto';
import { userDocument, Users } from './Schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { UsersModule } from './users.module';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) 
    private readonly userModel: Model<userDocument>,
    private jwtService: JwtService
) {}
  async signup(createUserDto: userSignupValidator): Promise<Users> {
    const { email, password, phone, country } = createUserDto;
    const salt = await bcrypt.genSalt();
    const userCountry = country.toUpperCase();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userModel.findOne({ email: email });
    if(user) {
      throw new BadRequestException("this email already signup");
    }
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
    // createUser.save();
    return Object.assign({"message": "signup success", "statusCode": 201})
  }

  async signin(signinUserDto: userSigninValidator): Promise<{message: string, statusCode: string, accessToken: string}> {
    const {email, password} = signinUserDto;

    const user = await this.userModel.findOne({email: email}).exec();
    if( user && (await bcrypt.compare(password, user.password))) {
      const id = user._id
      const payload = { id }
      const accessToken = await this.jwtService.sign(payload);

      return Object.assign({"message":"login success", "statusCode": 200, "accessToken": accessToken})
    } else {
      throw new UnauthorizedException('login fail check email and password');
    }
  }
}
