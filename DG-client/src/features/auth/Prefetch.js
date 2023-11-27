import { useEffect } from "react";
import { store } from "./../../app/store";
import { notesApiSlice } from "./../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    return () => {
      users.unsubscribe();
      notes.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default Prefetch;
