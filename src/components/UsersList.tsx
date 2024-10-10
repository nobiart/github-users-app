import {memo, useEffect, useState} from "react";
import axios from "axios";

export type SearchUser = {
  login: string,
  id: number,
}
type SearchResult = {
  items: SearchUser[];
}
type UsersListProps = {
  searchTerm: string;
  selectedUser: SearchUser | null;
  onSelect: (selectedUser: SearchUser) => void;
}

export const UsersList = memo(({searchTerm, selectedUser, onSelect}: UsersListProps) => {
  const [users, setUsers] = useState<SearchUser[]>([]);

  useEffect(() => {
    axios
      .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`)
      .then(res => setUsers(res.data.items))
  }, [searchTerm]);

  return (
    <ul>
      {users.map((u) => (
        <li
          className={selectedUser === u ? "selected" : ""}
          key={u.id}
          onClick={() => onSelect(u)}
        >
          {u.login}
        </li>
      ))}
    </ul>
  )
});
