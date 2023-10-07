import React from "react";
import { style } from "./style";
import Layout from "../Layout";

export default function LoadingSpinner() {
  return (
    <Layout>
      <div style={style}>
        <div className="spinner-grow text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Layout>
  );
}
