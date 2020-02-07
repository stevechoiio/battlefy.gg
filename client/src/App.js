import React, { useState } from "react";
import "./App.css";
import SignIn from "./Components/signin";
import MatchCard from "./Components/MatchCard";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER;
function App() {
  const [count, setCount] = useState();
  const [error, setError] = useState(false);
  const fetchData = summonerName => {
    axios
      .get(`${SERVER_URL}${summonerName}`)
      .then(res => {
        if (res.data.statusCode === 404) throw new Error();
        setCount(res.data);
        // setCount(JSON.stringify(res));
      })
      .catch(e => {
        setError(true);
        console.log("e");
      });
  };
  return (
    <div className="App">
      <h1>Search by your Summoner's name</h1>
      <SignIn setData={fetchData} />
      {count && count.map(a => <MatchCard data={a} />)}
      {error && <h5>Something went wrong. Please try again</h5>}
    </div>
  );
}

export default App;
