import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  border: 1px solid black;
  height: 5vw;
  text-align: right;
`;

const HeaderOption = styled.p`
  margin: 20px 15px;
  font-size: 2.5vh;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

function Header(props) {
  const history = useHistory();

  const logout = () => {
    window.localStorage.clear();
    history.push("/");
  };

  const goToManageCandidates = () => {
    history.push("/gerenciar-candidatos");
  };

  const goToCreateTripPage = () => {
    history.push("/criar-viagem");
  };

  const goToTripListPage = () => {
    history.push("/lista-viagens");
  };

  return (
    <HeaderContainer>
      <HeaderOption onClick={goToCreateTripPage}>
        Criar nova Viagem
      </HeaderOption>
      <HeaderOption onClick={goToTripListPage}>Lista de Viagens</HeaderOption>
      <HeaderOption onClick={logout}>Logout</HeaderOption>
    </HeaderContainer>
  );
}

export default Header;
