"use client";

import { FormEvent, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
const API_HOST = process.env.API_HOST
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function CreateProfile() {
  const [profile, setProfile] = useState({
    name: "",
    designation: "",
    image: "",
  });

  const [img, setImg] = useState<File | null>();

  const router = useRouter();

  const postFailedToast = () =>
    toast("Could not complete Profile", {
      type: "error",
    });

  const postSuccessToast = () =>
    toast("Profile Updated Successfully", {
      type: "success",
    });

  const submitImage = async () => {
    const data = new FormData();
    if (img) data.append("file", img);
    data.append("upload_preset", "mdncbk8p");
    data.append("cloud_name", "ddegyx4ap");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/ddegyx4ap/image/upload",
        data
      );
      console.log("Upload Successfull", res.data.url);

      //   setProfile((prevProfile) => {
      //     return {
      //       ...prevProfile,
      //       image: res.data.url,
      //     };
      //   });

      await uploadPost(res.data.url);
    } catch (error) {
      console.log(error);
      toast("Couldn't upload image", {
        type: "error",
      });
    }
  };

  const uploadPost = async (url: string) => {
    try {
        
        const prof = {
            ...profile,
            image: url,
        };
        console.log(prof);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_HOST}/profile/update`,
        prof,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      postSuccessToast();
      console.log(res.data);
    } catch (error) {
      postFailedToast();
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    submitImage();
    // uploadPost()
    router.push("/")

    // console.log(post);
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      {/* <Navbar tab={3} /> */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Complete Your Profile
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fname"
                  name="fname"
                  type="fname"
                  autoComplete="firstname"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                  value={profile.name}
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Designation
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  autoComplete="designation"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      designation: e.target.value,
                    })
                  }
                  value={profile.designation}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Profile Image
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="image"
                  name="image"
                  type="file"
                  autoComplete="image"
                  onChange={(e) =>
                    setImg(e.target.files ? e.target.files[0] : null)
                  }
                  required
                  placeholder="Select Image"
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button>upload</button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
