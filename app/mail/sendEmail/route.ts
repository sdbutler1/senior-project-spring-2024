import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {subject, body, recipients, attachments} = await request.json();
  console.log(subject, body, recipients)
  console.log(process.env.NEXT_PUBLIC_EMAIL_ADDRESS)
  console.log(process.env.NEXT_PUBLIC_EMAIL_PASSWORD)

  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    // host: "smtp.forwardemail.net",
    // port: 465,
    // secure: true,
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });

  async function sendEmail() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_ADDRESS, // sender address
      to: 'carbymatthew808@gmail.com', // list of receivers
      subject: subject, // Subject line
      html: body, // html body
      attachments: attachments,
    });
  }
  await sendEmail();

  const response = new NextResponse("Response content", { status: 200 });
  return response;
  
}

// await request.json()
// .then(res => console.log(res))
// console.log(email);

