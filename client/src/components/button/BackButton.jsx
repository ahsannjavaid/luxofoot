import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton({ onClick }) {
  const navigate = useNavigate();

  // If onClick is not passed, use default handler
  const handleClick = onClick || (() => navigate(-1));

  return (
    <button
      onClick={handleClick}
      className="btn btn-outline-dark d-flex align-items-center"
    >
      <i className="fas fa-chevron-left me-2"></i>
      <span>Go Back</span>
    </button>
  );
}

export default BackButton;
