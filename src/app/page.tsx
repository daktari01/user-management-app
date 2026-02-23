"use client"

import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/types";
import {fetchSingleUserById, fetchUsers} from "@/state-management/features/users-slice";

const Page = () => {

  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const {
      users,
      singleUser,
      loadingAll,
      loadingSingle,
      errorAll,
      errorSingle
  } = useSelector((state:RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch]);

  useEffect(() => {
    if(selectedUserId !== null) {
      dispatch(fetchSingleUserById(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  return (
      <div>
        <h1>Users</h1>
        { loadingAll && <p>Loading all users...</p> }
        {errorAll && <p>{errorAll}</p>}

        <ul>
          {users?.map((user:User) => (
              <li key={user.id} style={{ marginBottom: "10px" }}>
                {user.name} - {user.email} {""}
                <button
                    style={{
                      border: "1px solid green",
                      padding: "2px 20px",
                      borderRadius: "5px",
                      marginLeft: "10px"
                }}
                    onClick={() => {
                      setSelectedUserId(user.id);
                    }}
                >
                  View Details
                </button>
              </li>
          ))}
        </ul>

        { loadingSingle && <p>Loading single user...</p> }
        {errorSingle && <p>{errorSingle}</p>}

        {singleUser && !loadingSingle && !errorSingle && (
            <div style={{marginTop: "2rem"}}>
              <h2>Selected User Details</h2>
              <p>Name: {singleUser.name}</p>
              <p>Email: {singleUser.email}</p>
              <p>Id: {singleUser.id}</p>
            </div>
        )}
      </div>
  );
};

export default Page;