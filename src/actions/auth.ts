'use server'

import { LoginSchemaType } from "@/components/auth/login";
import { SignupSchemaType } from "@/components/auth/signup";
import { defaultSession, SessionData, sessionOptions } from "@/lib/lib";
import prisma from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs'

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (!session.id) {
    session.id = defaultSession.id
    session.name = defaultSession.name
  }

  return session
}

export async function login(data: LoginSchemaType) {
  const session = await getSession()

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    }
  })

  if (!user)
    throw new Error('Incorrect email or password');

  const validPassword = await bcrypt.compare(data.password, user.password)

  if (!validPassword)
    throw new Error('Incorrect email or password');

  // create the session
  session.id = user.id
  session.name = user.firstName
  await session.save()

  redirect('/')
}

export async function signup(data: SignupSchemaType) {
  const session = await getSession()

  const userExists = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })

  if (userExists)
    throw new Error('User with the given email already exists');

  // encrypt password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(data.password, salt)

  // create the user
  const user = await prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashedPassword,
    }
  })

  // create the session
  session.id = user.id
  session.name = user.firstName
  await session.save()

  redirect('/')
}

export async function logout() {
  const session = await getSession()
  session.destroy()
  redirect("/")
}