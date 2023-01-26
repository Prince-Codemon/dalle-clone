import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card ease transition">
      <img
        src={photo}
        alt={prompt}
        className=" w-full h-auto object-cover rounded-xl"
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md transition ease-in-out">
        <p className="text-white text-md overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full object-cover  flex items-center justify-center bg-green-700 text-xs font-bold text-white uppercase">
              {name[0]}
            </div>
            <p className="text-white text-sm capitalize">{name}</p>
          </div>
          <button
            className="bg-white text-black font-semibold text-sm py-2 px-4 rounded-md hover:bg-gray-200"
            onClick={() => downloadImage(_id,photo)}
          >
            <img src={download} alt="download" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
