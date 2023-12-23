"use client";

import { FormEvent, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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
export default function CreatePost() {

  const router = useRouter();

  const [post, setPost] = useState({
    title: "",
    category: "",
    date: "",
    description: "",
  });

  const postFailedToast = () =>
    toast("Could not add Blog", {
      type: "error",
    });

  const postSuccessToast = () =>
    toast("Blog Added Successfully", {
      type: "success",
    });

  const uploadPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8080/posts/new", post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      postSuccessToast();
      console.log(res.data);
    } catch (error) {
      postFailedToast();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    uploadPost();
    router.push("/");
    

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
      <Navbar tab={1} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new Blog Entry
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
                Title
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  name="title"
                  type="title"
                  autoComplete="title"
                  onChange={(e) =>
                    setPost({
                      ...post,
                      title: e.target.value,
                    })
                  }
                  value={post.title}
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
                  Category / Domain
                </label>
              </div>
              <div className="mt-1">
                {/* <input
                  id="category"
                  name="category"
                  type="category"
                  autoComplete="category"
                  onChange={(e) =>
                    setPost({
                      ...post,
                      category: e.target.value,
                    })
                  }
                  value={post.category}
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                /> */}
                <select className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="category"
                  name="category"
                  onChange={(e) => {
                    setPost({
                      ...post,
                      category: (e.target.value),
                    })
                  }}
                  value={post.category}
                  aria-placeholder="Select Category"
                >
                  <option value="Sports">Sports</option>
                  <option value="News">News</option>
                  <option value="Life">Life</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="date"
                  name="date"
                  type="date"
                  autoComplete="date"
                  onChange={(e) =>
                    setPost({
                      ...post,
                      date: e.target.value,
                    })
                  }
                  value={post.date}
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
                  Description
                </label>
              </div>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  autoComplete="date"
                  onChange={(e) =>
                    setPost({
                      ...post,
                      description: e.target.value,
                    })
                  }
                  value={post.description}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
