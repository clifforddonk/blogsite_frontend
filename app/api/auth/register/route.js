import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Import Prisma Client

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return Response.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return Response.json({ error: "Error creating user" }, { status: 500 });
  }
}
