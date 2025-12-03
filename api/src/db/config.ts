import dotenv from 'dotenv' 
import assert from 'assert' //checks if all required variables(needed to connect server to DB) exist
import sql from 'mssql'

// laod env var
dotenv.config()

// extract env var form the .env file 
const{
    SQL_SERVER,
    SQL_USER,
    SQL_PWD,
    SQL_DB,
    PORT
}=process.env

// ensure all enviroment variables are defined 
assert(PORT,"PORT is required")
assert(SQL_SERVER,"SQL_SERVER is required")
assert(SQL_USER,"SQL_USER required")
assert(SQL_PWD,"SQL_PWD required")
assert(SQL_DB,"SQL_DB required")

// define configuration object used to Database connection 
export const config={
    port:PORT,
    sqlConfig:{
        // define credentials used to conncet to DB 
        user:SQL_USER,
        password:SQL_PWD,
        database:SQL_DB,
        server:SQL_SERVER,
        // pool 
        pool:{
            max:10,
            min:0,
            idleTimeoutMillis:30000
        },
        options:{
            encrypt:true,
            trustServerCertificate:true
        }
    }
}

// define connection fun 
export const getPool = async () =>{
    try {
        const pool = await sql.connect(config.sqlConfig) //connect to sereve, store results in pool object
        return pool
    } catch (error) {
        console.log("SQL connection error",error)
        throw error //returns error encountered during connection
        
    }
}