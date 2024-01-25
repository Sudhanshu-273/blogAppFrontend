"use client";

import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const API_HOST = process.env.API_HOST

export default function Testimonials() {
  const [quoteData, setQuoteData] = useState({
    title: "",
    author: "",
  });

  const quote = async () => {
    const options = {
      method: "GET",
      url: "https://type.fit/api/quotes",
    };

    try {
      const response = await axios.request(options);
      const res = response.data[0];
      console.log(res);
      setQuoteData({
        ...quoteData,
        title: res.text,
        author: res.author,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    quote();
  }, []);

  return (
    <>
      <Navbar tab={0} />
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            className="mx-auto h-28 w-40"
            src="https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-colorful-blog-speech-bubble-vector-png-image_6633021.png"
            alt=""
          />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>{quoteData.title}</p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSaBH__3u8UamlQISCRDWBpjb2SKbXN_gZkg&usqp=CAU"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">
                  Sudhanshu Chaubey
                </div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600">Creator</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
