import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { userDocument, Users } from "./Schema/user.schema";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(Users.name)
        private userModel: Model<userDocument>
    ) {
        super({
            secretOrKey: 'croket',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { id } = payload;
        const user: Users = await this.userModel.findOne({_id: id})

        if(!user) {
            throw new UnauthorizedException();
        }

        return user
    }
}