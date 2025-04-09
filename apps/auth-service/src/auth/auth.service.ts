import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/user.schema';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { registerDTO } from '@app/dto';
@Injectable()
export class AuthService {
   constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
   ) {}

   async register(registerDTO: registerDTO): Promise<any> {
      const user = await this.userModel.findOne({
         $or: [
            { username: registerDTO.username },
            { email: registerDTO.email },
         ],
      });

      if (user) {
         const errorMessage =
            user.username === registerDTO.username
               ? 'User with this UserName already exists'
               : 'User with this Email already exists';
         throw new RpcException({
            message: errorMessage,
            statusCode: HttpStatus.CONFLICT,
         });
      }

      if (!registerDTO.username || !registerDTO.password) {
         throw new RpcException({
            message: !registerDTO.username
               ? 'Username is required'
               : 'Password is required',
            statusCode: HttpStatus.BAD_REQUEST,
         });
      } else {
         const HashedPassword = await bcrypt.hash(registerDTO.password, 10);

         await new this.userModel({
            ...registerDTO,
            password: HashedPassword,
         }).save();

         return {
            message: 'User registered successfully',
            data: {
               user: {
                  username: registerDTO.username,
                  email: registerDTO.email,
               },
            },
         };
      }
   }
}
