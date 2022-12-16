import { UpdateUserDto } from '../dto/update-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { IsPublic } from 'src/decorators/is-public.decorator';
import { CreateUserDto } from 'src/dto/createDto/create-user.dto';
import { UsersService } from 'src/services/users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthRequest } from 'src/authentication/models/AuthRequest';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.verifyAlreadyExists(
      createUserDto.cpf,
      createUserDto.email,
    );

    return this.usersService.create(createUserDto);
  }

  @ApiTags('admin')
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Patch()
  async update(
    @Request() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(req.user);
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.checkIfExists(+id);
    return this.usersService.remove(+id);
  }

  @ApiBearerAuth()
  @Get('account')
  async findOne(@Request() req: AuthRequest) {
    return this.usersService.findOne(req.user.email);
  }
}
