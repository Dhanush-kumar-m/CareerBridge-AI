const TOKEN_KEY =
  "careerbridge_token";

const USER_KEY =
  "careerbridge_user";

/* Token */

export const saveToken = (
  token
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      TOKEN_KEY,
      token
    );
  }
};

export const getToken = () => {
  if (typeof window === "undefined")
    return null;

  return localStorage.getItem(
    TOKEN_KEY
  );
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(
      TOKEN_KEY
    );
  }
};

/* User */

export const saveUser = (
  user
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );
  }
};

export const getUser = () => {
  if (typeof window === "undefined")
    return null;

  const user =
    localStorage.getItem(
      USER_KEY
    );

  return user
    ? JSON.parse(user)
    : null;
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(
      USER_KEY
    );
  }
};

/* Logout */

export const logout = () => {
  removeToken();
  removeUser();
};

/* Auth Status */

export const isAuthenticated =
  () => {
    return !!getToken();
  };

/* Clear All App Data */

export const clearStorage =
  () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  };