import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HeaderLogged from "./HeaderLogged";
import axios from "axios";
import styled from "styled-components";
import useForm from "../hooks/useForm";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: 40px 0 0 60px;
`;

const CreateTripPageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const FormInput = styled.input`
  width: 50%;
`;

const FormSelect = styled.select`
  width: 50%;
`;

const FormSendButton = styled.button`
  width: 50%;
  margin-top: 10px;
  display: block;
`;

function CreateTripPage(props) {
  const history = useHistory();
  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token === null) {
      history.push("/");
    }
  }, [history]);

  const { form, onChange } = useForm("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  const handleCreateTripSubmitButton = (event) => {
    const token = window.localStorage.getItem("token");
    event.preventDefault();
    const body = {
      name: form.name,
      planet: form.planet,
      date: form.date,
      description: form.description,
      durationInDays: Number(form.duration),
    };
    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labeX/lourenco-mello/trips",
        body,
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <HeaderLogged />

      <CreateTripPageContainer>
        <FormContainer onSubmit={handleCreateTripSubmitButton}>
          <form>
            <h1>Criar nova Viagem</h1>
            <p>Nome da Viagem</p>
            <FormInput
              value={form.name}
              required
              name={"name"}
              placeholder="Nome da Viagem"
              onChange={handleInputChange}
              pattern="[A-Za-z ]{5,}"
              title={"No mínimo cinco caracteres"}
            />
            <p>Data de Lançamento</p>
            <FormInput
              value={form.date}
              required
              name={"date"}
              type="date"
              min="2020-06-25"
              onChange={handleInputChange}
            />
            <p>Descrição da viagem</p>
            <FormInput
              value={form.description}
              required
              name={"description"}
              pattern="[A-Za-z0-9$&+,:;=?@#|'<>.-^*()%!\s ]{30,}"
              placeholder="Descrição da Viagem"
              onChange={handleInputChange}
              title={"No mínimo 30 caracteres"}
            />
            <p>Duração da viagem</p>
            <FormInput
              value={form.duration}
              type="number"
              required
              name={"duration"}
              min="50"
              placeholder="Duração da Viagem"
              onChange={handleInputChange}
            />
            <p>Planeta de Destino</p>
            <FormSelect
              required
              value={form.planet}
              name={"planet"}
              onChange={handleInputChange}
            >
              <option value={""}></option>
              <option value={"Marte"}>Marte</option>
              <option value={"Júpiter"}>Júpiter</option>
              <option value={"Mercúrio"}>Mercúrio</option>
              <option value={"Vênus"}>Vênus</option>
              <option value={"Saturno"}>Saturno</option>
              <option value={"Urano"}>Urano</option>
              <option value={"Netuno"}>Netuno</option>
            </FormSelect>
            <FormSendButton type="submit">Enviar formulário</FormSendButton>
          </form>
        </FormContainer>
      </CreateTripPageContainer>
    </div>
  );
}

export default CreateTripPage;
