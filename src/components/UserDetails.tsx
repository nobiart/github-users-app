import {memo, useEffect, useState} from "react";
import axios from "axios";
import {SearchUser} from "./UsersList.tsx";
import {Timer} from "./Timer.tsx";

type UserType = {
  login: string,
  id: number,
  avatar_url: string,
  followers: number,
}
type UserDetailsProps = {
  selectedUser: SearchUser | null;
}

export const UserDetails = memo(({selectedUser}: UserDetailsProps) => {
  const INITIAL_TIMER = 10;

  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [seconds, setSeconds] = useState<number>(INITIAL_TIMER);

  useEffect(() => {
    if (seconds < 1) {
      setUserDetails(null);
    }
  }, [seconds]);

  useEffect(() => {
    setSeconds(INITIAL_TIMER);
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then(res => {
          setUserDetails(res.data);
        })
    }
  }, [selectedUser]);

  return (
    <>
      <h2 className="heading">User Details</h2>
      {userDetails && (
        <>
          <Timer
            seconds={seconds}
            onChange={setSeconds}
            timerKey={String(userDetails?.id)}
          />
          <div>
            <img src={userDetails.avatar_url} alt={userDetails.login} width="80"/>
            <p>Login: {userDetails.login}</p>
            <p>Followers: {userDetails.followers}</p>
          </div>
        </>
      )}
    </>
  )
});
