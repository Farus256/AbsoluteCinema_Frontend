import React from "react";
import EntityComponent from "../../EntityComponents/EntityComponent";
import { APP_CONFIG } from "../../../env";

function HallsList() {
  const entityType = {
    id: { label: "Id", type: "int" },
    name: { label: "Name", type: "string" },
    placeCount: { label: "Place Count", type: "int" },
    rowCount: { label: "Row Count", type: "int" },
  };
  return (
    <EntityComponent
      entityType={entityType}
      tableName={"Halls"}
      fetchUrl={`${APP_CONFIG.API_URL}/Hall/GetHallAll`}
      createUrl={`${APP_CONFIG.API_URL}/Hall/CreateHall`}
      updateUrl={`${APP_CONFIG.API_URL}/Hall/UpdateHall`}
      deleteUrl={`${APP_CONFIG.API_URL}/Hall/DeleteHall`}
      searchUrl={`${APP_CONFIG.API_URL}/Hall/GetHallWithStrategy`}
    />
  );
}

export default HallsList;
