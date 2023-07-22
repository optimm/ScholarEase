import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCheckMyAuthQuery } from "./app/services/userApi";
import Footer from "./components/Footer";
import { FullScreenLoader } from "./components/Loaders";
import Navbar from "./components/Navbar";
import { Notification } from "./components/Notification";
import About from "./pages/About";
import AllProjects from "./pages/AllProjects";
import AllUsers from "./pages/AllUsers";
import { CreateProject } from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import Feed from "./pages/Feed";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Project from "./pages/Project";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.me);
  const { data, isLoading, error, isFetching } = useCheckMyAuthQuery();
  const [blankLoader, setBlankLoader] = useState(true);
  const [errState, setErrState] = useState(false);
  useEffect(() => {
    let success = data?.success;
    let notSuccess = error?.data?.success;
    if (isFetching) {
      setBlankLoader(true);
    } else if (!isFetching && (success === true || notSuccess === false)) {
      if (error?.data?.success === false) setErrState(false);
      else setErrState(true);
      setTimeout(() => {
        setBlankLoader(false);
      }, 2000);
    }
  }, [isFetching, data, error]);
  return (
    <>
      {isLoading || isFetching || blankLoader ? (
        <>
          <img
            src="/images/landing.jpg"
            style={{ display: "none" }}
            alt={"skeleton"}
          />
          <img
            src="/images/login.jpg"
            style={{ display: "none" }}
            alt={"skeleton"}
          />
          <img
            src="/images/register.jpg"
            style={{ display: "none" }}
            alt={"skeleton"}
          />
          <FullScreenLoader />
        </>
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }
              />
              <Route
                path="/feed"
                element={
                  <>
                    <Navbar />
                    <Feed />
                    <Footer />
                  </>
                }
              />
              <Route
                path={"/login"}
                element={
                  errState || isAuthenticated ? (
                    <Navigate replace to="/" />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path={"/forgot-password"}
                element={
                  errState || isAuthenticated ? (
                    <Navigate replace to="/" />
                  ) : (
                    <ForgotPassword />
                  )
                }
              />
              <Route
                path={"/reset-password"}
                element={
                  errState || isAuthenticated ? (
                    <Navigate replace to="/" />
                  ) : (
                    <ResetPassword />
                  )
                }
              />
              <Route path={"/register"} element={<Register />} />
              <Route
                path="/users"
                element={
                  <>
                    <Navbar />
                    <AllUsers />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <>
                    <Navbar />
                    <Profile />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/projects"
                element={
                  <>
                    <Navbar />
                    <AllProjects />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <>
                    <Navbar />
                    <Project />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/projects/:id/edit"
                element={
                  <>
                    <Navbar />
                    <EditProject />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/projects/add"
                element={
                  errState || isAuthenticated ? (
                    <>
                      <Navbar />
                      <CreateProject />
                      <Footer />
                    </>
                  ) : (
                    <Navigate replace to="/login" />
                  )
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Navbar />
                    <About />
                    <Footer />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
          <Notification />
        </>
      )}
    </>
  );
};

export default App;
