import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import HeaderLogged from "./HeaderLogged";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0 0 30px;
`;

const ImageContainer = styled.div`
  width: 50vw;
  background-color: black;
`;

const DetailPageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const CandidateContainer = styled.div`
  display: block;
  border: 1px solid black;
  margin: 20px 10px;
  padding: 10px;
  width: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CandidateName = styled.p`
  font-weight: bold;
`;

const CandidatesListContainer = styled.div`
  display: flex;
`;

function TripDetailPage() {
  const history = useHistory();
  const [tripDetail, setTripDetail] = useState({});
  const { tripId } = useParams();
  const [loading, setLoading] = useState(true);
  console.log(tripId);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token === null) {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    fetchTripDetail(tripId);
  }, []);

  const goToTripListPage = () => {
    history.push("/lista-viagens");
  };

  const fetchTripDetail = (tripId) => {
    const token = window.localStorage.getItem("token");
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labeX/lourenco-mello/trip/" +
          tripId,
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((response) => {
        setTripDetail(response.data.trip);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const aproveCandidate = (candidateId) => {
    const token = window.localStorage.getItem("token");
    const body = { approve: true };
    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labeX/lourenco-mello/trips/${tripId}/candidates/${candidateId}/decide`,
        body,
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((response) => {
        alert("Aprovado com sucesso!");
        //history.push("/detalhesdaviagem/" + tripId);
        history.push("/lista-viagens");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <HeaderLogged />
      <div>{loading && <Skeleton count={5} />}</div>
      {!loading && (
        <DetailsContainer>
          <h1>Detalhes da Viagem Selecionada</h1>
          <div>
            <p>{tripDetail.name}</p>
            <p>{tripDetail.planet}</p>
            <p>{tripDetail.description}</p>
            <p>{tripDetail.durationInDays} dias</p>
            <CandidatesListContainer>
              {tripDetail.candidates &&
                tripDetail.candidates.map((candidate) => {
                  return (
                    <CandidateContainer>
                      <CandidateName>{candidate.name}</CandidateName>
                      <p>{candidate.applicationText}</p>
                      <button onClick={() => aproveCandidate(candidate.id)}>
                        Aprovar para viagem
                      </button>
                    </CandidateContainer>
                  );
                })}
            </CandidatesListContainer>

            <button onClick={goToTripListPage}>Voltar</button>
          </div>
        </DetailsContainer>
      )}
    </div>
  );
}

export default TripDetailPage;
