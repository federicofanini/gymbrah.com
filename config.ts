export const port = process.env.PORT || 3000;
export const host = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : `http://localhost:${port}`;
