import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// main component
export default function UserContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const value = {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    age,
    setAge,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
