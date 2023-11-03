type student = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  classification: string,
  gpa: number
}

type attachment = {
  name: string,
  path: string,
}

type email = {
  recipients: string[],
  subject: string,
  body: string,
  attachments?: attachment[],
}