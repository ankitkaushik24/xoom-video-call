namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;

    NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/login";
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: "/sign-up";
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: "/";
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: "/";

    NEXT_PUBLIC_STREAM_APP_KEY: string;
    NEXT_PUBLIC_STREAM_APP_ID: string;
    STREAM_APP_SECRET: string;
  }
}
