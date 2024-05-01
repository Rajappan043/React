import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClaimRequest from "./pages/Claim/claimRequest/ClaimRequest";
import Members from "./pages/Member/Members";
import AddMember from "./pages/Member/addmember/AddMember";
import UserDetails from "./pages/Member/showmember";
import ProcessClaim from "./pages/Claim/ProcessClaim";
import Claims from "./pages/Claim/viewClaims/Claims";
import AllClaims from "./pages/Claim/viewClaims/allClaims";
import Claim from "./pages/Claim/viewClaims/viewclaim";
import SideNav from "./components/SideNav/SideNav";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Logout from "./pages/Login/logout";
import AgentSideNav from "./components/agentSideNav/SideNav";
import UserSideNav from "./components/userSideNav/UserSidenav";
import UserProfile from "./pages/profile/profile";
import Register from "./pages/register/register";
import PrivateRoutes from "./routes/PrivateRoutes";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<SideNav />}>
            <Route path="addMember" element={<AddMember />} />
            <Route path="show" element={<UserDetails />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="claims" element={<Claims />} />
          </Route>
          <Route path="/patient" element={<UserSideNav />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="newRequest" element={<ClaimRequest />} />
            <Route path="claim" element={<Claim />} />
          </Route>
          <Route path="/agent" element={<AgentSideNav />}>
            <Route path="process" element={<ProcessClaim />} />
            <Route path="allClaim" element={<AllClaims />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
