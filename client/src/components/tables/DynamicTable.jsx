import React from "react";

export default function DynamicTable({ styles, headers, data, dataAttributes }) {
  return (
    <table className={"table " + styles}>
      <thead>
        <tr>
          {headers?.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data?.length ?
        data.map((item, index) => {
          return (
            <tr key={index}>
              {dataAttributes.map((attribute, index) => {
                return <td key={index}>{item[attribute]}</td>;
              })}
            </tr>
          );
        })
      :
      <tr>
        <td className="text-center" colSpan={headers?.length}>No record found.</td>
      </tr>
      }
      </tbody>
    </table>
  );
}
