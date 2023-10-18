import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  console.log(email);



  return NextResponse;
}