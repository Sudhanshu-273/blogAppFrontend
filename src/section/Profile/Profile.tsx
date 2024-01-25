"use client";

import { PaperClipIcon } from "@heroicons/react/20/solid";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    designation: "",
    email: "",
    blogs: 0,
    image: ""
  });

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast("Please login first", { type: "error" });
        router.push("/login");
      }
      const res = await axios.get("http://localhost:8080/profile/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data[0];
      console.log(data);

      setUser({
        ...user,
        name: data.name,
        designation: data.designation,
        email: data.email,
        blogs: data.blogs,
        image: data.image
      })
    } catch (error) {
      console.log(error);
      toast("Some Error Occured Fethcing Profile");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar tab={3} />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <img
          src={user.image} // Updated image dimensions
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4" // Updated image dimensions
        />
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-4">{user.designation}</p>
        <div className="grid grid-rows-2 gap-4">
          <div>
            <p className="text-gray-700 font-semibold mb-2">Email:</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold mb-2">Blogs Posted:</p>
            <p className="text-gray-600">{user.blogs}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

// src/components/Profile.js
// "use client"
// // src/components/Profile.js

// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <img
//           src="https://placekitten.com/300/300" // Updated image dimensions
//           alt="Profile"
//           className="w-24 h-24 rounded-full mx-auto mb-4" // Updated image dimensions
//         />
//         <h2 className="text-3xl font-semibold text-gray-800 mb-2">Your Name</h2>
//         <p className="text-gray-600 mb-4">Web Developer</p>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-gray-700 font-semibold mb-2">Email:</p>
//             <p className="text-gray-600">your.email@example.com</p>
//           </div>
//           <div>
//             <p className="text-gray-700 font-semibold mb-2">Location:</p>
//             <p className="text-gray-600">City, Country</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


