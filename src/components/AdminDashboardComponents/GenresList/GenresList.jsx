import React from "react";
import EntityComponent from "../../EntityComponents/EntityComponent";
import { APP_CONFIG } from "../../../env";

function GenresList() {
  const entityType = {
    id: { label: "Id", type: "int" },
    title: { label: "Title", type: "string" },
  };

  const entityData = [
    { id: 1, name: "Fantasy" },
    { id: 2, name: "Romantic" },
    { id: 3, name: "Gypo" },
    { id: 4, name: "Dypo" },
  ];

  return (
    <EntityComponent
      entityType={entityType}
      entityData={entityData}
      tableName={"Genres"}
      fetchUrl={`${APP_CONFIG.API_URL}/Genre/GetGenreAll`}
      createUrl={`${APP_CONFIG.API_URL}/Genre/CreateGenre`}
      updateUrl={`${APP_CONFIG.API_URL}/Genre/UpdateGenre`}
      deleteUrl={`${APP_CONFIG.API_URL}/Genre/DeleteGenre`}
    />
  );
}

export default GenresList;
