import React, { useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "../../common/Footer";
import { ChromePicker } from "react-color";

export default function AddColor() {
  const [colorName, setColorName] = useState("");
  const [colorPicker, setColorPicker] = useState("#000000");
  const [colorStatus, setColorStatus] = useState("Active");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Color Name:", colorName);
    console.log("Color Picker:", colorPicker);
    console.log("Color Status:", colorStatus);
  };

  return (
    <>
      <Breadcrumb path={"Colors"} path2={"Add Color"} slash={"/"} />
      <div className="w-full">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
            Add colors
          </h3>
          <form className="p-3 border border-t-0 rounded-b-md border-slate-400" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Color Name
              </label>
              <input
                type="text"
                name="colorName"
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                placeholder="Color Name"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="color-picker"
                className="block mb-8 text-md font-medium text-gray-900"
              >
                Color Picker
              </label>
              <input
                type="color"
                id="color-picker"
                value={colorPicker}
                onChange={(e) => setColorPicker(e.target.value)}
              />
              <br />
            </div>
            <div className="pe-5 ps-1">
              <span className="flex items-center gap-3">
                Status :
                <input
                  id="active-radio"
                  name="colorStatus"
                  type="radio"
                  value="Active"
                  checked={colorStatus === "Active"}
                  onChange={(e) => setColorStatus(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                Active
                <input
                  id="deactive-radio"
                  name="colorStatus"
                  type="radio"
                  value="Deactive"
                  checked={colorStatus === "Deactive"}
                  onChange={(e) => setColorStatus(e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                Deactive
              </span>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Select Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
