
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Sidebar from "@/components/Layout/Sidebar";
import local from 'next/font/local'


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className={`flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <Sidebar />
        <div className="flex-grow p-4 bg-gray-200 dark:bg-gray-800">
          <Component {...pageProps} />
        </div>
      </main>
    </ThemeProvider>
  );
}
