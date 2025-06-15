import React from "react";
import { style } from "./style";
import Layout from "../Layout";

export default function LoadingSpinner({ withLayout = true }) {
  const content = (
    <div style={style}>
      <div className="spinner-grow text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  return <>{withLayout ? <Layout>{content}</Layout> : { content }}</>;
}
