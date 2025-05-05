import type { Metadata } from "next";
import { Onest, Anuphan } from "next/font/google";

import "./globals.css";
import AppLoading from "~/components/commons/AppLoading";
import { Suspense } from "react";
import { ClientEnv } from "~/lib/client-env";

const onest = Onest({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const anuphan = Anuphan({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-anuphan",
});

export const metadata: Metadata = {
  title: "CS Lab",
  description:
    "Programming Lab Web application @Computer Science Kasetsart University",
  keywords: ["CS Lab", "computer science", "CS Grader"],
  authors: [{ name: "SornchaiTheDev" }],
  creator: "SornchaiTheDev",
  openGraph: {
    title: "CS Lab",
    description:
      "Programming Lab Web application @Computer Science Kasetsart University",
    url: process.env.WEB_URL,
    siteName: "CS Lab",
    locale: "en_US",
    type: "website",
  },
  manifest: `${process.env.WEB_URL}/manifest.json`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ClientEnv />
      </head>
      <body className={`${onest.className} ${anuphan.variable}`}>
        <Suspense>
          <AppLoading />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
