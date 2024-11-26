const checkAccess = (requiredAccess) => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user || user.type_of_acess !== requiredAccess) {
      return false;
    }
    return true;
  };