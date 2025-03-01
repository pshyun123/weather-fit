import styled from "styled-components";
import mainImg from "../../images/main_bg.png";
const MainBannerComp = styled.section`
  background-image: url(${mainImg});
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  .sectionWrapper {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    width: 100%;
  }
`;

const MainBanner = () => {
  return (
    <>
      <MainBannerComp>
        <div className="sectionWrapper">
          <div className="container">
            <div className="textBox1"></div>
            <div className="cards"></div>
            <div className="textBox1"></div>
          </div>
        </div>
      </MainBannerComp>
    </>
  );
};
export default MainBanner;
