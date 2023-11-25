import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import PrivateRoute from "./services/PrivateRoute";
import SignupUserPage from "./pages/authentication/SignupUserPage";
import VerificationPage from "./pages/authentication/VerificationPage";
import SignupPasswordPage from "./pages/authentication/SignupPasswordPage";
import Homepage from "./pages/dashboard/Homepage";
import ViewUsersPage from "./pages/dashboard/users/ViewUsersPage";
import ViewInvitesPage from "./pages/dashboard/users/ViewInvitesPage";
import ViewOrganizationsPage from "./pages/dashboard/organizations/ViewOrganizationsPage";
import CreateOrganizationPage from "./pages/dashboard/organizations/CreateOrganizationPage";
import ViewSchemasPage from "./pages/dashboard/schemas/ViewSchemasPage";
import CreateSchemaPage from "./pages/dashboard/schemas/CreateSchemaPage";
import SingleOrganizationPage from "./pages/dashboard/organizations/SingleOrganizationPage";
import SingleSchemaPage from "./pages/dashboard/schemas/SingleSchemaPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/verify-email-success" element={<VerificationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupUserPage />} />
          <Route path="/test" element={<SignupPasswordPage />} />
          {/* <Route path="/test" element={<VerificationPage />} /> */}
          <Route
            path="/signup/password"
            element={
              localStorage.getItem("isAllowed") ? (
                <SignupPasswordPage />
              ) : (
                <Navigate to="/signup" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/overview" />}
          />
          <Route
            path="/dashboard/overview"
            element={<PrivateRoute element={Homepage} />}
          />
          <Route
            path="/dashboard/view-users"
            element={<PrivateRoute element={ViewUsersPage} />}
          />
          <Route
            path="/dashboard/view-invites"
            element={<PrivateRoute element={ViewInvitesPage} />}
          />
          <Route
            path="/dashboard/view-organizations"
            element={<PrivateRoute element={ViewOrganizationsPage} />}
          />
          <Route
            path="/dashboard/new-organization"
            element={<PrivateRoute element={CreateOrganizationPage} />}
          />
          <Route
            path="/dashboard/organization/:orgId"
            element={<SingleOrganizationPage />}
          />
          <Route
            path="/dashboard/view-schemas"
            element={<PrivateRoute element={ViewSchemasPage} />}
          />
          <Route
            path="/dashboard/new-schema"
            element={<PrivateRoute element={CreateSchemaPage} />}
          />
          <Route
            path="/dashboard/schema/:schemaName"
            element={<SingleSchemaPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
