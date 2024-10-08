import React, { useRef } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import axios from "axios";
import Swal from "sweetalert2";
import { AdminBaseUrl } from "../../config/config";

export default function SizeDetails() {
  const sizeNameRef = useRef(null);
  const sizeStatusRef = useRef("active");

  const handleSubmit = (e) => {
    e.preventDefault();
    const sizeDetails = {
      sizeName: sizeNameRef.current.value,
      sizeStatus: sizeStatusRef.current.checked ? "active" : "deactive",
    };
    console.log(sizeDetails);
    // You can now send sizeDetails to your backend using axios or any other method
    axios.post(`${AdminBaseUrl}/size/insert`, sizeDetails)
      .then(response => {
        if(response.data.msg =='Size exists'){
          Swal.fire({
            title: 'Error!',
            text: response.data.msg,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
        else{
        console.log("Size added successfully:", response.data);
        Swal.fire({
          title: 'Success!',
          text: response.data.msg,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
      })
  };

  return (
    <>
      <Breadcrumb path={"Size"} path2={"Size Details"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Size
          </h3>
          <form onSubmit={handleSave} className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Size Name
              </label>
              <input
                type="text"
                name="sizeName"
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                placeholder="Size Name"
                ref={sizeNameRef}
              />
            </div>
            <div className="pe-5 ps-1">
              <span className="flex items-center gap-3">
                Status :
                <input
                  id="active-radio"
                  name="sizeStatus"
                  type="radio"
                  value="active"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  defaultChecked
                  ref={sizeStatusRef}
                />
                Active
                <input
                  id="deactive-radio"
                  name="sizeStatus"
                  type="radio"
                  value="deactive"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                Deactive
              </span>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Add Size
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
