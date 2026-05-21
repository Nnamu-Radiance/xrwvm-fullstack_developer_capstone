import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";

const Dealer = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/dealer/${id}`).then(r => r.json()).then(d => setDealer(d.dealer));
    fetch(`/djangoapp/reviews/dealer/${id}`).then(r => r.json()).then(d => setReviews(d.reviews || []));
  }, [id]);

  const sentimentEmoji = s => s === "positive" ? "😊" : s === "negative" ? "😞" : "😐";

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        {dealer && <h2>{dealer.full_name}</h2>}
        <a href={`/dealer/${id}/review`}>Post a Review</a>
        <h3>Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((r, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
            <strong>{r.name}</strong> {sentimentEmoji(r.sentiment)}
            <p>{r.review}</p>
            <small>{r.car_make} {r.car_model} ({r.car_year})</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dealer;
