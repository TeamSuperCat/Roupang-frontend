import React from "react";
import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
}

function Portal({ children }: Props) {
  const portal = document.querySelector("#portal");
  if (!portal) return;

  return ReactDOM.createPortal(children, portal);
}

export default Portal;
