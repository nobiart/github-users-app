import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

type SearchUser = {
  login: string,
  id: number,
}

type SearchResult = {
  items: SearchUser[];
}

type UserType = {
  login: string,
  id: number,
  avatar_url: string,
  followers: number,
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<SearchUser | null>(null);
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [tempSearch, setTempSearch] = useState<string>("it-kamasutra");
  const [searchTerm, setSearchTerm] = useState<string>("it-kamasutra");

  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  useEffect(() => {
    axios
      .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
      .then(res => setUsers(res.data.items))
  }, [searchTerm]);

  useEffect(() => {
    if (selectedUser) {
      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then(res => setUserDetails(res.data))
    }
  }, [selectedUser]);

  return (
    <div className="container">
      <div className="asideLeft">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Search"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.currentTarget.value)}
          />
          <button onClick={() => setSearchTerm(tempSearch)}>Find</button>
        </div>
        <ul>
          { users.map((u) => (
            <li
              className={selectedUser === u ? "selected" : ""}
              key={u.id}
              onClick={() => {
                setSelectedUser(u);
              }}
            >
              {u.login}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <h2 className="heading">User Details</h2>
        {userDetails && (
          <div>
            <img src={userDetails.avatar_url} alt={userDetails.login} width="80"/>
            <p>Login: {userDetails.login}</p>
            <p>Followers: {userDetails.followers}</p>
          </div>
        )}
      </div>
    </div>
  )
}
