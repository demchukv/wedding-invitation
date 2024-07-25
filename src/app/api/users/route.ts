import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    console.log(req.url);
    await dbConnect();
    
    try{
    const users = await User.find({});
       return NextResponse.json(users);
    }catch(err: any){
       return NextResponse.json({error: err.message});
    }
}