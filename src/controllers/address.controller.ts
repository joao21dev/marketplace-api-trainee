import { Body, Controller, Get, Param, Patch, Request } from '@nestjs/common';
import { AuthRequest } from 'src/authentication/models/AuthRequest';
import { AddressService } from 'src/services/address.service';
import { UpdateAddressDto } from '../dto/updateDto/update-address.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  findOne(@Request() req: AuthRequest, @Param('id') id: string) {
    console.log(req.user);
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
    @Request() req: AuthRequest,
  ) {
    await this.addressService.checkUserAuthorization(req.user.email, +id);
    return this.addressService.update(+id, updateAddressDto);
  }
}
