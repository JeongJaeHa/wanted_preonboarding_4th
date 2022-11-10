import { Prop } from "@nestjs/mongoose";

export class createMarketSellerDto {
    @Prop()
    bank: string;

    @Prop()
    account: string;

    @Prop()
    name: string;
}
