import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostReview.css";

const PostReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [purchaseCheck, setPurchaseCheck] = useState(false);
  const [carMakeModel, setCarMakeModel] = useState("");

  const postaReview = async () => {
    const name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    const reviewObj = {
      name,
      dealership: id,
      review,
      purchase: purchaseCheck,
      purchase_date: new Date().toISOString().split("T")[0],
      car_make: carMakeModel,
      car_model: model,
      car_year: year,
    };
    try {
      const res = await fetch("/djangoapp/add_review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewObj),
      });
      const json = await res.json();
      if (json.status === 200) navigate("/dealer/" + id);
    } catch (e) {
      console.error("Error posting review:", e);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Post a Review for Dealer #{id}</h1>
      <textarea
        rows={5}
        cols={60}
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <br />
      <input placeholder="Car Make/Brand" value={carMakeModel} onChange={(e) => setCarMakeModel(e.target.value)} />
      <input placeholder="Car Model" value={model} onChange={(e) => setModel(e.target.value)} />
      <input placeholder="Car Year" value={year} onChange={(e) => setYear(e.target.value)} />
      <br />
      <label>
        <input type="checkbox" checked={purchaseCheck} onChange={(e) => setPurchaseCheck(e.target.checked)} />
        {" "}I purchased a car here
      </label>
      <br /><br />
      <button onClick={postaReview}>Submit Review</button>
    </div>
  );
};

export default PostReview;
