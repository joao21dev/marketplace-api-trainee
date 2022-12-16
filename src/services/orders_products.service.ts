import { Injectable } from '@nestjs/common';
import { OrdersProduct } from 'src/entities/orders_product.entity';
import { Product } from 'src/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersProductsService {
  constructor(
    @InjectRepository(OrdersProduct)
    private ordersProductRepository: Repository<OrdersProduct>,
  ) {}
  async create(createOrderDto, order) {
    await createOrderDto.products.map(async (product) => {
      console.log(product.product_id);
      const productInstance = new Product();
      productInstance.id = product.product_id;

      const orderProduct = new OrdersProduct();
      orderProduct.quantity = product.quantity;
      orderProduct.order = order;
      orderProduct.product = productInstance;
      await this.ordersProductRepository.save(orderProduct);
    });
  }
}
