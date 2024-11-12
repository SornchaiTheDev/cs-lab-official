import type { Metadata } from "next";
import { Poppins, Anuphan } from "next/font/google";

import "./globals.css";
import { env } from "~/lib/env";
import Loading from "~/components/commons/Loading";
import { Suspense } from "react";

const poppins = Poppins({
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
    url: env.PUBLIC_URL,
    siteName: "CS Lab",
    locale: "en_US",
    type: "website",
  },
  manifest: `${env.PUBLIC_URL}/manifest.json`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${anuphan.variable}`}>
        <Suspense>
          <Loading />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
