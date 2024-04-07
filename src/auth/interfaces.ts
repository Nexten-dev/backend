import { Token as PrismaToken } from '@prisma/client';

export interface Token {
    accessToken: string;
    refreshToken: PrismaToken;
}
