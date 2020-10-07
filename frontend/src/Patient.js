import React, { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

const Patient = ({ id, name, gender, birthDate, lastUpdate, MRN, SSN }) => {
  const [encounter, setEncounter] = useState("");
  const [observation, setObservation] = useState("");

  const searchEncounter = (id) => {
    fetch(`api/encounter?id=${id}`, {
      accept: "application/json",
    })
      .then((response) => response.json())
      .then((encounters) => {
        setEncounter(encounters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchObservation = (id) => {
    fetch(`api/observation?id=${id}`, {
      accept: "application/json",
    })
      .then((response) => response.json())
      .then((observations) => {
        setObservation(observations);
        console.log(observations);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  searchObservation(id);
  searchEncounter(id);

  return (
    <div className="patient">
      <ul>
        <li onClick={() => searchObservation(id)}>ID: {id}</li>
        <li
          onClick={() => {
            searchEncounter(id);
          }}
        >
          Name: {name}
        </li>
        <li>Gender: {gender}</li>
        <li>Birthdate: {birthDate}</li>
        <li>Last Update : {lastUpdate}</li>
        <li>MRN : {MRN}</li>
        <li>US-SSN : {SSN} </li>
      </ul>
      {encounter ? (
        <div>
          <h1>Encounters</h1>
          {encounter.map((item) => {
            return (
              <ul key={item.id}>
                <li>Id : {item.id}</li>
                <li>Class : {item.class}</li>
                <li>Start: {item.start}</li>
                <li>End : {item.end}</li>
                <li>Type : {item.type}</li>
                <li>service : {item.service}</li>
              </ul>
            );
          })}
        </div>
      ) : (
        ""
      )}
      {observation ? (
        <div>
          <h1>Observations</h1>
          {observation.map((item) => {
            return (
              <ul key={item.id}>
                <li>Id : {item.id}</li>
                <li>Code : {item.code}</li>
                <li>Date : {item.date}</li>
                {item.value ? (
                  <li key={item.value.value}>
                    {" "}
                    Value : {item.value.value} {item.value.unit}
                  </li>
                ) : (
                  ""
                )}{" "}
                {item.component
                  ? item.component.map((it) => (
                      <li key={it.valueQuantity.value}>
                        {it.code.text} : {it.valueQuantity.value}
                        {it.valueQuantity.unit}
                      </li>
                    ))
                  : ""}
              </ul>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

Patient.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  birthDate: PropTypes.string,
  lastUpdate: PropTypes.string,
  MRN: PropTypes.string,
  SSN: PropTypes.string,
};

export default Patient;
