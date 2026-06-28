import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Providers from "./providers";
import AIAssistant from "../components/common/AIAssistant";

export const metadata = {
  title: "CareerBridge AI",
  description: "Smart Placement Training Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
          <AIAssistant />
        </Providers>
      </body>
    </html>
  );
}