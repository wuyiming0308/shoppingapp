const url = "http://localhost:3002";

const loginRequest = async ({ password, email }) => {
  try {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

const registerRequest = async ({ password, email }) => {
  const response = await fetch(`${url}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  });
  const data = await response.json();
  return data;
};

export { loginRequest, registerRequest };
