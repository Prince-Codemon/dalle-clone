import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { Loader, FormField } from "../components";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (form.prompt && form.photo) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/posts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "SecretKey": process.env.REACT_APP_SECRET_KEY,
            },
            body: JSON.stringify({
              name: form.name,
              prompt: form.prompt,
              photo: form.photo,
            }),
          }
        );
        const data = await response.json();
        
        setLoading(false);
        navigate("/");
      } catch (error) {
        console.log(error);
        alert("Something went wrong, please try again later");
      }
    } else {
      return alert("Please generate an image first");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (form.name === "") return alert("Please enter your name");
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/dalle`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "SecretKey": process.env.REACT_APP_SECRET_KEY,
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        setGeneratingImg(false);
      
      } catch (error) {
        console.log(error);
        alert("Something went wrong, please try again later");
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <section className=" max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="text-[#666e75] text-[14px] mt-2 max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share with the community.
        </p>
      </div>
      <div className=" mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="your name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="prompt"
            type="text"
            name="prompt"
            placeholder="An astronaut encountering an alien life form on a distant planet, photography"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt=""
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt=""
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute top-0 left-0 w-full h-full bg-black rounded-lg bg-opacity-40 flex justify-center items-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className=" mt-5 flex gap-5">
          <button
            className="bg-green-600 text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={generatingImg}
            onClick={generateImage}
          >
            {generatingImg ? "Generating..." : "Generate Image"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created your image, you can share it with the
            community by clicking the button below.
          </p>
          <button
            className="bg-[#6469FF] text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-[#4F54D8] disabled:opacity-50 disabled:cursor-not-allowed mt-5"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Sharing..." : "Share to Community"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
