import React, { useEffect} from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from '../hooks/useUser';

export default function Navbar() {
  const { user, isLoggedIn } = useAuth();
  const getUser = useUser()

  useEffect(() => {
    getUser();
}, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{justifyContent: "space-between"}}>
          <div style={{height: "40px"}}>
            <NavLink className={'nav-link'} to={'/'} style={{height: "100%", display: "flex", columnGap: "10px", alignItems: "center"}}>
              <img alt='logo' style={{height: "100%"}} src='logo.png' />
            </NavLink>
          </div>
          <ul className='navbar-nav mb-2 mb-lg-0'>
            {isLoggedIn ? (
              <li className='nav-item'><NavLink className={'nav-link'} to={'/auth/user'}>{user.email}</NavLink></li>
            ) : (
              <>
                <li className='nav-item'><NavLink className={'nav-link'} to={'/auth/login'}>Login</NavLink></li>
                <li className='nav-item'><NavLink className={'nav-link'} to={'/auth/register'}>Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
