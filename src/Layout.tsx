import { FC, ReactNode } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {

  return (
    <div className="flex flex-col min-h-screen gap-16 bg-neutral-950">
      <Header />
      <main className="container">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
