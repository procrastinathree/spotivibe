import React, { ReactNode } from "react";
import Header from "./components/layouts/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="container">
      <Header />
      <main>{children}</main>
      <footer>
        <h3>asdsad</h3>
      </footer>
    </div>
  );
};

export default Layout;
