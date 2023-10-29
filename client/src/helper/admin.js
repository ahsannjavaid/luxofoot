import { toast } from "react-toastify";
import { userEndpoints } from "../api/endpoints/userEndpoints";
import { fetchResponse } from "../api/service";
import { toastErrorObject, toastSuccessObject } from "./toast";

export async function fetchUsers(setUsers, setIsLoading) {
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

export async function deleteSingleUser(id, users, setUsers, setIsLoading) {
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

export async function deleteUsers(setShowModal, setIsLoading, setUsers) {
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
        path: "/admins",
      },
      {
        id: 6,
        title: "Add Admin",
        isParent: false,
        path: "/add-admin",
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
        path: "/admin",
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
        path: "/products",
      },
      {
        id: 8,
        title: "Add Product",
        isParent: false,
        path: "/add-product",
      },
    ],
  },
];
