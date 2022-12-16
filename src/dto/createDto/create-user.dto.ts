import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsCpfValid } from 'src/decorators/is-cpf-valid';

export class CreateUserDto {
  @IsString({ message: 'O campo nome deve ser do tipo string' })
  @ApiProperty({
    example: 'Maria Antonieta Souza',
  })
  readonly name: string;

  @Validate(IsCpfValid)
  @IsString({ message: 'O campo cpf deve ser do tipo string' })
  @ApiProperty({
    example: '101.000.123-91',
  })
  readonly cpf: string;

  @IsEmail()
  @ApiProperty({
    example: 'exemplo@email.com',
  })
  readonly email: string;

  @MinLength(9)
  @IsNumberString({ message: 'O campo fone deve ser valido' })
  @ApiProperty({
    example: '11999999999',
  })
  readonly phone: string;

  @MinLength(5)
  @IsString({ message: 'O campo senha deve ser do tipo string' })
  @ApiProperty({
    example: 'Senha123*',
  })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({
    example: {
      address:
        'Rua das Flores. Bairro: Floresta. Cidade: Belo Horizonte. Minas Gerais.',
      cep: '12345-000',
    },
  })
  readonly address: { cep: string; address: string };
}
