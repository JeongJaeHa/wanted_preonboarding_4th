import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MarketsModule } from './markets/markets.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { ConfigModule } from '@nestjs/config'

config();
@Module({
  imports: [
    UsersModule, MarketsModule, ProductsModule, MongooseModule.forRootAsync({
    useFactory: async () => ({
      uri: process.env.MONGODB_URI,
    }),
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}