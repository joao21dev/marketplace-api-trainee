import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrdersProductDto {
  @IsNumber()
  @ApiProperty({
    example: 137
  })
  readonly order_id: number;

  @IsNumber()
  @ApiProperty({
    example: 221
  })
  readonly product_id: number;

  @IsNumber()
  @ApiProperty({
    example: 2
  })
  readonly quantity: number;
}
