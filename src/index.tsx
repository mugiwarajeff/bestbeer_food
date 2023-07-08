import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouterContainer from "routes";
import "normalize.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterContainer />
  </React.StrictMode>
);


