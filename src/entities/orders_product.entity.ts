import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity('ordersProduct')
export class OrdersProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public quantity: number;

  @ManyToOne(() => Order, (order) => order.ordersProduct, { cascade: true })
  public order: Order;

  @ManyToOne(() => Product, (product) => product.ordersProduct, {
    cascade: true,
  })
  public product: Product;
}
