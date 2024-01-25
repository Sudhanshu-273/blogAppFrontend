"use client";

import { useEffect, useState } from "react";
import { posts } from "../../../dummy";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

export default function Posts() {
  const [posts, setPost] = useState([
    {
      id: 0,
      title: "",
      description: "",
      date: "",
      category: "",
      author: "",
      role: "",
      image: "",
    },
  ]);

  const API_HOST = process.env.API_HOST;

  const blog = posts[0]?.author || "No Blogs";

  const getData = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await axios.get(`${API_HOST}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data.data);
    setPost(res.data.data);
  };

  useEffect(() => {
    getData();
    console.log(posts);
  }, []);

  return (
    <>
      <Navbar tab={2} />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {blog}
            </h2>
          </div>
          {posts && (
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col rounded-lg border-l border-r border-t border-b p-4 border-gray-200 items-start justify-between"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-500">
                      {post.date}
                    </time>
                    <a
                      href={post.category}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={post.title}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img
                      src={post.image}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href={post.author}>
                          <span className="absolute inset-0" />
                          {post.author}
                        </a>
                      </p>
                      <p className="text-gray-600">{post.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
