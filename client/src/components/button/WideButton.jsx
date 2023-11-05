import React from "react";
import { wideButtonStyle } from "./style";

export default function WideButton({ onClick, btnColor, name }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-sm btn-${btnColor} w-100`}
      style={wideButtonStyle}
    >
      {name}
    </button>
  );
}
