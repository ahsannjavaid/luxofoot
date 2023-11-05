import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteSingleRecord } from "../../helper/admin";

export default function DeleteFunctionalityTable({ styles, headers, data, setData, setIsLoading, req }) {
  // req = 0 -> user | req = 1 -> admin
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
        {data?.length ? (
          data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.email}</td>
                {req ? <td>{item.post}</td> : null}
                <td>{item.securityAnswer}</td>
                <td><FontAwesomeIcon onClick={() => deleteSingleRecord(item._id, data, setData, setIsLoading, req)} className="text-danger click" icon={faTrash} /></td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td className="text-center" colSpan={headers?.length}>
              No record found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
