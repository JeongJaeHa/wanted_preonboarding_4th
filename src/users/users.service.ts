import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userSigninValidator, userSignupValidator } from './dto/create-user.dto';
import { sellerDocument, Sellers, userDocument, Users } from './Schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { setgroups } from 'process';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<userDocument>,
    @InjectModel(Sellers.name)
    private readonly sellerModel: Model<sellerDocument>,
    private jwtService: JwtService
) {}
  async signup(createUserDto: userSignupValidator): Promise<Users> {
    const { email, password, phone, country } = createUserDto;
    const salt = await bcrypt.genSalt();
    const userCountry = country.toUpperCase();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.userModel.findOne({ email: email });
  
    if(user) {
      throw new BadRequestException("this email already signup");
    }
    const createUser  = new this.userModel(
      {
        _id: uuid(),
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

  async createSeller(user: Users, createMarketDto: Sellers): Promise<{message: string, statusCode: number}> {
    const { bank, account, name } = createMarketDto;
    const seller = await this.sellerModel.findOne({email: user.email})
    console.log(seller)
    if(seller){
      throw new BadRequestException('already seller')
    }

    const sellerInfo = new this.sellerModel(
      {
        _id: uuid(),
        email: user.email,
        name: name,
        phone: user.phone,
        bank: bank,
        account: account,
      }
    )

    sellerInfo.save()
    return Object.assign({"message": "seller register success", "statusCode":201})
  }
}
