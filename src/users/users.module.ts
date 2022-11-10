import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, usersSchema } from './Schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './jwt.strategy';
import { Products, productsSchema } from 'src/products/Schemas/product.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: "croket",
      signOptions: {
        expiresIn: 60*60,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{ name: Users.name, schema: usersSchema }]),
    MongooseModule.forFeature([{ name: Products.name, schema: productsSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, jwtStrategy],
  exports: [jwtStrategy, PassportModule]
})
export class UsersModule {}
