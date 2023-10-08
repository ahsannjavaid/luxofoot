import React from "react";
import { generalCardContainerStyle, generalCardHeaderStyle, generalCardStyle } from "./style";

export default function GeneralCard({ header, children }) {
  return (
    <div
      style={generalCardContainerStyle}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="card shadow" style={generalCardStyle}>
        <div className="card-header text-center" style={generalCardHeaderStyle}>{header}</div>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}
