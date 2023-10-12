import { NextRequest, NextResponse } from "next/server";
import schema from '../schema';
import prisma from "@/prisma/client";

export async function GET(request: NextRequest, {params} : {params: {id: string}}){    
// Fetch data from db
    const user = await prisma.user.findUnique({where: {id: params.id}})
    if (!user){
        return NextResponse.json({error: 'User not found'}, {status: 404})
    }else{
        return NextResponse.json(user)
    }

}

export async function PUT(request: NextRequest, {params} : {params: {id: string}}){
    // Valdate request body
    const body = await request.json()
    const validation = schema.safeParse(body)
    if (!validation.success){
        return NextResponse.json({error: validation.error.errors}, {status: 400})
    }
    const user = await prisma.user.findUnique({
        where: {
            id: params.id
        }
    })
    if (!user){
        return NextResponse.json({error: 'User not found'}, {status: 404})
    }
    try {
        const updatedUser = await prisma.user.update({
            where: {id: user.id},
            data: {
                name: body.name,
                email: body.email
            }
        })
        return NextResponse.json({name: updatedUser.name, id: updatedUser.id, email: updatedUser.email})
    } catch (error){
        return NextResponse.json({error: error}, {status: 400})
    }
}

export async function DELETE(request: NextRequest,  {params} : {params: {id: string}}){
    try {
        const user = await prisma.user.delete({
            where: {id: params.id}
        })
        return NextResponse.json({id: user.id})
    } catch (error){
        return NextResponse.json({error: error}, {status: 400})
    }
}