import { Controller, Post, Body, ValidationPipe, UsePipes, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { createSellerDto, userSigninValidator, userSignupValidator } from './dto/create-user.dto';
import { signinValidationPipe } from './pipes/signup-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from './get-user.decorator';
import { Users } from './Schema/user.schema';
import { createMarketSellerDto } from 'src/markets/dto/create-market.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @UsePipes(signinValidationPipe)
  signup(@Body(ValidationPipe) createUserDto: userSignupValidator) {
    return this.usersService.signup(createUserDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) signinUserDto: userSigninValidator): Promise<{message: string, statusCode: string, accessToken: string}> {
    return this.usersService.signin(signinUserDto)
  }

  @Post('/create/seller')
  @UseGuards(AuthGuard())
  createSeller(
    @getUser() user: Users,
    @Body() sellerInfo: createSellerDto
    ): Promise<{message: string, statusCode: number}> {
    return this.usersService.createSeller(user, sellerInfo);
  }
}
