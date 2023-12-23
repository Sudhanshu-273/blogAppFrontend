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
      <div className="mx-auto max-w-md mt-10 p-6 bg-white rounded-md shadow-md">
        <div>
          <h3 className="text-xl font-semibold leading-7 text-gray-900">
            {user.name}
          </h3>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            Personal details
          </p>
        </div>
        <div className="mt-4 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-0">
              <dt className="text-sm font-medium leading-6 text-gray-600">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-900 sm:col-span-2">
                {user.name}
              </dd>
            </div>
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-0">
              <dt className="text-sm font-medium leading-6 text-gray-600">
                Designation
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-900 sm:col-span-2">
                {user.designation}
              </dd>
            </div>
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-0">
              <dt className="text-sm font-medium leading-6 text-gray-600">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-900 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-0">
              <dt className="text-sm font-medium leading-6 text-gray-600">
                Blogs Posted
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-900 sm:col-span-2">
                {user.blogs}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
