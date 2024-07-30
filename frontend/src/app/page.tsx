import { GoogleButton } from "./home/components/button";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <GoogleButton />
      </GoogleOAuthProvider>
    </main>
  );
}
