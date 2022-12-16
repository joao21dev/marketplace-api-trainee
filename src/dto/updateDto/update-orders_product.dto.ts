import { PartialType } from '@nestjs/swagger';
import { CreateOrdersProductDto } from '../createDto/create-orders_product.dto';

export class UpdateOrdersProductDto extends PartialType(
  CreateOrdersProductDto,
) {}
