import { NextResponse } from "next/server"

export default function POST(req){
    console.log('POST /api/chat')
    return NextResponse.json({message: 'Hello from the server!'})
}