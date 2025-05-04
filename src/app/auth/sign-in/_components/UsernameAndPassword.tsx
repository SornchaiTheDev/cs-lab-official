"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "~/globalComponents/ui/button";
import { Input } from "~/globalComponents/ui/input";
import { Label } from "~/globalComponents/ui/label";

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
    <div className="flex flex-col gap-2 w-full mt-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={username}
          className="bg-gray-1 focus-visible:ring-0"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          className="bg-gray-1 focus-visible:ring-0"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        disabled={isLoading || isEmpty}
        onClick={handleSignIn}
        className="bg-grass-10 hover:bg-grass-11 mt-4"
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : "Sign In"}
      </Button>
    </div>
  );
}

export default UsernameAndPassword;
