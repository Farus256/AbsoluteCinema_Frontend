import React from "react";
import EntityComponent from "../../EntityComponents/EntityComponent";
import { APP_CONFIG } from "../../../env";

function ActorsComponent() {
  const entityType = {
    id: { label: "Id", type: "int" },
    firstName: { label: "First Name", type: "string" },
    lastName: { label: "Last Name", type: "string" },
  };

  return (
    <EntityComponent
      entityType={entityType}
      tableName={"Actors"}
      fetchUrl={`${APP_CONFIG.API_URL}/Actor/GetActorAll`}
      createUrl={`${APP_CONFIG.API_URL}/Actor/CreateActor`}
      updateUrl={`${APP_CONFIG.API_URL}/Actor/UpdateActor`}
      deleteUrl={`${APP_CONFIG.API_URL}/Actor/DeleteActor`}
      searchUrl={`${APP_CONFIG.API_URL}/Actor/GetActorWithStrategy`}
    />
  );
}

export default ActorsComponent;
