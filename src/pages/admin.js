import { createClient } from "@supabase/supabase-js";
import React, { useState } from "react";
import { supabaseAdmin } from ".";

const CustomInput = ({ type = "text", name, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      className="font-fancy border rounded-sm border-gray-800 basis-9/12 px-2 py-1"
      onChange={onChange}
    />
  );
};

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({});

  const arrayForm = [
    { label: "Name", name: "name" },
    { label: "Username", name: "username" },
    { label: "Link", name: "href" },
    { label: "Image Src", name: "imageSrc" },
  ];

  async function postImage() {
    try {
      setLoading(true);
      let { error } = await supabaseAdmin.from("images").upsert(payload);
      if (error) throw error;
      alert("Image Added!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const value = { ...payload, [e.target.name]: e.target.value };
    setPayload(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postImage();
    e.target.reset();
  };

  return (
    <div className="mx-auto container py-20 max-w-xl">
      <form onSubmit={handleSubmit}>
        {arrayForm?.map((item, index) => (
          <div className="flex flex-row pb-3" key={index}>
            <label className="font-fancy basis-3/12">{item.label}</label>
            <CustomInput name={item.name} onChange={handleChange} />
          </div>
        ))}
        <button
          disabled={loading}
          type="submit"
          className="font-fancy bg-neutral-300 border rounded-xl border-gray-800 px-2 py-1 w-full mt-5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Admin;
