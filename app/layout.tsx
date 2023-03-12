import { getServerSession } from "next-auth";
import Login from "../components/Login";
import { SessionProvider } from "../components/SessionProvider";
import Sidebar from "../components/Sidebar";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "../styles/globals.css";

export const metadata = {
  title: "ChatGPT Messenger",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex h-screen text-sm">
              <Sidebar />

              {/* Client Provider - notifications */}
              <div className="bg-background flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}