import React from "react";
import { generalCardHeaderStyle, generalCardStyle } from "./style";

export default function GeneralCard({ header, children }) {
  return (
      <div className="card shadow" style={generalCardStyle}>
        <div className="card-header text-center" style={generalCardHeaderStyle}>{header}</div>
        <div className="card-body">{children}</div>
      </div>
  );
}
