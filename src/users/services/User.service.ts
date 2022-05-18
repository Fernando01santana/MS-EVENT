import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UserUpdateDto } from '../dto/user.dto';
import {
  UserCreatedDto,
  UserReponseListOneDto,
} from '../dto/user.response.dto';
import { hash } from 'bcryptjs';
import { User, UserDocument, userRole } from '../schemas/user.schema';
import AppError from 'src/utils/error/AppError';
import EnumVerify from 'src/utils/enumVerify/enumVerify';

@Injectable()
export class UserService extends EnumVerify {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }
  async create(user: CreateUserDto): Promise<UserCreatedDto> {
    const userVerify = await this.userModel.findOne({ email: user.email });
    if (userVerify) {
      throw new AppError('Já existe um usuario com este email cadastrado!');
    }
    const levelAcessVerify = this.verify(user.acess_level, userRole);
    const quantityUserAdmin = this.verifyAdmin();
    if (!quantityUserAdmin || !levelAcessVerify) {
      user.acess_level = userRole.customer;
    } else {
      user.acess_level = levelAcessVerify;
    }
    user.created_at = new Date();
    user.updated_at = new Date();
    user.password = await this.passwordHashed(user.password, user.oldPassword);
    user.birth_date = this.dataVerify(user.birth_date);
    try {
      const createuser = await this.userModel.create(user);
      const userSave = await createuser.save();
      const userReturn = this.dataUser(userSave, 'created');
      return userReturn;
    } catch (error) {
      throw new AppError('Erro save user', 409);
    }
  }

  async verifyAdmin() {
    const usersAdmin = await this.userModel.find({
      acess_level: userRole.admin,
    });
    if (usersAdmin.length === 5) {
      return false;
    }
    return true;
  }

  async passwordHashed(password, oldPasswrd) {
    if (password === oldPasswrd) {
      const passwordHashed = await hash(password, 8);
      return passwordHashed;
    }
    throw new AppError('Senha e confirmar senha precisam ser iguais!');
  }

  dataUser(user, operation) {
    return {
      message: `Usuario ${operation} com sucesso`,
      data: {
        name: user.name,
        acess_level: user.acess_level,
        email: user.email,
        id: user.id,
        birth_date: user.birth_date,
      },
    };
  }

  dataVerify(data) {
    const databirth = data.split('/');
    const dataFormated = new Date(databirth[2], databirth[1], databirth[0]);
    const lifeExperience =
      new Date().getFullYear() - dataFormated.getFullYear();
    console.log(lifeExperience);
    if (lifeExperience < 18) {
      throw new AppError(
        'Você precisa ter acima de 18 anos para se cadastrar!',
      );
    }
    return dataFormated;
  }

  async listOne(id): Promise<UserCreatedDto> {
    const userId = id.id;
    const userSearch = await this.userModel.findOne({ _id: userId });
    if (!userSearch) {
      throw new AppError('User not found', 404);
    }
    const user: UserCreatedDto = {
      data: {
        acess_level: userSearch.acess_level,
        email: userSearch.email,
        name: userSearch.name,
        id: userSearch._id,
        birth_date: userSearch.birth_date,
      },
      message: 'Usuario encontrado',
    };
    return user;
  }

  async listAll(): Promise<UserCreatedDto[]> {
    const userSearch = await this.userModel.find();
    const userSearchRespomse: UserCreatedDto[] = [];
    if (!userSearch[0]) {
      throw new AppError('User not found', 404);
    }

    for (let i = 0; i < userSearch.length; i++) {
      const element = userSearch[i];
      const dataUser: UserCreatedDto = {
        data: {
          acess_level: element.acess_level,
          email: element.email,
          name: element.name,
          birth_date: element.birth_date,
          id: element._id,
        },
        message: 'Usuario listado com sucess',
      };
      userSearchRespomse.push(dataUser);
    }
    return userSearchRespomse;
  }

  async remove(id): Promise<UserReponseListOneDto> {
    const idUser = id.id;
    const user = await this.userModel.findOne({ _id: idUser });
    if (!user) {
      throw new AppError('user not found', 404);
    }
    await this.userModel.remove(user);
    return { message: 'User deleted', statusCode: 200 };
  }

  async update({ id, user }: UserUpdateDto): Promise<UserCreatedDto> {
    const userSearch = await this.userModel.findOne({ id: id });
    if (!userSearch) {
      throw new AppError('User not found!', 404);
    }
    userSearch.name = user.name;
    userSearch.email = user.email;
    userSearch.phone = user.phone;
    userSearch.birth_date = this.dataVerify(user.birth_date);
    userSearch.updated_at = new Date();
    await userSearch.save();
    return this.dataUser(userSearch, 'updated');
  }
}
