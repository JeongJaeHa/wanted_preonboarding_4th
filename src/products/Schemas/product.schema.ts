import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { type } from "os";
import { Timestamp } from "rxjs";

export type productDocument = HydratedDocument<Products>;
export type productListDocument = HydratedDocument<ProductLists>;

@Schema()
export class Products {
    @Prop()
    _id: string;

    @Prop()
    seller_id: string;

    @Prop()
    country: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    price: number;

    @Prop()
    category: string;

    @Prop()
    created_at: string;

    @Prop()
    updated_at: string;
}

@Schema()
export class ProductLists {
    @Prop()
    _id: string;

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    created: string;
}

export const productsSchema = SchemaFactory.createForClass(Products);
export const productListsSchema = SchemaFactory.createForClass(ProductLists);
