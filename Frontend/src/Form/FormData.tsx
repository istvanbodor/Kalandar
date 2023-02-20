import React from "react";


export interface User {
    username: string;
    password: string;
    email: string;
}

let index = 0;

export const User_Data: User[] = [
    {
        username: "Gábor",
        password: "123",
        email: "asd@gmail.com"
    }

]

export default FormData;