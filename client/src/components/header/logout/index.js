import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/auth";
const SignoutButton = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(logout());
  };

  return (
    <button className="CustomerSigninButton" onClick={handleOnClick}>
      Sign Out
    </button>
  );
};

export default SignoutButton;
