import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import MainTable from "../../components/table/users/MainTable";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { fetchUsers, deleteUsers } from "../../helper/admin"; // Import the functions from your new file
import { deleteAllButtonStyle } from "./style";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers(setUsers, setIsLoading);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {users?.length ? (
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-sm btn-danger w-100"
            style={deleteAllButtonStyle}
          >
            Delete All
          </button>
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
        setData={setUsers}
        setIsLoading={setIsLoading}
      />
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"Are you sure to delete all the Users?"}
        action={() => deleteUsers(setShowModal, setIsLoading, setUsers)}
      />
    </div>
  );
}
