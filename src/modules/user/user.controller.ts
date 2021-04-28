import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtAuthResult } from 'src/auth/jwt/jwt.strategy';
import { JwtTokenResponse, LoginForm } from 'src/forms/authDefult';
import { ListResult } from 'src/forms/listResult';
import { RequestQuery } from 'src/forms/requestQuery';
import { JoiValidationPipe } from 'src/pipes/joi-validate.pipe';
import { QueryParserPipe } from 'src/pipes/query-parser.pipe';
import { User, UserSchema } from './user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService
  ){}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiCreatedResponse({type: ListResult})
  @ApiQuery({type: RequestQuery, required: false})
  async listUser(@Query(new QueryParserPipe()) query) {
    return this.service.find(query)
  }

  @Post()
  @ApiCreatedResponse({type: User})
  async createUser(@Body(new JoiValidationPipe(UserSchema.create)) data: User) {
    return this.service.create(data)
  }

  @Post('/login')
  @ApiCreatedResponse({type: JwtTokenResponse})
  async login(@Body(new JoiValidationPipe(UserSchema.login)) data: LoginForm) {
    return this.service.login(data)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiCreatedResponse({type: User})
  async getOwnUser(@Req() req: JwtAuthResult) {
    return this.service.findById(req.user.userId)
  }
}
