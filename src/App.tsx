import './App.css'
import {useEffect, useState} from "react";
import {SearchForm} from "./components/SearchForm.tsx";
import {SearchUser, UsersList} from "./components/UsersList.tsx";
import {UserDetails} from "./components/UserDetails.tsx";

export const App = () => {
  const INITIAL_SEARCH = "it-kamasutra";
  const [selectedUser, setSelectedUser] = useState<SearchUser | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(INITIAL_SEARCH);

  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  return (
    <div className="container">
      <div className="asideLeft">
        <SearchForm term={searchTerm} onSubmit={setSearchTerm}/>
        <button onClick={() => setSearchTerm(INITIAL_SEARCH)}>Reset</button>
        <UsersList selectedUser={selectedUser} searchTerm={searchTerm} onSelect={setSelectedUser}/>
      </div>
      <div className="content">
        <UserDetails selectedUser={selectedUser} />
      </div>
    </div>
  )
}
