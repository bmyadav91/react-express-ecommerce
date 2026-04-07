import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const generateJwtToken = (
    data: Record<string, any>,
    expiry: string = '7d',
    secret: string | null = null
) => {

    const secret_key = (secret || process.env.JWT_SECRET) as Secret;

    if (!secret_key) {
        throw new Error("Developer Error: Secret key not provided and JWT_SECRET is missing in .env");
    }

    const options: SignOptions = {
        expiresIn: expiry as any
    };

    return jwt.sign({ ...data }, secret_key, options);
}