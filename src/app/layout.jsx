import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});
export const metadata = {
  title: "Hard Dex",
  description: "O melhor lugar para encontrar os melhores hardwares para você!"
};
export default async function RootLayout({
  children
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("harddex-theme")?.value ?? "light";
  return <html lang="pt-br" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased ${theme}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>;
}