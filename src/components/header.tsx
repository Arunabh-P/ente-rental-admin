import { LiaPowerOffSolid } from "react-icons/lia";
import logo from "../assets/logo/ente-rental.png";
import { useLogoutAdminMutation } from "../services/authApi";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Header = () => {
  const admin = useSelector((state: RootState) => state.auth.admin);
  const [logoutAdmin] = useLogoutAdminMutation();

  const handleLogout = async () => {
    await logoutAdmin();
  };
  return (
    <div className="bg-white z-50 w-full flex justify-between items-center py-5 shadow-md px-5 md:px-12 lg:px-16 2xl:px-[96px] sticky top-0">
      <img src={logo} alt="logo" className="w-[160px] md:w-[200px]" />
      {admin && (
        <LiaPowerOffSolid
          onClick={handleLogout}
          className="text-[30px] font-extrabold cursor-pointer"
        />
      )}
    </div>
  );
};

export default Header;
