import MenuLink from "./MenuLink";
import { useLoginData } from "../auth/AuthContext";
import { useAuthActions } from "../auth/useAuthActions";
const NavBar = () => {
  const { userId } = useLoginData();
  const auth = useAuthActions();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <MenuLink to="/">Home</MenuLink>
                {userId && <MenuLink to="/account">Account</MenuLink>}
                {!userId && <MenuLink to="/register">Register</MenuLink>}
                {!userId && <MenuLink to="/login">Login</MenuLink>}
                {userId && (
                  <MenuLink onClick={() => auth.signout()} to="/login">
                    Logout
                  </MenuLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
