import AboutBuilding from "./AboutBuilding";
import Banner from "./Banner";
import Carousel from "./Carousel";
import HeavenlyConnected from "./HeavenlyConnected";
import Location from "./location";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HeavenlyConnected></HeavenlyConnected>
      <Carousel></Carousel>
      <AboutBuilding></AboutBuilding>
      <Reviews></Reviews>
      <Location></Location>
    </div>
  );
};

export default Home;
