import { NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()


export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
    const product = await prisma.product.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(product, {status: 200})
}


export const PATCH = async (req: Request, {params}: {params: {id: string}}) => {
    const body = await req.json()
    const product = await prisma.product.update({
        where: {
            id: Number(params.id)
        },
        data: {
            title: body.title,
            price: body.price,
            brand_id: body.brand_id
        }
    })
    return NextResponse.json(product, {status: 200})
}