import { ApiProperty } from '@nestjs/swagger';
import { userRole } from '../schemas/user.schema';

export class UserUpdateDto {
  user: UserUpdatedDto;
  id: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of user',
    example: 'Fernando Santana',
    type: String,
  })
  name: string;
  @ApiProperty({
    description: 'Password of user',
    example: 'Ball123',
    type: String,
  })
  password: string;
  @ApiProperty({
    description: 'Email of user',
    example: 'fernando@gmail.com',
    type: String,
  })
  email: string;
  @ApiProperty({
    description: 'Phone of user',
    example: '+551199999-9999',
    type: String,
  })
  phone: string;
  @ApiProperty({
    description: 'Password confirm of user',
    example: 'Ball123',
    type: String,
  })
  oldPassword: string;
  @ApiProperty({
    description: 'birth day of user',
    example: '01/01/2000',
    type: String,
  })
  birth_date: Date;
  @ApiProperty({
    description: 'Acess level of user',
    example: '[customer]',
    type: Array,
  })
  acess_level: userRole;
  @ApiProperty({
    description: 'Name of user',
    example: 'Fernando Santana',
    type: Date,
  })
  created_at: Date;
  @ApiProperty({
    description: 'Name of user',
    example: 'Fernando Santana',
    type: Date,
  })
  updated_at: Date;
}

export class UserUpdatedDto {
  @ApiProperty({
    description: 'Email of user',
    example: 'fernando@gmail.com',
    type: String,
  })
  email: string;
  @ApiProperty({
    description: 'Name of user',
    example: 'Fernando Santana',
    type: String,
  })
  name: string;
  @ApiProperty({
    description: 'Phone of user',
    example: '+551199999-9999',
    type: String,
  })
  phone: string;
  @ApiProperty({
    description: 'birth day of user',
    example: '01/01/2000',
    type: String,
  })
  birth_date: Date;
}
