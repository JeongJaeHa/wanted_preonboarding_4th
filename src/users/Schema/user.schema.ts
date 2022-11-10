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
@Schema()
export class Sellers {

    @Prop()
    _id?: string;

    @Prop()
    email?: string;

    @Prop()
    bank: string;

    @Prop()
    phone?: string;

    @Prop()
    name: string;

    @Prop()
    account: string;

    @Prop()
    another_phone?: string;
}

export const sellersSchema = SchemaFactory.createForClass(Sellers)
export const usersSchema = SchemaFactory.createForClass(Users);