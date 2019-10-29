import { Controller, Post, Body} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserClass } from '../schemas/user.class';
import { UserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

@Controller('api/users/login')
export class LoginController {
  constructor(
      private authService: AuthService,
      @InjectModel('User') private readonly userModel: Model<UserClass>,
    ) {
        
    }
  @Post()
  async login(@Body() loginDTO: UserDTO) {
    const user = await this.userModel.findOne({
        email: loginDTO.email
    })
    if (!user) {
        return {
            error: "user not found"
        }
    }
    
    const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);
    if (!isPasswordValid) {
        return {
            error: "user not found"
        }
    }

    return {
      message: 'login successfuly',
      token: await this.authService.createToken(user),
    }
  }
}