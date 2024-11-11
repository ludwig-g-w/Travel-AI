"use server";
import { Text } from "react-native";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default async function renderInfo({ name }: { name: string }) {
  // Fetch user data or any other data you need
  const user = await getUser({ id: 1 }); // Example: Fetch user with ID 1

  return (
    <>
      <Text>Hello, {name}!</Text>
      {user && <Text>User Email: {user.email}</Text>}
    </>
  );
}

export async function getUser({ id }: { id: number }) {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function createUser({ email }: { email: string }) {
  try {
    const user = await db.user.create({
      data: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}
