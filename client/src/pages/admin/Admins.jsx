import React, { useEffect, useState } from 'react'
import ConfirmationModal from '../../components/modal/ConfirmationModal';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';
import { deleteRecords, fetchData } from '../../helper/admin';
import WideButton from '../../components/button/WideButton';
import DeleteFunctionalityTable from '../../components/table/DeleteFunctionalityTable';

export default function Admins() {
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      fetchData(setAdmins, setIsLoading, 1);
    }, []);
  
    if (isLoading) {
      return <LoadingSpinner />;
    }
  
    return (
      <div>
        {admins?.length ? (
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
            "Post",
            "Security Answer",
            "Delete",
          ]}
          data={admins}
          setData={setAdmins}
          setIsLoading={setIsLoading}
          req={1}
        />
        <ConfirmationModal
          showModal={showModal}
          setShowModal={setShowModal}
          message={"Are you sure to delete all the Admins?"}
          action={() => deleteRecords(setShowModal, setIsLoading, setAdmins, 1)}
        />
      </div>
    );
}
