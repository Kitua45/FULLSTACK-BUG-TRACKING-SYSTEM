import * as UserRepository from "../../src/Repositories/users.repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../src/mailer/mailer';
import { emailTemplate } from '../../src/mailer/emailTemplates';
import { userService } from '../../src/services/user.service'; 

// mocking external dependencies
jest.mock("../../src/Repositories/users.repository");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../src/mailer/mailer");
jest.mock("../../src/mailer/emailTemplates");

//positive tests
describe("User services Test suite", () => {

  afterEach(() => {
    jest.clearAllMocks();
    // clears all the mocks after test leaving it clean and ensuring that none of the tests is tampered with
  });

  // testing listing all users 
  it("should return a list of users", async () => {
    const mockUsers = [
      { userid: 1, first_name: "Agnes", last_name: "Kitua", email: "agnes@gmail.com" },
      { userid: 2, first_name: "David", last_name: "Karanja", email: "dave@gmail.com" },
      { userid: 3, first_name: "Kelly", last_name: "Kamau", email: "kelly@gmail.com" }
    ];

    (UserRepository.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    const users = await userService.listUsers();
    expect(users).toEqual(mockUsers);
    expect(UserRepository.getUsers).toHaveBeenCalledTimes(1);
  });

  it("should hash the password, save user, and send verification email", async () => {
    const newUser = {
      first_name: "Nicholas",
      last_name: "Wamuthende",
      email: "wamuthende345@gmail.com",
      password_hash: "amuthende45"
    };

    const hashedPassword = "amuthende45";

    // Mocking functions
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (UserRepository.createUser as jest.Mock).mockResolvedValue({ message: 'User created successfully' });
    (UserRepository.setVerificationCode as jest.Mock).mockResolvedValue({});
    (sendEmail as jest.Mock).mockResolvedValue(true);
    (emailTemplate.verify as jest.Mock).mockReturnValue("<p>Your verification code is 345678</p>");

    const result = await userService.createUser(newUser as any);

    expect(result).toEqual({ message: 'User created successfully. Verification code sent to email' });
    expect(bcrypt.hash).toHaveBeenCalledWith(newUser.password_hash, 10);
    expect(UserRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
      ...newUser,
      password_hash: hashedPassword
    }));
    expect(sendEmail).toHaveBeenCalled();
  });

  it("should hash the password and update the user by ID", async () => {
    const userId = 1;
    const updateData = {
      first_name: "Nicholas",
      last_name: "Wamuthende",
      password_hash: "newPassword123"
    };

    const hashedPassword = "newPassword123";

    (UserRepository.getUserById as jest.Mock).mockResolvedValue({
      userid: userId,
      first_name: "OldName",
      last_name: "OldLast",
      password_hash: "oldHash"
    });

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (UserRepository.updateUser as jest.Mock).mockResolvedValue({
      message: "User updated successfully"
    });

    const result = await userService.updateUser(userId, updateData as any);

    expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    expect(bcrypt.hash).toHaveBeenCalledWith(updateData.password_hash, 10);
    expect(UserRepository.updateUser).toHaveBeenCalledWith(userId, expect.objectContaining({
      ...updateData,
      password_hash: hashedPassword
    }));
    expect(result).toEqual({ message: "User updated successfully" });
  });

  // NEGATIVE TESTS
  describe("Negative test scenarios", () => {

    it("should throw an error if listing users fails", async () => {
      (UserRepository.getUsers as jest.Mock).mockRejectedValue(new Error("DB error"));
      await expect(userService.listUsers()).rejects.toThrow("DB error");
    });

    it("should throw an error if creating user fails", async () => {
      const newUser = {
        first_name: "Nicholas",
        last_name: "Wamuthende",
        email: "wamuthende345@gmail.com",
        password_hash: "amuthende45"
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPass");
      (UserRepository.createUser as jest.Mock).mockRejectedValue(new Error("Failed to create user"));

      await expect(userService.createUser(newUser as any)).rejects.toThrow("Failed to create user");
    });

    it("should throw an error if updating a non-existing user", async () => {
      const userId = 99;
      const updateData = { first_name: "Test", password_hash: "pass123" };

      (UserRepository.getUserById as jest.Mock).mockResolvedValue(null);

      await expect(userService.updateUser(userId, updateData as any))
        .rejects.toThrow(`User with ID ${userId} not found`);
    });

  });

});
