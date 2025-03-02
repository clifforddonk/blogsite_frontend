import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return Response.json({ message: "Login successful", user });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
