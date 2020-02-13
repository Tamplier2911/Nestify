import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return await this.userRepository.validateUser(authCredentialsDto);
  }
}
