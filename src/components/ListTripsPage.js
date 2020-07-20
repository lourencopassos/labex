import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HeaderLogged from "./HeaderLogged";
import axios from "axios";
import styled from "styled-components";

const Detail = styled.span`
  cursor: pointer;
  display: inline;
  margin-left: 10px;
  &:hover {
    font-weight: bold;
  }
`;
//Grid / List View

const TripListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TripName = styled.p`
  font-size: 3.5vh;
`;
const TripContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const baseURL =
  "https://us-central1-labenu-apis.cloudfunctions.net/labeX/lourenco-mello/trips";

function ListTripsPage(props) {
  const history = useHistory();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token === null) {
      history.push("/");
    }
  }, [history]);

  const fetchTripsList = () => {
    axios
      .get(baseURL)
      .then((response) => {
        setTrips(response.data.trips);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTripsList();
  }, [trips]);

  const goToCreateTripPage = () => {
    history.push("/criar-viagem");
  };

  const goToDetailPage = (tripId) => {
    history.push("/detalhesdaviagem/" + tripId);
  };

  return (
    <div>
      <HeaderLogged />
      <TripListContainer>
        <h1>Lista de Viagens</h1>
        <div>
          {trips.map((trip) => {
            return (
              <TripContainer>
                <TripName>{trip.name}</TripName>
                <Detail onClick={() => goToDetailPage(trip.id)}>
                  Detalhes
                </Detail>
              </TripContainer>
            );
          })}
        </div>
        <button onClick={goToCreateTripPage}>Criar nova Viagem</button>
      </TripListContainer>
    </div>
  );
}

export default ListTripsPage;
