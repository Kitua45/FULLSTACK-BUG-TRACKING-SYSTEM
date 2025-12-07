import * as userRepositories from "../src/Repositories/users.repository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../src/mailer/mailer';
import { emailTemplate } from '../src/mailer/emailTemplates';
import { userService } from '../src/services/user.service'; 

// mocking external dependencies
jest.mock("../src/Repositories/users.repository");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../src/mailer/mailer");
jest.mock("../src/mailer/emailTemplates");

// the describe blocks
describe("User services Test suite", () => {

  afterEach(() => {
    jest.clearAllMocks();
    // clears all the mocks after test leaving it clean and ensuring that none of the tests is tampered with
  });

  // testing listing all users 
  it("should return a list of users", async () => {
    const mockUsers = [
      {
        userid: 1,
        first_name: "Agnes",
        last_name: "Kitua",
        email: "agnes@gmail.com"
      },
      {
        userid: 2,
        first_name: "David",
        last_name: "Karanja",
        email: "dave@gmail.com"
      },
      {
        userid: 3,
        first_name: "Kelly",
        last_name: "Kamau",
        email: "kelly@gmail.com"
      }
    ];

    (userRepositories.getUsers as jest.Mock).mockResolvedValue(mockUsers);
    const users = await userService.listUsers();
    expect(users).toEqual(mockUsers);
    expect(userRepositories.getUsers).toHaveBeenCalledTimes(1)
  });

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
  (userRepositories.createUser as jest.Mock).mockResolvedValue({ message: 'User created successfully' });
  (userRepositories.setVerificationCode as jest.Mock).mockResolvedValue({});
  (sendEmail as jest.Mock).mockResolvedValue(true);
  (emailTemplate.verify as jest.Mock).mockReturnValue("<p>Your verification code is 345678</p>");

  // Calling the  function (createUser)
  const result = await userService.createUser(newUser as any); // cast if needed

  expect(result).toEqual({ message: 'User created successfully. Verification code sent to email' });
  expect(bcrypt.hash).toHaveBeenCalledWith(newUser.password_hash, 10);
  expect(userRepositories.createUser).toHaveBeenCalledWith(expect.objectContaining({
    ...newUser,
    password_hash: hashedPassword
  }));
  expect(sendEmail).toHaveBeenCalled();
});

beforeEach(() => {
  jest.clearAllMocks();
});
// hashing passord and updating user

it("should hash the password and update the user by ID", async () => {
  const userId = 1;
  const updateData = {
    first_name: "Nicholas",
    last_name: "Wamuthende",
    password_hash: "newPassword123"
  };

  const hashedPassword = "newPassword123";

  (userRepositories.getUserById as jest.Mock).mockResolvedValue({
    userid: userId,
    first_name: "OldName",
    last_name: "OldLast",
    password_hash: "oldHash"
  });

  (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
  (userRepositories.updateUser as jest.Mock).mockResolvedValue({
    message: "User updated successfully"
  });

  const result = await userService.updateUser(userId, updateData as any);

  expect(bcrypt.hash).toHaveBeenCalledTimes(1);
  expect(bcrypt.hash).toHaveBeenCalledWith(updateData.password_hash, 10);
  expect(userRepositories.updateUser).toHaveBeenCalledWith(userId, expect.objectContaining({
    ...updateData,
    password_hash: hashedPassword
  }));
  expect(result).toEqual({ message: "User updated successfully" });
});


