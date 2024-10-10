import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import axios from "axios";
import { AdminBaseUrl } from "../../config/config";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import ResponsivePagination from 'react-responsive-pagination';


export default function ViewCategory() {
  let [orderModal, setOrderModal] = useState(false);
  let [path, setPath] = useState("");
  let [data, setData] = useState([]);
  let[checkedIds,setCheckedIds]=useState([]);
// Pagination Variables
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
// Pagination Variables


  let [SearchData,setSearchData]=useState({
    catName:'',
    catDesc:'',
    pageNo:1
  })

  let GetorSetValue =(event)=>{
    let oldSearch={...SearchData}
    oldSearch[event.target.name]=event.target.value
    setSearchData(oldSearch)
  }

  let getCategory = () => {
    let obj={...SearchData}
    obj['pageNo']=currentPage
    console.log(obj.pageNo)
 console.log(obj)
    axios
    // ________________________________________________View____________________________________________________________
      .get(`${AdminBaseUrl}/category/view`,{
        params:obj
      })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status == 1) {
          setPath(finalRes.path);
          setData(finalRes.data);
        }
      });
  };
  
let getCheckedid=(event)=>{
  if(event.target.checked){
    setCheckedIds([...checkedIds,event.target.value])
  }
  else{
    let filterIds=checkedIds.filter((id)=>id!=event.target.value)
    setCheckedIds(filterIds)
  }
}

let multiDelete =()=>{

if(checkedIds.length==0){
Swal.fire("Please select a item to be deleted")
}
else{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.post(`${AdminBaseUrl}/category/multiDelete/`,{ids:checkedIds}).
      then((res)=>{
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
      getCategory();
    });
   
    }
  });
}

}
  
  let handleDelete =(id)=>{ {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`${AdminBaseUrl}/category/delete/${id}`).
      then((res)=>{
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
      getCategory();
    });
   
    }
  });
}

  }
  useEffect(() => {
    getCategory();
  }, []);
    // ________________________________________________Pagination____________________________________________________________
  useEffect(() =>{
    getCategory()   
   // console.log(currentPage)
  },[currentPage])

  let submitSearchForm=(event)=>{
    event.preventDefault();
    getCategory();
  }

  useEffect(()=>{
    getCategory();
  },[SearchData])

  useEffect(()=>{
    console.log(checkedIds)
  },[checkedIds])
  return (
    <section className="w-full">
      {/* Order Modal Start */}
      <div
        id="order-modal"
        className={`${
          orderModal === true ? `block` : `hidden`
        }  block overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div
          className="fixed w-full h-screen "
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="relative p-4 px-20 w-full max-w-full max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900">
                  Product Image's & Price
                </h3>
                <button
                  onClick={() => setOrderModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="order-modal"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div className="grid grid-cols-[22%_45%_27%] gap-10">
                  <div className="border-2 rounded-md shadow-md p-4">
                    <img
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/902af913-69be-4024-b22c-cd573b7dd13b1613028902744-Roadster-Men-Tshirts-9521613028900435-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex items-start flex-wrap gap-5 border-2 rounded-md shadow-md p-3">
                    <img
                      className="w-36"
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/7f8383cc-07f5-4714-b451-fba7d49776921613028902727-Roadster-Men-Tshirts-9521613028900435-2.jpg"
                      alt=""
                    />
                    <img
                      className="w-36"
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/5d8249b2-cbfa-42a3-9b8a-9406fcb8af0c1613028902710-Roadster-Men-Tshirts-9521613028900435-3.jpg"
                      alt=""
                    />
                    <img
                      className="w-36"
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/bf9e30b3-5b8e-4cf1-811b-81ea64d45ed81613028902692-Roadster-Men-Tshirts-9521613028900435-4.jpg"
                      alt=""
                    />
                    <img
                      className="w-36"
                      src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13278488/2021/2/11/77451543-64cb-4294-8f82-24ac1d78dcf01613028902666-Roadster-Men-Tshirts-9521613028900435-5.jpg"
                      alt=""
                    />
                  </div>
                  <div className="border-2 rounded-md shadow-md p-3">
                    <h3 className="text-center font-semibold text-[20px]">
                      Product Details
                    </h3>
                    <ul className="space-y-4 mt-8">
                      <li className="font-semibold text-[17px]">
                        Price :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; ₹ 1500
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        MRP :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; ₹ 3000
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        Manage Stock :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; In Stock
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        Brand Name:{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; Lev's
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        Size :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; Xl{" "}
                        </span>{" "}
                      </li>
                      <li className="font-semibold text-[17px]">
                        Color :{" "}
                        <span className="font-normal text-[16px] ">
                          &nbsp; Red{" "}
                        </span>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Order Modal End */}
      <Breadcrumb
        path={"Parent Category"}
        path2={"View Category"}
        slash={"/"}
      />
      <form onSubmit={submitSearchForm}>
        <div className="flex items-center justify-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-lg">
          <input
            name="catName"
            type="text"
            placeholder="Search by Name"
            onChange={GetorSetValue}
            className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="catDesc"
            type="text"
            placeholder="Search by Description"
            onChange={GetorSetValue}
            className="w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </div>
      </form>
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            View Category
          </h3>
          <div className="border border-t-0 rounded-b-md border-slate-400">
            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-gray-500">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <button
                      onClick={multiDelete}
                      className="px-6 py-3 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>

                    <th scope="col" className="px-6 py-3">
                      S. No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length >= 1 ? (
                    data.map((item, index) => (
                      <tr key={index} className="bg-white border-b">
                        <th
                          scope="row"
                          className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap"
                        >
                          <input
                            onChange={getCheckedid}
                            name="deleteCheck"
                            id="purple-checkbox"
                            type="checkbox"
                            value={item._id}
                            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                        </th>
                        <td className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap">
                          {item.categoryName}
                        </td>
                        <td className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap">
                          <img
                            className="w-16 h-16 rounded-md object-cover"
                            src={path + item.categoryImage}
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap">
                          {item.categoryDescription}
                        </td>
                        <td className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(item._id)}
                          >
                            <path d="M3 6h18v2H3V6zm2 3h14v13H5V9zm3 2v9h2v-9H8zm4 0v9h2v-9h-2zm4 0v9h2v-9h-2zM9 4V2h6v2h5v2H4V4h5z" />
                          </svg>

                          <Link
                            to={`/parent-category/add-category/${item._id}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              style={{ cursor: "pointer" }}
                              onclick="handleEdit()"
                            >
                              <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-9.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-[18px] font-semibold text-gray-900 whitespace-nowrap">
                          {item.categoryStatus ? "Active" : "Deactive"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white border-b">
                      <td colSpan={7} className="px-6 py-4 text-center">
                        No Data Found..
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
