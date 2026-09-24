import type { Metadata } from "next";
import { AuthScreen } from "@/components/auth-screen";

export const metadata: Metadata = { title: "Log In" };

export default function SignInPage() {
  return <AuthScreen mode="signin" />;
}
