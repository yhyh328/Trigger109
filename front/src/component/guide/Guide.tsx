import styled from 'styled-components';
import GuideSection from './GuideSection';
import { DUMMY_GUIDEIMG1, DUMMY_GUIDEIMG2 } from './dummy-guideImg';

const GuideTopImg = styled.section`
  height: 80vh;
  background-image: url('/game_map_imgs/ww.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: white;
  padding-bottom: 20px;
`;

const GuideItemContainer = styled.div`
  flex: 1;
  background-color: #0F1923;
  padding: 50px 30px;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: white;
`;

const Title = styled.h2`
  font-size: 100px;
  font-family: 'Black Han Sans', sans-serif;
  color: #00FCCE;
  margin: 0;
`;

const ImageSection1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; // Ensures images are displayed in a column
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ImageSection2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row; // Ensures images are displayed in a row
  justify-content: space-around;
  align-items: center;
  overflow-x: auto; // Enables horizontal scrolling if items overflow
  margin-bottom: 20px;
`;

// Define Guide component
const Guide = () => {

  return (
    <>
      <GuideTopImg>
        {/* Additional content can be placed here */}
      </GuideTopImg>
      <GuideItemContainer>
        <Title>초보자 가이드</Title>
        <ImageSection1>
          {DUMMY_GUIDEIMG1.map((image1) => (
            <GuideSection key={image1.id} {...image1} />
          ))}
        </ImageSection1>
        <ImageSection2>
          {DUMMY_GUIDEIMG2.map((image2) => (
            <GuideSection key={image2.id} {...image2} />
          ))}
        </ImageSection2>
      </GuideItemContainer>
    </>
  );
};

export default Guide;
