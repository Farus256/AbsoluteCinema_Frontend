import React from "react";
import EntityComponent from "../../EntityComponents/EntityComponent";

function GenresList() {
  const entityType = {
    id: "Id",
    name: "Name"
  };

  const entityData = [
    { id: 1, name: "Fantasy"},
    { id: 2, name: "Romantic"},
    { id: 3, name: "Gypo"},
    { id: 4, name: "Dypo"},
  ]

  return <EntityComponent entityType={entityType} entityData={entityData} tableName={"Genres"}/>;
}

export default GenresList;
