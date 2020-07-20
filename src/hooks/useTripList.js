import { useState, useEffect } from "react";
import axios from "axios";

// Esse hook utiliza a API para buscar a lista de viagens do banco de dados e seta o estado de tripList conforme o banco de dados

const useTripList = (initialValue) => {
  const baseURL =
    "https://us-central1-labenu-apis.cloudfunctions.net/labeX/lourenco-mello/trips";

  const [tripList, setTripList] = useState("");
  
  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setTripList(response.data.trips);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return tripList;
};

export default useTripList;
