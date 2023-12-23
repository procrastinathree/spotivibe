import React from "react";
import { Helmet } from "react-helmet";

const NotFound404: React.FC = () => {

  return (
    <div>
      <Helmet>
        <title>Spotivibe | Not Found</title>
      </Helmet>
        <h1 className="text-3xl text-center font-bold mx-auto text-red-500 mt-64">Not Found Page!</h1> 
    </div>
  );
};

export default NotFound404;
