const url = "http://localhost:3002";

const signInRequest = async ({ password, email }) => {
  try {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });
    alert(password);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(`error occurs when making sigin request`, e);
  }
};

const signUpRequest = async ({ password, email }) => {
  try {
    const response = await fetch(`${url}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });
    alert(password);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(`error occurs when making sigin request`, e);
  }
};

export { signInRequest, signUpRequest };
