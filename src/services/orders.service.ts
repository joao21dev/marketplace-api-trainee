import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/createDto/create-order.dto';

import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { OrdersProductsService } from './orders_products.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(OrdersProductsService)
    private ordersProductsService: OrdersProductsService,

    @InjectRepository(Order)
    private appRepository: Repository<Order>,
  ) {}

  async create(user_id: number, createOrderDto: CreateOrderDto) {
    const user = new User();
    user.id = user_id;

    const order = new Order();
    order.total_price = createOrderDto.total_price;
    order.user = user;

    const res = await this.appRepository.save(order);

    await this.ordersProductsService.create(createOrderDto, order);

    return {
      order: res,
    };
  }

  findAll() {
    return this.appRepository.find();
  }

  async findOne(order_id: number) {
    const order = await this.appRepository.findOne({ where: { id: order_id } });

    if (!order) {
      throw new HttpException('order does not exists', HttpStatus.NOT_FOUND);
    }

    return {
      order: order,
    };
  }
}
