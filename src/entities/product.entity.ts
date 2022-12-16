import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { OrdersProduct } from './orders_product.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'double' })
  price: number;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @Column()
  description: string;

  @Column()
  quantity_storages: number;

  @OneToMany(() => OrdersProduct, (ordersProduct) => ordersProduct.product)
  public ordersProduct: OrdersProduct[];
}
