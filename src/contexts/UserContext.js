import { createContext, useState, useEffect } from "react";
export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [favoriteProgram, setFavoriteProgram] = useState([]);
  const [loginState, setLoginState ] = useState(false);

  useEffect(() => {
    whoami();
     //eslint-disable-next-line
  }, []);

  useEffect(() => {}, [user]);

  const whoami = async () => {
    const response = await fetch("/api/v1/user/whoami", {
      method: "GET",
    });

    const data = await response.json();
    if (data) {
      setUser(data);
    }
  };

  const login = async (user) => {
    const response = await fetch("/api/v1/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      whoami();
      return true;
    }
  };

  const register = async (user) => {
    let result = await fetch("/api/v1/user/register", {
      method: "POST",
      headers: { "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    result = await result.json();
    return result;
  };

  const logout = async () => {
    await fetch("/api/v1/user/logout", {
      method: "GET",
    });
    setUser(null);
    setLoginState(false);
  };

  const addChannelToFavorite = async (newFav) => {
    if (favorite.some((f) => f.id === newFav.id)) {
      setFavorite(favorite.filter((f) => f.id !== newFav.id));
      await fetch("/api/v1/user/deleteFavorite/" + newFav.id, {
        method: "DELETE",
      });
      return;
    } else setFavorite([...favorite, newFav]);

    let result = await fetch("/api/v1/user/addChannelToFavorite", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFav),
    });
    result = result.json();

    return result;
  };

  const addProgramToFavorite = async (newFavProgram) => {
    if (favoriteProgram.some((a) => a.id === newFavProgram.id)) {
      setFavoriteProgram(
        favoriteProgram.filter((a) => a.id !== newFavProgram.id)
      );
      await fetch("/api/v1/user/deleteFavoriteProgram/" + newFavProgram.id, {
        method: "DELETE",
      });
      return;

    } else setFavoriteProgram([...favoriteProgram, newFavProgram]);

    let result = await fetch("/api/v1/user/addProgramToFavorite", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFavProgram),
    });
    result = result.json();
    return result;
  };

  const deleteFavorite = async (channelId) => {
    let result = await fetch("/api/v1/user/deleteFavorite/" + channelId.id, {
      method: "DELETE",
    });
      result = result.json();
   return result;
  };
  const deleteFavoriteProgram = async (programId) => {
    let result = await fetch("/api/v1/user/deleteFavoriteProgram/" + programId.id, {
      method: "DELETE",
    });
      result = result.json();
   return result;
  };
  
  const values = {
    whoami,
    user,
    login,
    logout,
    register,
    favorite,
    addChannelToFavorite,
    addProgramToFavorite,
    loginState,
    setLoginState,
    deleteFavorite,
    deleteFavoriteProgram,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
