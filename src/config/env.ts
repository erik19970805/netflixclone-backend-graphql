import { IEnv } from '@interfaces/IEnv';

const { DATABASE_URL, PORT, ACCESS_TOKEN } = process.env as unknown as IEnv;

export const port = String(PORT);

export const dbUrl = String(DATABASE_URL);

export const tokens = { accessToken: String(ACCESS_TOKEN) };
