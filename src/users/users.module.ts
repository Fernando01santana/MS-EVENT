import { Module } from '@nestjs/common';
import { UserService } from './services/User.service';
import { UserController } from './controllers/user.controler';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
