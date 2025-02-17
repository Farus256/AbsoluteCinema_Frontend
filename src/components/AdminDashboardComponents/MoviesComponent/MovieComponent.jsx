import React from "react";
import EntityComponent from "../../EntityComponents/EntityComponent";
import { APP_CONFIG } from "../../../env";

function MovieList() {
  const entityType = {
    id: { label: "Id", type: "int" },
    title: { label: "Title", type: "string" },
    discription: { label: "Discription", type: "string" },
    score: { label: "Score", type: "double" },
    adult: { label: "Adult", type: "bool" },
    language: { label: "Language", type: "string" },
    releaseDate: { label: "ReleaseDate", type: "datetime" },
  };

  return (
    <EntityComponent
      entityType={entityType}
      tableName={"Movies"}
      fetchUrl={`${APP_CONFIG.API_URL}/Movie/GetMovieAll`}
      createUrl={`${APP_CONFIG.API_URL}/Movie/CreateMovie`}
      updateUrl={`${APP_CONFIG.API_URL}/Movie/UpdateMovie`}
      deleteUrl={`${APP_CONFIG.API_URL}/Movie/DeleteMovie`}
      searchUrl={`${APP_CONFIG.API_URL}/Movie/GetMovieWithStrategy`}
    />
  );
}

export default MovieList;
