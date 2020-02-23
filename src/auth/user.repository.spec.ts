import { Test } from "@nestjs/testing";
import { UserRepository } from "./user.repository";
import { InternalServerErrorException } from "@nestjs/common";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

const mockCredentialsDto = {
  username: "TestUsername",
  password: "TestPassword",
  email: "Test@email.com"
};

describe("UserRepository", () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository]
    }).compile();
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe("signUp", () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it("sucessfully sign up the user", () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow();
    });

    it("throws a conflict exception username already exists", () => {
      save.mockRejectedValue({ code: "23505" });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow();
    });

    it("throws internal server exception of error code is not crecognized", () => {
      save.mockRejectedValue({ code: "123123" });
      expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe("validateUserPassword", () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = "TestUsername";
      user.validatePassword = jest.fn();
    });

    it("returns false if hash not corrent", async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const result = await userRepository.validateUserPassword(
        mockCredentialsDto.password,
        "12ads-123kdsad-2dkas-32ssd"
      );
      expect(result).toEqual(false);
    });
  });
});
