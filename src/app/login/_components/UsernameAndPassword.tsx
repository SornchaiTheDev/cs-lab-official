"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function UsernameAndPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"INIT" | "ENTERED_USERNAME">("INIT");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (step === "INIT") {
      setStep("ENTERED_USERNAME");
      return;
    }
    const payload = {
      username,
      password,
    };

    try {
      setIsLoading(true);
      await new Promise((res) => setTimeout(() => res("finish"), 1000));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full mt-4">
      <Input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="h-12"
      />
      {step === "ENTERED_USERNAME" && (
        <Input
          name="password"
          placeholder="Password"
          className="h-12"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      <Button
        disabled={isLoading}
        onClick={handleSignIn}
        className="bg-grass-10"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </div>
  );
}

export default UsernameAndPassword;
