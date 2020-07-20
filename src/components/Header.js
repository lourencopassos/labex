import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border: 1px solid black;
  height: 5vw;
`;

const HeaderOption = styled.p`
  margin: 20px 15px;
  font-size: 2.5vh;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;
const HeaderLogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const HeaderOptionsContainer = styled.div`
  text-align: right;
  display: flex;
  justify-content: flex-end;
`;
function Header(props) {
  const history = useHistory();

  const goToLoginPage = () => {
    history.push("/login");
  };

  const goToApplicationForm = () => {
    history.push("/formulario-candidato");
  };

  return (
    <HeaderContainer>
      <HeaderLogoContainer>
      </HeaderLogoContainer>
      <HeaderOptionsContainer>
        <HeaderOption onClick={goToApplicationForm}>Inscrição</HeaderOption>
        <HeaderOption onClick={goToLoginPage}>Login</HeaderOption>
      </HeaderOptionsContainer>
    </HeaderContainer>
  );
}

export default Header;
