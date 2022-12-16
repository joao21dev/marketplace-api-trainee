import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from '../createDto/create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
