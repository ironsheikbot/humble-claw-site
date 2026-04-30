import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Humble Claw Roast Generator",
  description: "Pick your fighters. Set the heat. Get roasted. Comedy Central-style roast scripts powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}