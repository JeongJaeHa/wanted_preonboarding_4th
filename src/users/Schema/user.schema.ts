import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<Users>;
@Schema()
export class Users {
    @Prop()
    _id: string;

    @Prop()
    name?: string;

    @Prop()
    @IsEmail()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone: string;

    @Prop()
    isSeller: false;

    @Prop()
    country: string;

    @Prop()
    created: Date;
}

export const usersSchema = SchemaFactory.createForClass(Users);
