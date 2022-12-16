import {
  Controller,
  Post,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/authentication/guards/local-auth.guard';
import { AuthRequest } from 'src/authentication/models/AuthRequest';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { IsPublic } from '../decorators/is-public.decorator';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiTags('authentication')
  @Get('me')
  async me(@CurrentUser() user) {
    return user;
  }

  @ApiTags('authentication')
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
