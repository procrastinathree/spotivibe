import React from "react";
import { Helmet } from 'react-helmet';
import TopSectionOne from "@/components/home/TopSectionOne";
import TopSectionTwo from "@/components/home/TopSectionTwo";


const HomePage: React.FC = () => {

  return (
    <div>
      <Helmet>
        <title>Spotivibe | Unleash your experience</title>
      </Helmet>
      <div className="flex flex-col gap-16">
        <TopSectionOne />
        <TopSectionTwo />
      </div>
    </div>
  );
};

export default HomePage;
