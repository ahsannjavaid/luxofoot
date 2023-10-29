import React from "react";
import { style } from "./style";

export default function LoadingSpinner() {
  return (
    <div style={style}>
      <div className="spinner-grow text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
