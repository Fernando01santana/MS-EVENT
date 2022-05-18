import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
export enum userRole {
  admin = 'admin',
  customer = 'customer',
  colaborator = 'colaborator',
}
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  birth_date: Date;

  @Prop({
    required: true,
    type: String,
    Enum: userRole,
    default: userRole.customer,
  })
  acess_level;

  @Prop({ default: null })
  bag: string;

  @Prop({ required: true, type: Date })
  created_at: Date;

  @Prop({ required: true, type: Date })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
