import React from "react";
import { Helmet } from 'react-helmet';


const HomePage: React.FC = () => {

  return (
    <div>
      <Helmet>
        <title>Spotivibe | Unleash your experience</title>
      </Helmet>
      <h1 className="mx-auto mt-64 text-3xl font-bold text-center text-green-500"></h1>
    </div>
  );
};

export default HomePage;
