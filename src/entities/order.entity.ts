import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrdersProduct } from './orders_product.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  total_price: number;

  @OneToMany(() => OrdersProduct, (ordersProduct) => ordersProduct.order)
  public ordersProduct: OrdersProduct[];
}
