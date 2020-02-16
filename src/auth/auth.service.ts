import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    // return await this.userRepository.validateUser(authCredentialsDto);
    const userObject = await this.userRepository.validateUser(
      authCredentialsDto
    );

    const { username, email } = userObject;
    const payload: JwtPayload = { username, email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };

    // return { data: userObject , accessToken };
    // <{ data: User; accessToken: string }>
  }
}
