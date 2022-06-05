import React, { useState } from "react";
import "./styles.css";
import { VFC } from "react";
import { UserCard } from "./components/UserCard";
import { UserProfile } from "./types/userProfile";
import { User } from "./types/api/user";
import axios from "axios";

export const App: VFC = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const onClickFetchUser = () => {
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.city}`
        }));
        setUserProfiles(data);
      });
  };

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      {userProfiles.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
