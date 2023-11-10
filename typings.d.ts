type student = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  classification: string,
  gpa: number
}

type email = {
  cc?: string[],
  recipients: string[],
  subject: string,
  body: string,
  attachments?: attachment[],
}

type attachedFile = {
  path: string | ArrayBuffer | null,
  filename: string,
}