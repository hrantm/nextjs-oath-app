import { NextRequest, NextResponse } from "next/server";
import schema from './schema';
import prisma from "@/prisma/client";

export async function GET(request: NextRequest){
    // fetch users
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}

export async function POST(request: NextRequest){
    const body = await request.json()
    const validation = schema.safeParse(body)
    if(!validation.success){
        return NextResponse.json({error: validation.error.errors}, {status: 400})
    }
    try{
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email
            }
        })
        return NextResponse.json({id: user.id, name: user.name, email: user.email}, {status: 201})
    } catch(error){
        return NextResponse.json({error: error}, {status: 400})
    }

}