import React from "react";
import EntityComponent from "../../EntityComponents/EntityComponent";
import { APP_CONFIG } from "../../../env";

function TicketsList() {
  const entityType = {
    id: { label: "Id", type: "int" },
    sessionId: { label: "SessionId", type: "int" },
    userId: { label: "UserId", type: "int" },
    row: { label: "Row", type: "int" },
    place: { label: "Place", type: "int" },
    statusId: { label: "StatusId", type: "int" },
    price: { label: "Price", type: "double" },
  };

  return (
    <EntityComponent
      entityType={entityType}
      tableName={"Tickets"}
      fetchUrl={`${APP_CONFIG.API_URL}/Ticket/GetAllTickets`}
      createUrl={`${APP_CONFIG.API_URL}/Ticket/CreateTicket`}
      updateUrl={`${APP_CONFIG.API_URL}/Ticket/UpdateTicket`}
      deleteUrl={`${APP_CONFIG.API_URL}/Ticket/DeleteTicket`}
      searchUrl={`${APP_CONFIG.API_URL}/Ticket/GetTicketWithStrategy`}
    />
  );
}

export default TicketsList;
