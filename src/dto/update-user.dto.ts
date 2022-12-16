import { CreateUserDto } from 'src/dto/createDto/create-user.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['cpf', 'address'] as const),
) {}
