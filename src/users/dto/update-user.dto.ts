import { PartialType } from '@nestjs/mapped-types';
import { userSignupValidator } from './create-user.dto';

export class UpdateUserDto extends PartialType(userSignupValidator) {}
