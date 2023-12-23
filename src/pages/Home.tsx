import React from "react";
import { Helmet } from 'react-helmet';


const HomePage: React.FC = () => {

  return (
    <div>
      <Helmet>
        <title>Spotivibe | Unleash your experience</title>
      </Helmet>
        <h1 className="text-3xl text-center font-bold mx-auto text-green-500 mt-64">Founded the page</h1> 
    </div>
  );
};

export default HomePage;
