import { errors } from "@/constants/error.constants";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// Validates that the string is a properly formatted email address
export const isValidEmail = (
  email: string,
): { valid: boolean; message: string } => {
  const valid = EMAIL_REGEX.test(email.trim());
  return { valid, message: errors.INVALID_EMAIL };
};

export const isError = (err: unknown): err is Error => err instanceof Error;
