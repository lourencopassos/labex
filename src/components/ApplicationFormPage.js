import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useForm from "../hooks/useForm";
import useTripList from "../hooks/useTripList";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: 40px 0 0 20px;
`;

const ImageContainer = styled.div`
  width: 50vw;
  background-color: black;
`;

const ApplicationFormPageContainer = styled.div`
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

const FormDescription = styled.textarea`
  width: 50%;
  height: 20%;
`;
function ApplicationFormPage(props) {
  const history = useHistory();
  const trips = useTripList();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };
  const { form, onChange } = useForm("");
  const { getNames } = require("country-list");

  const countries = getNames();

  const handleApplicationFormSubmitButton = (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    const body = {
      name: form.name,
      age: Number(form.age),
      applicationText: form.description,
      profession: form.profession,
      country: form.country,
    };
    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labeX/lourenco-mello/trips/${form.id}/apply`,
        body
      )
      .then((response) => {
        alert("A sua aplicação foi enviada com sucesso!");
        history.push("/");
      })
      .catch((error) => {
        alert("Aconteceu um erro durante a sua requisição" + error);
      });
  };

  return (
    <ApplicationFormPageContainer>
      <FormContainer>
        <form onSubmit={handleApplicationFormSubmitButton}>
          <h1>Formulário de inscrição</h1>
          <p>Nome Completo</p>
          <FormInput
            value={form.name}
            onChange={handleInputChange}
            type="text"
            pattern="[\wÀ-ú ]{3,}"
            name={"name"}
            required
          />
          <p>Profissão</p>
          <FormInput
            value={form.profession}
            pattern="[\wÀ-ú ]{10,}"
            name={"profession"}
            onChange={handleInputChange}
            required
          />
          <p>Idade</p>
          <FormInput
            value={form.age}
            type="number"
            min="18"
            name={"age"}
            onChange={handleInputChange}
            required
          />
          <p>País</p>
          <FormSelect
            required
            value={form.country}
            name={"country"}
            onChange={handleInputChange}
          >
            <option value={""}></option>
            {countries.map((country) => {
              return <option value={country}>{country}</option>;
            })}
            ;
          </FormSelect>
          <p>Por que devo ser selecionado?</p>
          <FormDescription
            required
            value={form.description}
            name={"description"}
            onChange={handleInputChange}
            pattern="[\wÀ-ú ]{30,}"
          />
          <p>Viagem que estou interessado</p>
          <FormSelect value={form.id} name="id" onChange={handleInputChange}>
            <option value=""></option>
            {trips &&
              trips.map((trip) => {
                return (
                  <option value={trip.id}>
                    {trip.name} - {trip.planet}
                  </option>
                );
              })}
          </FormSelect>
          <FormSendButton type="submit">Enviar formulário</FormSendButton>
        </form>
      </FormContainer>
      <ImageContainer>
        <div></div>
      </ImageContainer>
    </ApplicationFormPageContainer>
  );
}

export default ApplicationFormPage;
