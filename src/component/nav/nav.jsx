import React from "react";
import { Link } from "react-router-dom";

export default function Nav({tokenData}) {
  return (
    <>
      <nav className=" p-2 d-flex flex-md-row flex-column justify-content-between">
        <div className="left-nav d-flex flex-md-row flex-column m-0 px-2 align-items-center">
          <Link to="Home">
            <h1 className="m-0 pe-3">Noxe</h1>
          </Link>

          <ul className="list-unstyled d-flex align-items-center m-0">
            <li className="px-2">
              <Link to="Home">Home</Link>
            </li>
            <li className="px-2">
              <Link to="Movie">Movie</Link>
            </li>
            <li className="px-2">
              <Link to="People">People</Link>
            </li>
            <li className="px-2">
              <Link to="Tv">Tv</Link>
            </li>
          </ul>
        </div>

        <div className="left-nav d-flex flex-md-row flex-column m-0 px-2 align-items-center">
          <div className="social">
            <i className="fab mx-1 fa-facebook"></i>
            <i className="fab mx-1 fa-instagram"></i>
            <i className="fab mx-1 fa-twitter"></i>
            <i className="fab mx-1 fa-spotify"></i>
            <i className="fab mx-1 fa-youtube"></i>
          </div>

          <ul className="list-unstyled d-flex align-items-center m-0">
            {tokenData ? 
            <>
              <li className="px-2">
                <span>LogOut</span>
              </li>
              <li className="px-2">
                <Link to="Name">Hello</Link>
              </li>
            </> :
            <>
              <li className="px-2">
                <Link to="Login">Login</Link>
              </li>
              <li className="px-2">
                <Link to="Register">Register</Link>
              </li>
            </>
            }
          </ul>
        </div>
      </nav>
    </>
  );
}
