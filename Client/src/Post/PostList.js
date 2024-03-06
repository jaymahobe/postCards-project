import React, { useEffect, useState } from "react";
import "./PostList.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectLoggedInUser } from "../Auth/AuthSlice";
import { Link } from "react-router-dom";

const PostList = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const handleSignOut = () => {
    console.log("hello world");
    dispatch(clearUser());
  };

  useEffect(() => {
    if (user) {
      toast("📩Welcome email send", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      toast("SignUp successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [user]);

  const getCardData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=4&_page=${page}`
    );
    const data = await res.json();
    if (page === 1) {
      setCard(data);
    } else {
      setCard((prev) => [...prev, ...data]);
    }
    setLoading(false);
    if (card.length >= 100) {
      setLoading(false);
    }
  };

  const handelInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const debouncedScrollHandler = debounce(handelInfiniteScroll, 200);
    window.addEventListener("scroll", debouncedScrollHandler);
    return () => window.removeEventListener("scroll", debouncedScrollHandler);
  }, []);

  useEffect(() => {
    getCardData();
  }, [page]); // Adding 'card' as a dependency to check its length

  return (
    <>
      <ToastContainer />
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 post-container">
          {card.map((post) => (
            <div className="flex justify-center m-2 ">
              <div className="rounded-xl bg-[#FEFEE3] border border-[#545863] p-5 shadow-md w-9/12 ">
                <div className="flex w-full items-center justify-between border-b border-[#C60F7B] pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]" />
                    <div className="text-lg font-bold text-slate-700">
                      User Id {post.id}
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-6">
                  <div className="mb-3 text-xl font-bold text-[#4C956C]">
                    {post.title}
                  </div>
                  <div className="text-md text-[#D68C45]">{post.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading && (
          <div className="flex justify-center m-6">
            <div
              class="w-12 h-12 rounded-full animate-spin
                      border-2 border-solid border-blue-500 border-t-transparent"
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;

function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
