import axios from "axios";
import "../styles/database.css";
import React, { useEffect, useState } from "react";

const DatabaseList = ({ activeTab }) => {
  const [userData, setUserData] = useState([]);
  const data = [
    { id: "ABC123", name: "Abu", department: "IT", specialty: "Software" },
    {
      id: "ABC124",
      name: "Ahmad",
      department: "Software",
      specialty: "Networking",
    },
    {
      id: "ABC125",
      name: "Ali",
      department: "Technical",
      specialty: "Hardware",
    },
  ];
  useEffect(() => {
    const allUsers = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/getalluser`,
          { whichRole: activeTab }, // or whatever your backend expects!
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    allUsers();
  }, [activeTab]);

  console.log(userData);

  return (
    <div>
      <table className="database-table">
        <thead>
          <tr>
            <th></th>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Speciality</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((entry, index) => (
            <tr
              key={entry._id}
              className={index % 2 === 0 ? "light-row" : "dark-row"}
            >
              <td>
                <input type="checkbox" />
              </td>
              <td>{entry._id}</td>
              <td>{entry.username}</td>
              <td>{entry.department}</td>
              <td>{entry.specialty}</td>
              <td className="actions"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatabaseList;
