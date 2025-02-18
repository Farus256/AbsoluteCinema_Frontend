import React from "react";
import EntityComponent from "../../EntityComponents/EntityComponent";
import { APP_CONFIG } from "../../../env";

function UsersList() {
  const entityType = {
    id: { label: "Id", type: "int" },
    firstName: { label: "First Name", type: "string" },
    lastName: { label: "Last Name", type: "string" },
    birthDate: { label: "Birth Date", type: "datetime" },
  };
  return (
    <EntityComponent
      entityType={entityType}
      tableName={"Users"}
      fetchUrl={`${APP_CONFIG.API_URL}/User/GetAllUsers`}
      createUrl={`${APP_CONFIG.API_URL}/User/CreateUser`}
      updateUrl={`${APP_CONFIG.API_URL}/User/UpdateUser`}
      deleteUrl={`${APP_CONFIG.API_URL}/User/DeleteUser`}
      searchUrl={`${APP_CONFIG.API_URL}/User/GetUserWithStrategy`}
    />
  );
}

export default UsersList;
