import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, usersSchema } from './Schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: usersSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
