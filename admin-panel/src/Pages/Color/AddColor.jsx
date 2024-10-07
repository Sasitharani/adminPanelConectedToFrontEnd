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
        let formDataobj=new FormData(event.target)
    axios.post(AdminBaseUrl+"/category/insert",formDataobj)
    .then((res)=>{
        if(res.data.status==1){
            //success
            window.alert("Data Save")
        }
        else{
            if(res.data.error.code==11000){
               window.alert("Category Name allredy exits...")
            }
        }
    })
  };

  return (
    <>
      <Breadcrumb path={"Colors"} path2={"Add Color"} slash={"/"} />
      <div className="w-full">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
            Add colors
          </h3>
          <form onSubmit={handleSubmit} className="p-3 border border-t-0 rounded-b-md border-slate-400">
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
          </div>
          </>
  );
}
