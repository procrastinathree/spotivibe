import TopofTheDayCard from "@/components/home/TopofTheDay";
import React from "react";
import { Helmet } from 'react-helmet';


const HomePage: React.FC = () => {

  return (
    <div>
      <Helmet>
        <title>Spotivibe | Unleash your experience</title>
      </Helmet>
      <div className="container flex flex-col">
        <TopofTheDayCard />
      </div>
    </div>
  );
};

export default HomePage;
