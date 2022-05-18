import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { CreateUserDto, UserUpdatedDto } from '../dto/user.dto';
import {
  UserCreatedDto,
  UserReponseListOneDto,
} from '../dto/user.response.dto';
import { UserService } from '../services/User.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @ApiCreatedResponse({
    description: 'User create sucess',
    type: UserCreatedDto,
  })
  async create(@Body() user: CreateUserDto): Promise<UserCreatedDto> {
    const userCreated = await this.userService.create(user);
    return userCreated;
  }

  @ApiCreatedResponse({
    description: 'List one user',
    type: UserCreatedDto,
  })
  @Get('/list/:id')
  @ApiParam({ name: 'id' })
  async listOne(@Param() id: string): Promise<UserCreatedDto> {
    const userCreated = await this.userService.listOne(id);
    return userCreated;
  }

  @ApiCreatedResponse({
    description: 'List all user',
    type: [UserCreatedDto],
  })
  @Get('/list/')
  async listAll(@Param() id: string): Promise<UserCreatedDto[]> {
    const userCreated = await this.userService.listAll();
    return userCreated;
  }

  @ApiCreatedResponse({
    description: 'Delete one user',
    type: String,
  })
  @Delete('/remove/:id')
  async delete(@Param() id: string): Promise<UserReponseListOneDto> {
    const response = await this.userService.remove(id);
    return response;
  }

  @ApiCreatedResponse({
    description: 'Update one user',
    type: String,
  })
  @Put('/update/:id')
  async update(
    @Param() id: string,
    @Body() user: UserUpdatedDto,
  ): Promise<UserCreatedDto> {
    const idUser = id;
    const response = await this.userService.update({ id: idUser, user });
    return response;
  }
}
