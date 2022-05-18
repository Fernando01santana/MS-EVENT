import { ApiProperty } from '@nestjs/swagger';
import { userRole } from '../schemas/user.schema';

export class UserCreatedDto {
  data: UserData;
  message: string;
}

export class UserReponseListOneDto {
  message: string;
  statusCode: number;
}

export class UserData {
  @ApiProperty({
    description: 'Name of user',
    example: 'Fernando Santana',
    type: Date,
  })
  birth_date: Date;
  @ApiProperty({
    description: 'Name of user',
    example: 'Fernando Santana',
    type: Date,
  })
  name: string;
  @ApiProperty({
    description: 'Acess level of user',
    example: 'Fernando Santana',
    type: Array,
  })
  acess_level: userRole;
  @ApiProperty({
    description: 'Name of user',
    example: 'Fernando Santana',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'id of user',
    example: 'a654sdf6a5sd4fa5sd4f65asd4f6',
    type: String,
  })
  id: string;
}
