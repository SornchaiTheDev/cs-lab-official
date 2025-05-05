export {};

declare global {
  interface Window {
    env: {
      CLIENT_API_URL: string;
    };
  }
}
