import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../app/store";
import { Link } from "react-router-dom";

function Nav() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn, "isLoggedIn");
  const dispatch = useDispatch();
  function logoutHandler() {
    // Implement your logout logic here
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  }

  return (
    <div>
      <nav className="flex bg-slate-300 justify-between p-5">
        <div>
          <Link className="text-[1.5rem] font-bold px-5" to="/">
            TODO
          </Link>
        </div>
        <ul>
          {!isLoggedIn && (
            <li>
              {" "}
              <Link
                className=" bg-gray-100 px-5 text-[1.5rem] rounded-full py-2 text-gray-700 hover:bg-white"
                to="/user/register"
              >
                Register
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li
              className="bg-gray-100 px-5 text-[1.5rem] rounded-full py-2 text-gray-700"
              onClick={logoutHandler}
            >
              LOGOUT
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
