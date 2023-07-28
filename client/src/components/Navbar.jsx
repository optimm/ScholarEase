import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Item,
  Logo,
  NavButton,
  NavContainerMain,
  NavContainerRight,
} from "../styles/components/navbarStyles";

const Navbar = () => {
  const { isAuthenticated, myData, isAdmin } = useSelector((state) => state.me);
  return (
    <NavContainerMain>
      <Logo>
        <Link to="/">ScholarEase</Link>
      </Logo>
      <Item>
        <Link to="/scholarships">All Scholarships</Link>
      </Item>

      {isAdmin && (
        <Item>
          <Link to="/users">All Users</Link>
        </Item>
      )}

      <Item>
        <Link to="/about">About</Link>
      </Item>
      <NavContainerRight>
        {isAuthenticated ? (
          <Link to={`/users/${myData._id}`}>
            <Avatar sx={{ width: 35, height: 35 }}>
              {myData?.name[0].toUpperCase()}
            </Avatar>
          </Link>
        ) : (
          <>
            <Item>
              <Link to="/login">Login</Link>
            </Item>
            <Link to="/register">
              <NavButton>Register</NavButton>
            </Link>
          </>
        )}
      </NavContainerRight>
    </NavContainerMain>
  );
};

export default Navbar;
