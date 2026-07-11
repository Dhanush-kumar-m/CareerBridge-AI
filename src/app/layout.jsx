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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var originalAdd = window.addEventListener;
                var originalRemove = window.removeEventListener;
                var map = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

                window.addEventListener = function(type, listener, options) {
                  if ((type === 'error' || type === 'unhandledrejection') && typeof listener === 'function') {
                    var wrapped = function(event) {
                      var error = event.error || (event.reason !== undefined ? event.reason : null);
                      var isScript = event.target && event.target.tagName === 'SCRIPT';
                      var isEvent = !error || String(error) === '[object Event]' || error.toString() === '[object Event]' || (typeof error === 'object' && !error.message);
                      if (isScript || isEvent) {
                        try {
                          event.preventDefault();
                          event.stopPropagation();
                          event.stopImmediatePropagation();
                        } catch(e) {}
                        return;
                      }
                      return listener.apply(this, arguments);
                    };
                    if (map) map.set(listener, wrapped);
                    return originalAdd.call(this, type, wrapped, options);
                  }
                  return originalAdd.call(this, type, listener, options);
                };

                window.removeEventListener = function(type, listener, options) {
                  if ((type === 'error' || type === 'unhandledrejection') && typeof listener === 'function') {
                    var wrapped = map ? map.get(listener) : null;
                    if (wrapped) {
                      return originalRemove.call(this, type, wrapped, options);
                    }
                  }
                  return originalRemove.call(this, type, listener, options);
                };

                // Also register capture phase fallback listeners to catch events before anyone else
                var fallbackHandler = function(event) {
                  var error = event.error || (event.reason !== undefined ? event.reason : null);
                  var isScript = event.target && event.target.tagName === 'SCRIPT';
                  var isEvent = !error || String(error) === '[object Event]' || error.toString() === '[object Event]' || (typeof error === 'object' && !error.message);
                  if (isScript || isEvent) {
                    try {
                      event.preventDefault();
                      event.stopPropagation();
                      event.stopImmediatePropagation();
                    } catch(e) {}
                  }
                };
                originalAdd.call(window, 'error', fallbackHandler, true);
                originalAdd.call(window, 'unhandledrejection', fallbackHandler, true);
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>
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