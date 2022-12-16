import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private appRepository: Repository<Address>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkUserAuthorization(email: string, addressId: number) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        address: true,
      },
    });

    if (addressId !== user.address.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  findOne(id: number) {
    return this.appRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAddressDto) {
    await this.appRepository.update(id, updateAddressDto);

    return {
      message: 'address was deleted with success',
      body: updateAddressDto,
    };
  }
}
