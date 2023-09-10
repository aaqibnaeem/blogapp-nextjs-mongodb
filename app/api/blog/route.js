import { NextResponse } from "next/server";
import { ConnectLink } from "../../lib/db";
import { blogModel } from "../../lib/Model/blogSchema";
import mongoose from "mongoose";

export async function GET(request, content) {
  console.log(request, content);
  await mongoose.connect(ConnectLink);
  try {
    const data = await blogModel.find();
    return NextResponse.json({
      status: 200,
      data: data,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      data: data,
      success: false,
    });
  }
}

export async function POST(request) {
  await mongoose.connect(ConnectLink);
  try {
    const payload = await request.json();
    let blog = new blogModel(payload);
    const result = await blog.save();
    return NextResponse.json({ result, status: 200, success: true });
  } catch (error) {
    return NextResponse.json({ result, status: 400, success: false });
  }
}
