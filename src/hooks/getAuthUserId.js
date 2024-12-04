export const getAuthUserId = () => {
  const storedData = localStorage.getItem("token");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return parsedData.userId;
  }
  return null;
};
