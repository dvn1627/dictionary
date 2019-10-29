import { Controller, Post, Body} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserClass } from '../schemas/user.class';
import { UserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Controller('api/users/register')
export class SignUpController {
  constructor(
      @InjectModel('User') private readonly userModel: Model<UserClass>,
    ) {
        
    }
  @Post()
  async signUp(@Body() signupDTO: UserDTO) {
    const oldUser = await this.userModel.findOne({
        email: signupDTO.email
    })
    if (oldUser) {
        return {
            error: "user already exists"
        }
    }
    const salt = 10;
    const user = new this.userModel();
    user.email = signupDTO.email;
    user.password = await bcrypt.hash(signupDTO.password, salt);
    await user.save();
    return {
      message: 'sign up successfuly',
      user,
    }
  }
}