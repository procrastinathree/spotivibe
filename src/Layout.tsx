import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
  }

  const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <header>
        <div><h1>sadsadsad</h1></div>
      </header>
      <main>{children}</main>
      <footer>
        <h3>asdsad</h3>
      </footer>
    </>
  );
};

export default Layout;
