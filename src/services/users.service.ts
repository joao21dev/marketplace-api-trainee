import {
  HttpException,
  HttpStatus,
  Injectable,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/services/auth.service';
import { hashPassword } from 'src/helpers/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private appRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async checkIfExists(id: number) {
    const user = await this.appRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto) {
    const { address, ...userProps } = createUserDto;

    const userAddress = new Address();
    userAddress.address = address.address;
    userAddress.cep = address.cep;

    const user = new User();
    user.name = userProps.name;
    user.address = userAddress;
    user.cpf = userProps.cpf;
    user.email = userProps.email;
    user.isAdmin = userProps.isAdmin;
    user.password = await hashPassword(userProps.password);
    user.phone = userProps.phone;

    const response = await this.appRepository.save(user);

    return { name: response.name, email: response.email };
  }

  findAll() {
    return this.appRepository.find({
      relations: { address: true },
      select: { name: true, cpf: true, isAdmin: true },
    });
  }

  async verifyAlreadyExists(cpf: string, email: string) {
    const userCpf = await this.appRepository.findOne({ where: { cpf } });
    const userEmail = await this.appRepository.findOne({ where: { email } });
    if (userCpf || userEmail) {
      throw new HttpException('Invalid Params', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(email: string) {
    const user = await this.appRepository.findOne({
      where: { email },
      relations: {
        address: true,
      },
    });

    return {
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      address: user.address,
    };
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.appRepository
      .createQueryBuilder('users')
      .where('LOWER(users.email) like :email', {
        email: `${email.toLocaleLowerCase()}`,
      })
      .getOne();

    return user;
  }

  async update(id: number, updateUserDto) {
    const password = await hashPassword(updateUserDto.password);
    updateUserDto.password = password;
    await this.appRepository.update(id, updateUserDto);

    return {
      message: 'Update with success',
    };
  }

  async remove(id: number) {
    await this.appRepository.delete(id);

    return {
      message: 'user was deleted with success',
    };
  }
}
