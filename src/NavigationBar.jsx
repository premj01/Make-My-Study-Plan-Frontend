import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import ThemeChange from "./ThemeChange";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "./contextProvider/AuthContext";
import { Avatar } from "@heroui/react";

// export const AcmeLogo = () => {
//   return (
//     <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
//       <path
//         clipRule="evenodd"
//         d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </svg>
//   );
// };

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setisLogin, isLogin } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("NA");

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(
        localStorage.getItem("username").toUpperCase().trim().substring(0, 1) +
          localStorage.getItem("username").toUpperCase().trim().slice(-1)
      );
    }
  }, []);

  let menuItems = [];
  if (isLogin) {
    menuItems = [
      { component: "Edit My Profile", path: "/profile", color: "#e2e2e2d9" },
      { component: "Dashboard", path: "/dashboard", color: "#e2e2e2d9" },
      { component: "Activity", path: "/activity", color: "#e2e2e2d9" },
      { component: "Analytics", path: "/analytics", color: "#e2e2e2d9" },
      {
        component: "Help & Feedback",
        path: "/help-feedback",
        color: "#e2e2e2d9",
      },
      { component: "Log Out", path: "/logout", color: "red" },
    ];
  } else {
    menuItems = [
      { component: "Edit My Profile", path: "/profile", color: "#e2e2e2d9" },
      { component: "Dashboard", path: "/dashboard", color: "#e2e2e2d9" },
      { component: "Activity", path: "/activity", color: "#e2e2e2d9" },
      { component: "Analytics", path: "/analytics", color: "#e2e2e2d9" },
      {
        component: "Help & Feedback",
        path: "/help-feedback",
        color: "#e2e2e2d9",
      },
      { component: "SignIn", path: "/login", color: "greenyellow" },
      { component: "SignUp", path: "/signup", color: "yellow" },
    ];
  }

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* Mobile Navigation */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit text-lg">
            <Link to="/home">MakeMyPlan</Link>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarItem>
          <ThemeChange />
        </NavbarItem>
        {isLogin && (
          <NavbarItem>
            <Link to="/profile">
              <Avatar
                isBordered
                color="purple"
                name={username}
                size="sm"
                aria-label="View profile"
              />
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <div
            className="NavbarImageBoundingBox"
            style={{ maxWeight: "34px", maxWidth: "34px", marginRight: "10px" }}
          ></div>
          <p
            className="font-bold text-inherit"
            style={{ marginRight: "30px", fontSize: "150%" }}
          >
            <Link to="/home">MakeMyPlan</Link>
          </p>
          <NavbarItem>
            <Link color="foreground" to="/home">
              Home
            </Link>
          </NavbarItem>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" to="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" to="/leaderboard">
            LeaderBoard
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Desktop Right Section */}
      {isLogin ? (
        <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem>
            <Button
              aria-label="Sign out"
              color="danger"
              variant="flat"
              onPress={() => {
                localStorage.clear();
                setisLogin(false);
              }}
            >
              Sign Out
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeChange />
          </NavbarItem>
          <NavbarItem>
            <Link to="/profile">
              <Avatar
                isBordered
                color="purple"
                name={username}
                aria-label="View profile"
              />
            </Link>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem>
            <Link to="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="warning"
              to="/signup"
              variant="flat"
              aria-label="Create new account"
            >
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeChange />
          </NavbarItem>
        </NavbarContent>
      )}

      {/* Mobile Menu */}
      <NavbarMenu
        style={{
          background: "#000000b3",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {isLogin && (
          <NavbarMenuItem className="pt-4 pb-2">
            <div className="flex items-center gap-4">
              <Avatar
                isBordered
                color="purple"
                name={username}
                size="lg"
                aria-label="Your profile picture"
              />
              <div>
                <p className="font-semibold text-foreground">
                  {localStorage.getItem("username")}
                </p>
                <p className="text-small text-foreground-500">
                  {localStorage.getItem("email")}
                </p>
              </div>
            </div>
          </NavbarMenuItem>
        )}
        <div className="mt-4">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full py-2 text-lg"
                style={{ color: item.color }}
                to={item.path}
                onClick={() => {
                  setIsMenuOpen(false);
                  if (item.component === "Log Out") {
                    localStorage.clear();
                    setisLogin(false);
                  }
                }}
              >
                {item.component}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
