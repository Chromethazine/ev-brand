import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ember Motors | Ember Dusk",
  description:
    "A cinematic homepage for the Ember Dusk, a luxury electric SUV coupe built for quiet power and private test drive experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
