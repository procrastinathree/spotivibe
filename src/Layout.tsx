import { FC, ReactNode } from "react";
import Header from "./components/layouts/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {

  return (
    <div className="flex flex-col gap-16">
      <Header />
      <main>{children}</main>
      <footer>
        <h3>asdsad</h3>
      </footer>
    </div>
  );
};

export default Layout;
