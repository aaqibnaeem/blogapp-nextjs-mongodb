import { NextResponse } from "next/server";
import { ConnectLink } from "../../../lib/db";
import { blogModel } from "../../../lib/Model/blogSchema";
import mongoose from "mongoose";

export async function DELETE(request, content) {
  const blog_id = content.params.blog_id;
  const record = { _id: blog_id };
  await mongoose.connect(ConnectLink);
  const result = await blogModel.deleteOne(record);
  return NextResponse.json({ result, success: true });
}

export async function PUT(request, content) {
  const blog_id = content.params.blog_id;
  const filter = { _id: blog_id };
  const payload = await request.json();
  console.log(payload);
  await mongoose.connect(ConnectLink);
  const result = await blogModel.findOneAndUpdate(filter, payload);
  return NextResponse.json({ result, success: true });
}
