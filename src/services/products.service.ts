import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dto/createDto/create-product.dto';
import { UpdateProductDto } from 'src/dto/updateDto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private appRepository: Repository<Product>,
    @Inject(CategoriesService)
    private categoryService: CategoriesService,
  ) {}

  async checkIfExists(id: number) {
    const product = await this.appRepository.findOne({ where: { id } });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...productProps } = createProductDto;
    const category = await this.categoryService.checkIfExists(categoryId);

    const product = new Product();
    product.name = productProps.name;
    product.description = productProps.description;
    product.image = productProps.image;
    product.price = productProps.price;
    product.quantity_storages = productProps.quantity_storages;
    product.category = category;

    await this.appRepository.save(product);

    return {
      message: 'category created with success',
      body: {
        product: product,
      },
    };
  }

  findAll() {
    return this.appRepository.find();
  }

  findOne(id: number) {
    return this.appRepository.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.appRepository.update(id, updateProductDto);

    return {
      message: 'update with success',
      body: {
        updateProductDto,
      },
    };
  }

  async remove(id: number) {
    await this.appRepository.delete(id);

    return {
      message: 'removed with success',
      id: id,
    };
  }
}
