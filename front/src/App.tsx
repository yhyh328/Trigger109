import React from 'react';
import { Header } from './component/navbar/Header'; 
import { MainSection } from './component/main/MainSection';
import  MainSection2  from './component/main/MainSection2';
import { MainSection3 }  from './component/main/MainSection3';
import  MainSection4   from './component/main/MainSection4';
import { MainSection5 } from './component/main/MainSection5';
import { Footer } from './component/main/Footer';
import { GlobalStyle } from './GlobalStyle';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <MainSection />
      <MainSection2/>
      <MainSection3/>
      <MainSection4/>
      <MainSection5/>
      <Footer />
    </>
  );
}

export default App;
