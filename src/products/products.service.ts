import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Model } from 'mongoose';
import { userDocument, Users } from 'src/users/Schema/user.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productDocument, productListDocument, ProductLists, Products } from './Schemas/product.schema';
import { v4 as uuid } from 'uuid';
import { title } from 'process';
import { privateDecrypt } from 'crypto';
const moment = require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<productDocument>,
    @InjectModel(Users.name)
    private readonly userModel: Model<userDocument>
  ) {}
  async registerProduct(createProductDto: CreateProductDto, user: Users) {
    const { title, content, price, category } = createProductDto;
    const seller = await this.userModel.findOne({email: user.email})
    if(!seller) {
      throw new BadRequestException('register seller first')
    }

    const newProduct = new this.productModel(
      {
        _id: uuid(),
        seller_id: user._id,
        country: user.country,
        category: category,
        title: title,
        content: content,
        price: price,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: ""
      }
    )
    newProduct.save();
    return Object.assign({"message": "product register success", "statusCode": 201})
  }

  async productList() {
    const List = await this.productModel.find({});
    return Object.assign({"message": "success", "statusCode": 200, "list": List})
  }

  async product(id: string) {
    const product = await this.productModel.findOne({_id: id}).exec();
    if(!product){
      throw new BadRequestException("not find product");
    }
    return Object.assign({"message": "success", "statusCode": 200, "product": product})
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto, user: Users) {
    const { title, content, price, description } = updateProductDto
      const update = await this.productModel.findByIdAndUpdate(id, {
        title: title,
        content: content,
        price: price,
        description: description,
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      })
      
    if(!update) {
      throw new UnauthorizedException('incorrect product id')
    }
    return Object.assign({"message": "update success", statusCode: 200})

  }

  async deleteProduct(id: string, user: object) {
    await this.productModel.findByIdAndDelete(id)
    return Object.assign({"message": "delete success", statusCode: 204})
  }
}
