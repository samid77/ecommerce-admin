import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST(req:Request, {params}: {params: {storeId: string}}) {
    try {
        const {userId} = auth();
        if(!userId) return new NextResponse('Unauthorized', {status: 401})

        const body = await req.json();
        const {label, imageUrl} = body;
        if(!label) return new NextResponse('Label is required', {status: 400});
        if(!imageUrl) return new NextResponse('Image URL is required', {status: 400});
        if(!params.storeId) return new NextResponse('Store Id is required', {status: 400})

        const store = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(store);

    } catch (error) {
        console.error(`[BILLBOARD_POST_ERROR]: ${error}`)
        return new NextResponse('Internal error', {status: 500})
    }
}