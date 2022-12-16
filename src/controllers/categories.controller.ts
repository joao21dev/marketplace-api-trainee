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

import { UpdateCategoryDto } from 'src/dto/updateDto/update-category.dto';
import { CategoriesService } from 'src/services/categories.service';
import { CreateCategoryDto } from '../dto/createDto/create-category.dto';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      await this.categoriesService.checkIfExists(+id);
      return this.categoriesService.findOne(+id);
    } catch (err) {
      throw err;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      await this.categoriesService.checkIfExists(+id);
      return this.categoriesService.update(+id, updateCategoryDto);
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.categoriesService.checkIfExists(+id);
      return this.categoriesService.remove(+id);
    } catch (err) {
      throw err;
    }
  }
}
