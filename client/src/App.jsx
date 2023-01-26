import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Home, CreatePost } from "./pages";
import { DiMagento } from "react-icons/di";
import { logo } from "./assets";
const App = () => {
  return (
    <>
      <header className=" w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/" className="text-2xl font-bold text-[#1a1a1a]">
          <img src={logo} className="w-28 object-contain" alt="logo" />
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md "
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[clac(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
      <footer className="w-full bg-[#f9fafe] border-t border-b border-b-[#e6ebf4] py-4">
        <div className="sm:px-8 px-4 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <p className="text-[#1a1a1a] font-bold text-lg">DALL-E Clone</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#1a1a1a] font-bold text-lg">Made with ❤️ by</p>
            <a
              href="https://github.com/Prince-Codemon"
              className="text-[#6469ff] font-bold text-lg"
              rel="noreferrer"
              target={"_blank"}
            >
              Prince Codemon
            </a>
          </div>

          <div className="flex gap-4 items-center">
            <p className="text-[#1a1a1a] font-bold text-lg">© 2023</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
