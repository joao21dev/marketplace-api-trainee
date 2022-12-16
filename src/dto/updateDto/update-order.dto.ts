import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from '../createDto/create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
