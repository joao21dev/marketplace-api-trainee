import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from '../createDto/create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
