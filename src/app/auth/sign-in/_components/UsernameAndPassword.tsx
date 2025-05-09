"use client";

import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/lib/api";

function UsernameAndPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const isEmpty = username === "" || password === "";

  const router = useRouter();

  const handleSignIn = async () => {
    const _payload = {
      username,
      password,
    };

    try {
      setIsLoading(true);
      await api.post("/auth/sign-in/credential", _payload);
      router.push("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data.code === 401) {
          router.push("/auth/sign-in?error=INVALID_CREDENTIAL");
          return;
        }
        router.push("/auth/sign-in?error=SOMETHING_WENT_WRONG");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      <form onSubmit={handleSignIn}>
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
          className="bg-grass-10 hover:bg-grass-11 mt-4 w-full"
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
}

export default UsernameAndPassword;
