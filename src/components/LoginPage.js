import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

const baseURL =
  "https://us-central1-labenu-apis.cloudfunctions.net/labeX/lourenco-mello";

const LoginHeadline = styled.h1``;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const LoginInput = styled.input`
  width: 100%;
`;
const LoginButton = styled.button`
  margin-top: 15px;
`;

function LoginPage(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      history.push("/lista-viagens");
    }
  }, [history]);

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    const loginBody = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${baseURL}/login`, loginBody);
      window.localStorage.setItem("token", response.data.token);
      history.push("/lista-viagens");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <LoginHeadline>Login</LoginHeadline>
        <p>Usuário</p>
        <LoginInput value={email} onChange={handleEmailInput} />
        <p>Senha</p>
        <LoginInput
          type="password"
          value={password}
          onChange={handlePasswordInput}
        />
        <LoginButton onClick={login}>Login</LoginButton>
      </LoginContainer>
    </Container>
  );
}

export default LoginPage;
