import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { OrdersService } from 'src/services/orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/dto/createDto/create-order.dto';
import { AuthRequest } from 'src/authentication/models/AuthRequest';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  create(@Request() req: AuthRequest, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, createOrderDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
}
