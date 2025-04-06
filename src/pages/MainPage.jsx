import MainBanner from "../component/main/WeatherMain";
import OutfitsRecommend from "../component/main/outfits_remmand";
import OutfitsPrefer from "../component/main/outfits_prefer";
import OutfitsPurpose from "../component/main/outfits_purpose";

const MainPage = () => {
  return (
    <>
      <MainBanner />
      <OutfitsRecommend />
      <OutfitsPrefer />
      <OutfitsPurpose />
    </>
  );
};
export default MainPage;
