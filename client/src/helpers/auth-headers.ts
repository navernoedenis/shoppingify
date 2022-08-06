interface AuthHeaders {
  "x-user-id": number;
  "x-user-email": string;
}

export function authHeaders(user: User | null): AuthHeaders {
  return user
    ? { "x-user-id": user.id, "x-user-email": user.email }
    : ({} as AuthHeaders);
}
