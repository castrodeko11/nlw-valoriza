import { NextFunction, Request, response, Response } from "express";

import { verify } from "jsonwebtoken";


interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    // receber o token
    const authToken = request.headers.authorization;

    // Validar se o authToken está preenchido
    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        // Validar se token é válido
        // const decode = verify(token, "e453d9dc1875c1adeceb26438e79b753");
        const { sub } = verify(token, "e453d9dc1875c1adeceb26438e79b753") as IPayload;

        // Recuperar informações do usuário
        request.user_id = sub;

        return next();
    } catch (error) {
        return response.status(401).end();
    }
}