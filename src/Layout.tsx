import { FC, ReactNode } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen gap-16 bg-neutral-950">
        <Header />
        <main className="container">
          {children}
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
