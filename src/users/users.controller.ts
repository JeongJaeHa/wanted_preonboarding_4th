import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { userSigninValidator, userSignupValidator } from './dto/create-user.dto';
import { signinValidationPipe } from './pipes/signup-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @UsePipes(signinValidationPipe)
  signup(@Body(ValidationPipe) createUserDto: userSignupValidator) {
    return this.usersService.signup(createUserDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) signinUserDto: userSigninValidator) {
    return this.usersService.signin(signinUserDto)
  }
}
