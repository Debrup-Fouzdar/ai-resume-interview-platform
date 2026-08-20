import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";

const Navbar = () => {

  const navigate = useNavigate();

  const {
    user,
    handleLogout
  } = useAuth();


  const logout = async () => {

    try {

      await handleLogout();

      navigate("/login");

    } catch (err) {

      console.error(err);

    }

  };


  return (
    <nav className="navbar">

      <div className="navbar-logo">

        <Link to="/">
          AI Interview Prep
        </Link>

      </div>


      <div className="navbar-actions">

        {user && (
          <>

            <Link to="/">
              Dashboard
            </Link>


            <button
              onClick={logout}
              className="navbar-logout"
            >
              Logout
            </button>

          </>
        )}

      </div>


    </nav>
  );
};


export default Navbar;