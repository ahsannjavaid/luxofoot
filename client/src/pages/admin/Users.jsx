import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { deleteRecords, fetchData } from "../../helper/admin";
import WideButton from "../../components/button/WideButton";
import DeleteFunctionalityTable from "../../components/table/DeleteFunctionalityTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData(setUsers, setIsLoading, 0);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {users?.length ? (
          <WideButton
            onClick={() => setShowModal(true)}
            btnColor={"danger"}
            name={"Delete All"}
          />
      ) : null}
      <DeleteFunctionalityTable
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
        req={0}
      />
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"Are you sure to delete all the Users?"}
        action={() => deleteRecords(setShowModal, setIsLoading, setUsers, 0)}
      />
    </div>
  );
}
