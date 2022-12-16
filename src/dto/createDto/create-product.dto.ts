import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, isNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'O nome deve ser do tipo string' })
  @ApiProperty({
    example: 'Notebook',
  })
  readonly name: string;

  @IsNumber()
  @ApiProperty({
    example: 2437.9,
  })
  readonly price: number;

  @IsString({ message: 'A imagem deve ser do tipo string' })
  @ApiProperty({
    example: 'notebook.pgn',
  })
  readonly image: string;

  @IsNumber()
  @ApiProperty({
    example: 2,
  })
  readonly categoryId: number;

  @IsString({ message: 'A descrição deve ser do tipo string' })
  @ApiProperty({
    example: 'notebook intel core i9',
  })
  readonly description: string;

  @IsNumber()
  @ApiProperty({
    example: 13,
  })
  readonly quantity_storages: number;
}
