import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string,
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        // Verificar se email existe
        const user = await usersRepository.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password incorrect");
        }

        // Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        // Gerar Token
        const token = sign({
            email: user.email
        }, "e453d9dc1875c1adeceb26438e79b753", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;

    }
}


export { AuthenticateUserService }