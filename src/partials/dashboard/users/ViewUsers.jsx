import React, { useEffect, useState } from "react";
import UserCard from "../../../components/UserCard";
import Footer from "../../../components/Footer";
import ComingSoon from "../../../components/ComingSoon";
import { getAllUsers } from "../../../api/userAPI";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await getAllUsers();
      if (response.status === 200) setUsers(response.data.data);
      else setErr(response?.response?.data?.error);
    };
    fetchAllUsers();
  }, []);

  return (
    <>
      {users.length !== 0 ? (
        <>
          <div className="w-full mx-auto mb-3">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg border-2 border-[#0F163A] overflow-hidden">
              <input
                className="peer h-full w-full outline-none text-sm text-[#0F163A] pr-2 px-6 placeholder:text-[#0F163A]"
                type="text"
                id="search"
                placeholder="Search users.."
              />
            </div>
          </div>
          {users.map((user) => {
            return (
              <div className="mb-3">
                <UserCard
                  username={`${user.firstName} ${user.lastName}`}
                  email={user.email}
                />
              </div>
            );
          })}
        </>
      ) : (
        <div>Sorry no users</div>
      )}
      {/* <div className="absolute bottom-0 w-full -ml-5">
        <Footer/>
      </div> */}
    </>
  );
}
