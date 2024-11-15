"use client";

import { useState } from "react";
import { Button } from "~/globalComponents/ui/button";
import { Input } from "~/globalComponents/ui/input";

function UsernameAndPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const isEmpty = username === "" || password === "";

  const handleSignIn = async () => {
    const _payload = {
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
      <Input
        name="password"
        placeholder="Password"
        className="h-12"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        disabled={isLoading || isEmpty}
        onClick={handleSignIn}
        className="bg-grass-10 hover:bg-grass-11"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </div>
  );
}

export default UsernameAndPassword;
