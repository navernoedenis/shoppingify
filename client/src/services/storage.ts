export const setUserToStorage = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromStorage = (): User | null => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const removeUserFromStorage = () => {
  localStorage.removeItem("user");
};
