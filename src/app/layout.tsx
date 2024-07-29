import type { Metadata } from "next";
import { Poppins, Anuphan } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import NavigationEvents from "~/components/commons/NavigationEvents";
import { Suspense } from "react";

import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";

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
    "Computer Lab Web application @Computer Science Kasetsart University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${poppins.className} ${anuphan.variable}`}>
        <MantineProvider>
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
