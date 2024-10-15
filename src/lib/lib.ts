import { SessionOptions } from "iron-session";

export interface SessionData {
  id: string | null
  name: string | null
}

export const defaultSession: SessionData = {
  id: null,
  name: null,
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: process.env.COOKIE_NAME!,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
