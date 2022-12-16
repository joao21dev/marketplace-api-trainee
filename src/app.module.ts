import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AddressController } from './controllers/address.controller';
import { CategoriesController } from './controllers/categories.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsController } from './controllers/products.controller';
import { UsersController } from './controllers/users.controller';
import { Address } from './entities/address.entity';
import { Category } from './entities/category.entity';
import { Order } from './entities/order.entity';
import { OrdersProduct } from './entities/orders_product.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { Database } from './helpers/database';
import { AddressService } from './services/address.service';
import { CategoriesService } from './services/categories.service';
import { OrdersService } from './services/orders.service';
import { OrdersProductsService } from './services/orders_products.service';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard';

import { AuthService } from './services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authentication/strategies/local.strategy';
import { JwtStrategy } from './authentication/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Database.build(),
    PassportModule,
    Database.registerEntities([
      Address,
      Category,
      Order,
      Product,
      OrdersProduct,
      User,
    ]),
  ],
  controllers: [
    UsersController,
    OrdersController,
    ProductsController,
    CategoriesController,
    AddressController,
    AuthController,
  ],
  providers: [
    UsersService,
    AddressService,
    ProductsService,
    OrdersService,
    CategoriesService,
    OrdersProductsService,
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [
    UsersService,
    AddressService,
    ProductsService,
    OrdersProductsService,
    CategoriesService,
    OrdersService,
    UsersService,
    JwtService,
    AuthService,
  ],
})
export class AppModule {}
