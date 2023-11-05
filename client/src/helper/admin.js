import { toast } from "react-toastify";
import { userEndpoints } from "../api/endpoints/userEndpoints";
import { fetchResponse } from "../api/service";
import { toastErrorObject, toastSuccessObject } from "./toast";
import { adminEndpoints } from "../api/endpoints/adminEndpoints";

export async function fetchData(setData, setIsLoading, req) {
  try {
    let res;
    if (req) res = await fetchResponse(adminEndpoints.getAdmins(), 0, null);
    else res = await fetchResponse(userEndpoints.getUsers(), 0, null);
    const resData = res.data;
    if (!res.success) {
      toast.error(res.message, toastErrorObject);
      setIsLoading(false);
      return;
    }
    console.log("Log data", resData);
    setData(resData);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
}

export async function deleteSingleRecord(id, data, setData, setIsLoading, req) {
  setIsLoading(true);
  let res;
  try {
    if (req) res = await fetchResponse(
      adminEndpoints.deleteSingleAdmin(id),
      3,
      null
    );
    else res = await fetchResponse(
      userEndpoints.deleteSingleUser(id),
      3,
      null
    );
    const resData = res.data;
    if (!res.success) {
      toast.error(res.message, toastErrorObject);
      setIsLoading(false);
      return;
    }
    console.log("Log data", resData);
    setData(data.filter((item) => item._id !== id));
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
}

export async function deleteRecords(setShowModal, setIsLoading, setData, req) {
  setShowModal(false);
  setIsLoading(true);
  let res;
  try {
    if (req) res = await fetchResponse(adminEndpoints.deleteAdmins(), 3, null);
    else res = await fetchResponse(userEndpoints.deleteUsers(), 3, null);
    const resData = res.data;
    if (!res.success) {
      toast.error(res.message, toastErrorObject);
      setIsLoading(false);
      return;
    }
    console.log("Log data", resData);
    toast.success(res.message, toastSuccessObject);
    setData([]);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
}

export const adminSidebarList = [
  {
    id: 4,
    title: "Admin",
    isParent: true,
    path: "",
    child: [
      {
        id: 5,
        title: "Show Admins",
        isParent: false,
        path: "admins",
      },
      {
        id: 6,
        title: "Add Admin",
        isParent: false,
        path: "add-admin",
      },
    ],
  },
  {
    id: 1,
    title: "Users",
    isParent: true,
    path: "",
    child: [
      {
        id: 3,
        title: "Show Users",
        isParent: false,
        path: "users",
      },
    ],
  },
  {
    id: 2,
    title: "Products",
    isParent: true,
    path: "",
    child: [
      {
        id: 7,
        title: "Show Products",
        isParent: false,
        path: "products",
      },
      {
        id: 8,
        title: "Add Product",
        isParent: false,
        path: "add-product",
      },
    ],
  },
];
