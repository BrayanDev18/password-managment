import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, userName } = await req.json()
    const hashedPassword = await hash(password, 10)

    if (!email || !password) new NextResponse("Missing required fields", { status: 400 })

    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
        userName
      }
    })

    return NextResponse.json(user)

  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}