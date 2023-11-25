import { useEffect } from "react";
import { store } from "./../../app/store";
import { notesApiSlice } from "./../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    return () => {
      console.log("unsubscribing");
      users.unsubscribe();
      notes.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default Prefetch;
