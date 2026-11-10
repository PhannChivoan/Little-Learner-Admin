import type { Metadata } from "next";
import Welcome from "./welcome";
import Footer from "./footer";

export const metadata: Metadata = {
  title: "Critter Academy – Web Admin",
  description: "Critter Academy – Web Admin",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%90%BE%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `window.CA_API=${JSON.stringify(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000")};window.CA_PLATFORM=${JSON.stringify(process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3000")};` }} />
        <link rel="stylesheet" href="/css/fonts.css" />
        <link rel="stylesheet" href="/css/app.css" />
        <link rel="stylesheet" href="/css/footer.css" />
        <link rel="stylesheet" href="/css/welcome.css" />
      </head>
      <body>
        <Welcome title="Welcome to Critter Academy Admin!" line="Let us get everything ready for you." />
        <div id="loginPage" hidden></div>
        <header className="top" id="top" hidden></header>
        <div className="shell" id="shell" hidden>
          <aside className="side card" id="side"></aside>
          <main className="main" id="view"></main>
        </div>
        <div id="toast" role="status"></div>
        <div className="ovl" id="ovl" hidden>
          <div className="mdl" id="mdl"></div>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
