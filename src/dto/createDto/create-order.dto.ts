import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ProductFields } from '../product-fields-order_products';

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty({
    example: 127.89,
  })
  readonly total_price: number;

  @IsNotEmpty()
  @ApiProperty({
    example: [
      { product_id: '1', quantity: 1 },
      { product_id: '2', quantity: 1 },
    ],
  })
  products: ProductFields[];
}
