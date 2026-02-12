"use client";

import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Button } from "@/src/components/ui/button";
import { signIn } from "next-auth/react";

export default function SocialLoginButtons() {
  const handleSocialLogin = (provider: "google" | "facebook") => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        type="button"
        onClick={() => handleSocialLogin("google")}
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        type="button"
        onClick={() => handleSocialLogin("facebook")}
      >
        <FaFacebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
    </div>
  );
}
