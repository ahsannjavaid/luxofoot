import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import { userEndpoints } from "../../api/endpoints/userEndpoints";
import { fetchResponse } from "../../api/service";
import { toast } from "react-toastify";
import { toastErrorObject } from "../../helper/utility";
import DynamicTable from "../../components/tables/DynamicTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetchResponse(userEndpoints.getUsers(), 0, null);
        const data = res.data;
        if (!res.success) {
          toast.error(res.message, toastErrorObject);
          setIsLoading(false);
          return;
        }
        console.log("Log data", data);
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout noCentering>
      <DynamicTable
        styles={"table-bordered table-light table-striped"}
        headers={["First Name", "Last Name", "Email", "Security Answer"]}
        data={users}
        dataAttributes={["fname", "lname", "email", "securityAnswer"]}
      />
    </Layout>
  );
}
