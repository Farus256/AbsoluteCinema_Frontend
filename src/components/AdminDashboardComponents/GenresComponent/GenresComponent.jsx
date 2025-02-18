import React from "react";
import EntityComponent from "../../EntityComponents/EntityComponent";
import { APP_CONFIG } from "../../../env";

function GenresList() {
  const entityType = {
    id: { label: "Id", type: "int" },
    title: { label: "Title", type: "string" },
  };

  return (
    <EntityComponent
      entityType={entityType}
      tableName={"Genres"}
      fetchUrl={`${APP_CONFIG.API_URL}/Genre/GetGenreAll`}
      createUrl={`${APP_CONFIG.API_URL}/Genre/CreateGenre`}
      updateUrl={`${APP_CONFIG.API_URL}/Genre/UpdateGenre`}
      deleteUrl={`${APP_CONFIG.API_URL}/Genre/DeleteGenre`}
      searchUrl={`${APP_CONFIG.API_URL}/Genre/GetGenreWithStrategy`}
    />
  );
}

export default GenresList;
