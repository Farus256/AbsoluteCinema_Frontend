import React from "react";
import EntityComponent from "../../EntityComponents/EntityComponent";
import { APP_CONFIG } from "../../../env";

function SessionsList() {
  const entityType = {
    id: {label: "Id", type: "int"},
    movieId: {label: "MovieId", type: "int"},
    date: {label: "Date", type: "datetime"},
    hallId: {label: "HallId", type: "int"},
  }
  return (
    <EntityComponent
      entityType={entityType}
      tableName={"Sessions"}
      fetchUrl={`${APP_CONFIG.API_URL}/Session/GetAllSessions`}
      createUrl={`${APP_CONFIG.API_URL}/Session/CreateSession`}
      updateUrl={`${APP_CONFIG.API_URL}/Session/UpdateSession`}
      deleteUrl={`${APP_CONFIG.API_URL}/Session/DeleteSession`}
      searchUrl={`${APP_CONFIG.API_URL}/Session/GetSessionWithStrategy`}
    />
  );
}

export default SessionsList;
