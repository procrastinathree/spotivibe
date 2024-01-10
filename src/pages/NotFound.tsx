import { buttonVariants } from "@/components/ui/button";
import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

const NotFound404: React.FC = () => {

  return (
    <div>
      <Helmet>
        <title>Spotivibe | Not Found</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen">
        <img
          src="https://i.pinimg.com/originals/66/e6/ab/66e6abd3327a7e5ba5374fe8377bdae8.png"
          className="w-96"
          alt="404 Illustration"
        />
        <div className="text-center mt-8">
          <h1 className="text-2xl md:text-3xl text-slate-200 mb-4">Page not found!</h1>
          <NavLink to={'/'} className={buttonVariants({ size: "lg" })}>
            Redirect to Main Page
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
