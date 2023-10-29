import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import { userEndpoints } from "../../api/endpoints/userEndpoints";
import { fetchResponse } from "../../api/service";
import { toast } from "react-toastify";
import { toastErrorObject, toastSuccessObject } from "../../helper/toast";
import MainTable from "../../components/tables/users/MainTable";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  async function deleteSingleUser(id) {
    setIsLoading(true);
    try {
      const res = await fetchResponse(
        userEndpoints.deleteSingleUser(id),
        3,
        null
      );
      const data = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      console.log("Log data", data);
      setUsers(users.filter((user) => user._id !== id));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  async function deleteUsers() {
    setShowModal(false);
    setIsLoading(true);
    try {
      const res = await fetchResponse(userEndpoints.deleteUsers(), 3, null);
      const data = res.data;
      if (!res.success) {
        toast.error(res.message, toastErrorObject);
        setIsLoading(false);
        return;
      }
      console.log("Log data", data);
      toast.success(res.message, toastSuccessObject);
      setUsers([]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout noCentering>
      {users?.length ? (
        <div className="text-end mb-2">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-sm btn-danger"
          >
            Delete All
          </button>
        </div>
      ) : null}
      <MainTable
        styles={"table-sm table-bordered table-striped text-center"}
        headers={[
          "First Name",
          "Last Name",
          "Email",
          "Security Answer",
          "Delete",
        ]}
        data={users}
        deleteSingleUser={deleteSingleUser}
      />
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"Are you sure to delete all the Users?"}
        action={deleteUsers}
      />
    </Layout>
  );
}
