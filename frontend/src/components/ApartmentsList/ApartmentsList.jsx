// import React, { useEffect, useState } from "react";
// import axios from "axios";
import useFetch from "../../hooks/useFetch";
import "./ApartmentsList.css";
import ApartmentCard from "../ApartmentCard/ApartmentCard";


export default function ApartmentsList() {
  const {data: properties, loading, error} = useFetch("http://localhost:3000/api/properties/");  

  if(loading) return <p>Loading properties...</p>
  if(error) return <p>Error: {error}</p>
  if(!properties || properties.length === 0) return <p>No properties found.</p>

  return (
    <main className="main-content">
      <h2 className="section-title">Featured Properties</h2>
      <div className="apartments-list">
        {properties.map((property) => (
          <ApartmentCard key={property._id} id={property._id} {...property} />
        ))}
      </div>
    </main>
  );
}