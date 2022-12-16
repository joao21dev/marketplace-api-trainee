import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'O nome deve ser do tipo string' })
  @ApiProperty(
    {
      example: "Eletrônico"
    }
  )
  readonly name: string;
}
