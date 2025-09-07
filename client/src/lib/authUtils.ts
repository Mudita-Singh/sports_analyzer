export function isUnauthorizedError(error: Error): boolean {
  return /^401: .*Unauthorized/.test(error.message);
}

export function validateMobile(mobile: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(mobile);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6;
}
