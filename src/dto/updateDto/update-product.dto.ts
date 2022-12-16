import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from '../createDto/create-product.dto';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['categoryId'] as const),
) {}
