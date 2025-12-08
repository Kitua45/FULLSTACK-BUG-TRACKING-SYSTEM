export interface User {
    userid: number;
    first_name: string;
    last_name: string;
    email: string;
    role_user: string;
    password_hash: string;
    verification_code: string;
}

export interface NewUser {
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    role_user?: string;   // backend sets it
    created_at?: Date; 
}

// update user type
export interface UpdateUser {
    first_name?: string;
    last_name?: string;
    email?: string;
    role_user?: string;
    password_hash?: string;
}

