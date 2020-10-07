const express = require("express");
const fhirKitClient = require("fhir-kit-client");

const config = { baseUrl: "https://r4.smarthealthit.org/" };
const client = new fhirKitClient(config);

const app = express();

app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

app.get("/api/patient", (req, res) => {
  if (req.query.name) {
    client
      .search({
        resourceType: "Patient",
        searchParams: { name: req.query.name },
      })
      .then((response) => {
        const patients = response.entry
          ? response.entry.map((obj) => {
              return {
                id: obj.resource.id,
                name: `${obj.resource.name[0].given} ${obj.resource.name[0].family}`,
                gender: obj.resource.gender,
                birthDate: obj.resource.birthDate,
                lastUpdate: obj.resource.meta.lastUpdated,
                MRN: obj.resource.identifier[1].value,
                SSN: obj.resource.identifier[2].value,
                rest: obj.resource,
              };
            })
          : [];

        res.status(200).json(patients);
      });
  } else {
    res.status(200).json({ patients: [] });
  }
});

app.get("/api/encounter", (req, res) => {
  if (req.query.id) {
    const searchParameters = `Patient/${req.query.id}`;
    client
      .search({
        resourceType: "Encounter",
        searchParams: { subject: searchParameters },
      })
      .then((response) => {
        const encounter = response.entry
          ? response.entry.map((obj) => {
              return {
                id: obj.resource.id,
                class: obj.resource.class.code,
                lastUpdate: obj.resource.meta.lastUpdated,
                start: obj.resource.period.start,
                end: obj.resource.period.end,
                service: obj.resource.serviceProvider.reference,
                type: obj.resource.type[0].text,
                obj: obj,
              };
            })
          : [];

        res.status(200).json(encounter);
      })
      .catch((err) => console.log(err));
  } else {
    res.status(200).json({ encounter: [] });
  }
});

app.get("/api/observation", (req, res) => {
  if (req.query.id) {
    const searchParameters = `Patient/${req.query.id}`;
    client
      .search({
        resourceType: "Observation",
        searchParams: { subject: searchParameters },
      })
      .then((response) => {
        const observation = response.entry
          ? response.entry.map((obj) => {
              return {
                id: obj.resource.id,
                code: obj.resource.code.text,
                date: obj.resource.effectiveDateTime,
                value: obj.resource.valueQuantity,
                component: obj.resource.component,
                valueCodeableConcept: obj.resource.valueCodeableConcept,
                obj: obj,
              };
            })
          : [];

        res.status(200).json(observation);
      })
      .catch((err) => console.log(err));
  } else {
    res.status(200).json({ observation: [] });
  }
});

app.listen(app.get("port"), () => {
  console.log("Express server started");
});
