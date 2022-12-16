/*import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/authentication/strategies/jwt.strategy';
import { LocalStrategy } from 'src/authentication/strategies/local.strategy';
import { AddressController } from 'src/controllers/address.controller';
import { AuthController } from 'src/controllers/auth.controller';
import { AddressService } from 'src/services/address.service';
import { AuthService } from 'src/services/auth.service';

@Module({
  controllers: [AddressController, AuthController],
  providers: [
    AddressService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtService,
  ],
  exports: [AddressService, AddressController],
})
export class AddressModule {}
*/
