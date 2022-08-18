const SignoutButton = ({ handleSignout = () => {} }) => {
  const handleOnClick = () => {
    handleSignout();
  };
  return (
    <button className="CustomerSigninButton" onClick={handleOnClick}>
      Sign Out
    </button>
  );
};

export default SignoutButton;
