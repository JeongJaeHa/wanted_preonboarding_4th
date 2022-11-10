import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, Res, HttpCode, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/Schema/user.schema';
import { categoryValidationPipe } from './pipes/category-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/register')
  @UseGuards(AuthGuard())
  @HttpCode(201)
  create(
    @getUser() user: Users,
    @Body(ValidationPipe) createProductDto: CreateProductDto):Promise<{message: string, statusCode: number}> {
      return this.productsService.registerProduct(createProductDto, user);
  }

  @Get()
  @HttpCode(200)
  productList(): Promise<{message: string, statusCode: number, list:{}}> {
    return this.productsService.productList();
  }

  @Get(':id')
  @HttpCode(200)
  product(@Param('id') id: string): Promise<{message: string, statusCode: number, product:{}}> {
    return this.productsService.product(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @HttpCode(200)
  updateProduct(
    @getUser() user: Users,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<{message: string, statusCode: number}> {
    return this.productsService.updateProduct(id, updateProductDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @HttpCode(204)
  deleteProduct(
    @getUser() user: Users,
    @Param('id') id: string
  ): Promise<{message: string, statusCode: number}> {
    return this.productsService.deleteProduct(id, user);
  }
}
