import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/createDto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/updateDto/update-category.dto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private appRepository: Repository<Category>,
  ) {}

  async checkIfExists(id: number) {
    const category = await this.appRepository.findOne({ where: { id } });
    console.log(category);
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.appRepository.save(createCategoryDto);
  }

  findAll() {
    return this.appRepository.find();
  }

  findOne(id: number) {
    return this.appRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.appRepository.update(id, updateCategoryDto);

    return {
      message: 'category updated with success',
      body: {
        updateCategoryDto,
      },
    };
  }

  async remove(id: number) {
    await this.appRepository.delete(id);

    return {
      message: 'category was deleted with success',
    };
  }
}
