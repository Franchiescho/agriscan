import { NextResponse } from "next/server";
import path from "path";
import {WriteFile} from "fs/promises";

export const POST = async (req , res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file){
    return NextResponse.json({error: "No files recived"}, {status : 400});
  }
}