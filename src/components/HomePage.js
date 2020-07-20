import React from "react";
import Header from "./Header";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: flex-end;
`;

const FutureAndBeyondContainer = styled.div`
  width: 60vh;
  display: inline-block;
`;

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeHeadline = styled.h1`
  font-size: 10vh;
`;

const HomeSubHeading = styled.p`
  font-size: 3vh;
`;

const ImagemContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 60px;
  margin-top: 60px;
`;
const AstrounautImage = styled.img`
  width: 60%;
  float: left;
  text-align: right;

`;

const CenterAlign = styled.div`
  display: flex;
  justify-content: center;
`;
function HomePage(props) {
  const history = useHistory();

  const goToApplicationForm = () => {
    history.push("/formulario-candidato");
  };

  const goToLoginPage = () => {
    history.push("/login");
  };
  return (
    <div>
      <div>
        <Header />
      </div>
      <CenterAlign>
        <HomeContainer>
          <ImagemContainer>
            <AstrounautImage
              src="https://www.nicepng.com/png/full/62-627967_astronaut-floating-in-space-astronaut-png.png"
              alt="Astrounaut"
            />
          </ImagemContainer>
          <FutureAndBeyondContainer>
            <HomeHeadline>Ao infinito e além</HomeHeadline>
            <HomeSubHeading>
              Clique no botão abaixo para ser redirecionado para o formulário de
              inscrição e boa sorte!
            </HomeSubHeading>
            <button onClick={goToApplicationForm}>
              Formulário de inscrição
            </button>
          </FutureAndBeyondContainer>
        </HomeContainer>
      </CenterAlign>
    </div>
  );
}

export default HomePage;
