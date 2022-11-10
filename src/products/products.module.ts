import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Products, productsSchema } from './Schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtStrategy } from 'src/users/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { Users, usersSchema } from 'src/users/Schema/user.schema';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    PassportModule.register({ defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{ name: Products.name, schema: productsSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: usersSchema }])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
