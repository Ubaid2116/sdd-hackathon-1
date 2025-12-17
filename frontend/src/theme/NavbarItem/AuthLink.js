import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../../components/AuthModal";
import NavbarItem from "@theme/NavbarItem";

function AuthLink({ authType }) {
  const { isLoggedIn, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAuthClick = () => {
    setIsModalOpen(true);
  };

  const buttonText = authType === "login" ? "Login" : "Sign Up";

  return (
    <>
      {isLoggedIn ? (
        <NavbarItem
          label="Logout"
          onClick={logout}
          position="right"
          className="navbar-auth-link"
        />
      ) : (
        <NavbarItem
          label={buttonText}
          onClick={handleAuthClick}
          position="right"
          className="navbar-auth-link"
        />
      )}

      <AuthModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        initialLoginState={authType === "login"}
      />
    </>
  );
}

export default AuthLink;
