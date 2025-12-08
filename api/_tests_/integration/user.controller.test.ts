import request from "supertest";
import app from "../../src/index";
import { getPool } from "../../src/db/config";
import bcrypt from "bcrypt";

let pool: any;

beforeAll(async () => {
    pool = await getPool();  // connect to DB
    const hashedPassword = await bcrypt.hash("ombachi", 10);
    await pool.request().query(`
        INSERT INTO Users (first_name, last_name, email, password_hash)
        VALUES ('Dennis', 'Ombachi', 'ombachi@testmail.com', '${hashedPassword}')
    `);
});

afterAll(async () => {
    await pool.request().query(`
        DELETE FROM Users 
        WHERE email = 'ombachi@testmail.com'
    `);
    await pool.close();
});

describe("User API Integration Test", () => {
    it("should authenticate the user and return a token", async () => {
        const res = await request(app).post("/login").send({
            email: "ombachi@testmail.com",
            password: "ombachi"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token")
        expect(res.body.message).toMatch(/login successful/i)
        expect(res.body.user.email).toBe("ombachi@testmail.com");
   
    });





 it("should fail with the wrong password", async () => {
    const res = await request(app).post("/login").send({
        email: "ombachi@testmail.com",
        password: "patpatpat"
    });

    expect(res.statusCode).toBe(404)
     expect(res.body.message).toMatch(/Invalid Credentilas/i);

});
it("should fail when using a non existent email", async () => {
    const res = await request(app).post("/login").send({
        email: "ombachiree@testmail.com",
        password: "anyPassword123"
    });

    expect(res.statusCode).toBe(400); 
    expect(res.body.message).toMatch(/User not found/i); 
});


    
});
describe("User API Integration Test", () => {

    // user creation
    it("should create a new user successfully", async () => {
        const res = await request(app).post("/users").send({
            first_name: "Test",
            last_name: "User",
            email: "testuser123@testmail.com",
            password: "TestPass123"
        });

        expect(res.statusCode).toBe(201); 
        
        expect(res.body.message).toBe("User created successfully. Verification code sent to email/i");
       
    });

    //cleaning
    afterAll(async () => {
        const pool = await getPool();
        await pool.request().query(`
            DELETE FROM Users WHERE email = 'testuser123@testmail.com'
        `);
        await pool.close();
    });
    

});

   