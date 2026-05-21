import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";

const PostReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    fetch("/djangoapp/get_cars").then(r => r.json()).then(d => setCarModels(d.CarModels || []));
  }, []);

  const submit = async () => {
    const data = {
      name: document.cookie.split("username=")[1] || "Anonymous",
      dealership: id,
      review,
      purchase: true,
      car_make: carMake,
      car_model: carModel,
      car_year: carYear,
      purchase_date: new Date().toISOString().split("T")[0],
    };
    await fetch("/djangoapp/add_review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    window.location.href = `/djangoapp/dealer/${id}`;
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Post a Review</h2>
        <textarea rows="4" placeholder="Your review..." value={review} onChange={e => setReview(e.target.value)} style={{ width: "100%", marginBottom: "10px" }} />
        <input placeholder="Car Make" value={carMake} onChange={e => setCarMake(e.target.value)} style={{ marginBottom: "10px", display: "block" }} />
        <input placeholder="Car Model" value={carModel} onChange={e => setCarModel(e.target.value)} style={{ marginBottom: "10px", display: "block" }} />
        <input placeholder="Car Year" value={carYear} onChange={e => setCarYear(e.target.value)} style={{ marginBottom: "10px", display: "block" }} />
        <button onClick={submit}>Submit Review</button>
      </div>
    </div>
  );
};

export default PostReview;
