import React, { useState, useEffect } from "react";
import "./Dealers.css";
import Header from "../Header/Header";

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("All");

  const fetchDealers = async (state = "All") => {
    const url = state === "All" ? "/djangoapp/get_dealers" : `/djangoapp/get_dealers/${state}`;
    const res = await fetch(url);
    const data = await res.json();
    setDealersList(data.dealers || []);
    if (state === "All") {
      const uniqueStates = [...new Set(data.dealers.map(d => d.state))];
      setStates(["All", ...uniqueStates.sort()]);
    }
  };

  useEffect(() => { fetchDealers(); }, []);

  const filterByState = e => {
    const state = e.target.value;
    setSelectedState(state);
    fetchDealers(state);
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Dealerships</h2>
        <select onChange={filterByState} value={selectedState}>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <table className="dealers_table">
          <thead>
            <tr><th>ID</th><th>Dealer Name</th><th>City</th><th>Address</th><th>Zip</th><th>State</th></tr>
          </thead>
          <tbody>
            {dealersList.map(dealer => (
              <tr key={dealer.id}>
                <td>{dealer.id}</td>
                <td><a href={`/djangoapp/dealer/${dealer.id}`}>{dealer.full_name}</a></td>
                <td>{dealer.city}</td>
                <td>{dealer.address}</td>
                <td>{dealer.zip}</td>
                <td>{dealer.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dealers;
