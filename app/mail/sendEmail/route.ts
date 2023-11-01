import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  console.log(email);

  const response = new NextResponse("Response content", { status: 200 });
  return response;

}


