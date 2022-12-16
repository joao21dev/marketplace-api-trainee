import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/decorators/is-public.decorator';

import { UpdateProductDto } from 'src/dto/updateDto/update-product.dto';
import { ProductsService } from 'src/services/products.service';
import { CreateProductDto } from '../dto/createDto/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productsService.create(createProductDto);
    } catch (err) {
      throw err;
    }
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      await this.productsService.checkIfExists(+id);
      return this.productsService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      await this.productsService.checkIfExists(+id);
      return this.productsService.update(+id, updateProductDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.productsService.checkIfExists(+id);
      return this.productsService.remove(+id);
    } catch (error) {
      throw error;
    }
  }
}
