import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USER_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const content = (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to={"/dash/notes"}>
          <h1 className="dash-header__title">tech Notes</h1>
        </Link>
        <nav className="dash-header__nav">{/* add nav buttons later */}</nav>
      </div>
    </header>
  );
  return;
};

export default DashHeader;
