// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { FiLogOut } from "react-icons/fi";
// import {
//   UserCircle,
//   School,
//   FileText,
//   Award,
//   Home,
//   Bell,
//   Search,
// } from "lucide-react";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation"; // ✅ Next.js navigation
// import { AppContext } from "../../Context/ContextApi";
// import Link from "next/link";

// const UserDashBoard = () => {
//   const router = useRouter(); // ✅ replaces useNavigate
//   const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

//   const {
//     status,
//     statusAddress,
//     statusEdu,
//     url,
//     totalApplications,
//     statusDocs,
//   } = useContext(AppContext);

//   const [totalPer, setTotalper] = useState(0);
//   const [currentTotal1, setCurrentTotal1] = useState(0);

//   const profilePercentage = () => {
//     let total = 4;
//     let currentTotal = 0;
//     if (statusAddress === "Completed") currentTotal += 1;
//     if (status === "Completed") currentTotal += 1;
//     if (statusEdu === "Completed") currentTotal += 1;
//     if (statusDocs === "Completed") currentTotal += 1;
//     let grandTotal = (currentTotal / total) * 100;
//     setTotalper(grandTotal);
//     setCurrentTotal1(currentTotal);
//   };

//   useEffect(() => {
//     profilePercentage();
//   }, [status, statusAddress, statusEdu, statusDocs]);

//   const stats = [
//     {
//       title: "Total Applications",
//       value: `${totalApplications}`,
//       icon: <FileText size={20} className="text-blue-600" />,
//       bg: "bg-blue-100",
//     },
//     {
//       title: "Applied Scholarships",
//       value: "5",
//       icon: <Award size={20} className="text-green-600" />,
//       bg: "bg-green-100",
//     },
//     {
//       title: "Notifications",
//       value: "3",
//       icon: <Bell size={20} className="text-yellow-600" />,
//       bg: "bg-yellow-100",
//     },
//     {
//       title: "Profile Completion",
//       value: `${totalPer}%`,
//       icon: <UserCircle size={20} className="text-purple-600" />,
//       bg: "bg-purple-100",
//     },
//   ];

//   const activities = [
//     {
//       id: 1,
//       title: "Application submitted for Need-Based Scholarship",
//       time: "2 hours ago",
//       icon: <FileText size={16} className="text-blue-500" />,
//     },
//     {
//       id: 2,
//       title: "Your merit scholarship application was approved",
//       time: "1 day ago",
//       icon: <Award size={16} className="text-green-500" />,
//     },
//     {
//       id: 3,
//       title: "Reminder: Complete your profile information",
//       time: "2 days ago",
//       icon: <UserCircle size={16} className="text-purple-500" />,
//     },
//   ];

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(`${url}/api/user/logout`);
//       if (response.data.success) {
//         Cookies.remove("token");
//         toast.success("Logged out successfully");

//         // ✅ Next.js navigation
//         router.push("/");

//         localStorage.removeItem("scholarship");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("name");
//         localStorage.removeItem("email");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Logout failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <div className="flex">
//         {/* Sidebar Navigation */}
//         <div className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
//           <div className="flex items-center gap-3 mb-8 p-2">
//             <School size={24} className="text-[#B9FF66]" />
//             <Link
//               href={`/dashboard/user-dashboard/${userId}`}
//               className="text-xl font-bold text-gray-800"
//             >
//               Scholarship Portal
//             </Link>
//           </div>

//           <nav className="space-y-1">
//             <a
//               href="#"
//               className="flex items-center gap-3 p-3 rounded-lg bg-[#B9FF66]/10 text-gray-800 font-medium"
//             >
//               <Home size={18} />
//               Dashboard
//             </a>

//             <Link
//               href={
//                 status === "Pending"
//                   ? `/dashboard/user-dashboard/${userId}`
//                   : `/dashboard/data/${userId}`
//               }
//               onClick={(e) => {
//                 if (status === "Pending") {
//                   e.preventDefault();
//                   toast.error("Please complete the Details section first!");
//                 }
//               }}
//               className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
//             >
//               <UserCircle size={18} />
//               Profile
//             </Link>

//             <div
//               onClick={handleLogout}
//               className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium cursor-pointer"
//             >
//               <FiLogOut size={18} color="red" />
//               Logout
//             </div>
//           </nav>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 p-6 md:p-10">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
//               Dashboard
//             </h1>

//             <div className="flex items-center gap-4 w-full md:w-auto">
//               <div className="relative flex-1 md:w-64">
//                 <Search
//                   size={18}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
//                 />
//               </div>
//               <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
//                 <div className="h-8 w-8 rounded-full bg-[#B9FF66] flex items-center justify-center text-gray-800 font-medium">
//                   {localStorage.getItem("name")?.charAt(0) || ""}
//                   {localStorage.getItem("name")?.charAt(1) || ""}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className={`${stat.bg} p-6 rounded-xl shadow-sm flex items-center justify-between border border-gray-200`}
//               >
//                 <div>
//                   <p className="text-gray-600 text-sm font-medium">
//                     {stat.title}
//                   </p>
//                   <p className="text-2xl font-bold text-gray-800 mt-1">
//                     {stat.value}
//                   </p>
//                 </div>
//                 <div className="p-3 rounded-full bg-white">{stat.icon}</div>
//               </div>
//             ))}
//           </div>

//           {/* Recent Applications */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
//               <div className="bg-[#B9FF66] px-6 py-4">
//                 <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
//                   <FileText size={24} />
//                   Recent Applications
//                 </h2>
//               </div>
//               {/* Dummy data table left unchanged */}
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
//               <div className="bg-[#B9FF66] px-6 py-4">
//                 <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
//                   <Bell size={24} />
//                   Recent Activity
//                 </h2>
//               </div>
//               <div className="p-6 space-y-4">
//                 {activities.map((activity) => (
//                   <div key={activity.id} className="flex gap-3">
//                     <div className="flex-shrink-0 mt-1">
//                       <div className="h-8 w-8 rounded-full bg-[#B9FF66]/20 flex items-center justify-center">
//                         {activity.icon}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         {activity.title}
//                       </p>
//                       <p className="text-sm text-gray-500">{activity.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Profile Completion */}
//           <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
//             <div className="bg-[#B9FF66] px-6 py-4">
//               <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
//                 <UserCircle size={24} />
//                 Profile Completion
//               </h2>
//             </div>
//             <div className="p-6">
//               <div className="mb-4">
//                 <div className="flex justify-between mb-1">
//                   <span className="text-sm font-medium text-gray-700">
//                     {totalPer}% Complete
//                   </span>
//                   <span className="text-sm font-medium text-[#B9FF66]">
//                     {currentTotal1} of 4 sections
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-[#B9FF66] h-2.5 rounded-full transition-all duration-1000"
//                     style={{ width: `${totalPer}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {/* Personal Details */}
//                 <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#B9FF66] transition">
//                   <div
//                     className={`h-8 w-8 rounded-full flex items-center justify-center ${
//                       status === "Completed"
//                         ? "bg-[#B9FF66]/20 text-[#B9FF66]"
//                         : "bg-gray-100 text-gray-400"
//                     }`}
//                   >
//                     <UserCircle size={16} />
//                   </div>
//                   <div>
//                     <Link
//                       href={status === "Completed" ? "#" : "/personal-Info"}
//                       className={`${
//                         status === "Completed"
//                           ? "cursor-not-allowed text-gray-400"
//                           : "text-[#B9FF66] hover:text-[#A5E55C]"
//                       } font-medium`}
//                     >
//                       Personal Details
//                     </Link>
//                     <p className="text-sm text-gray-500">{status}</p>
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#B9FF66] transition">
//                   <div
//                     className={`h-8 w-8 rounded-full flex items-center justify-center ${
//                       statusAddress === "Completed"
//                         ? "bg-[#B9FF66]/20 text-[#B9FF66]"
//                         : "bg-gray-100 text-gray-400"
//                     }`}
//                   >
//                     <Home size={16} />
//                   </div>
//                   <div>
//                     <Link
//                       href={statusAddress === "Completed" ? "#" : "/address"}
//                       onClick={(e) => {
//                         if (statusAddress === "Completed") {
//                           e.preventDefault();
//                           toast.error("Profile already completed");
//                         }
//                       }}
//                       className={`font-medium ${
//                         statusAddress === "Completed"
//                           ? "text-gray-500 cursor-not-allowed"
//                           : "text-[#B9FF66] hover:text-[#A5E55C]"
//                       }`}
//                     >
//                       Address
//                     </Link>
//                     <p className="text-sm text-gray-500">{statusAddress}</p>
//                   </div>
//                 </div>

//                 {/* Education */}
//                 <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#B9FF66] transition">
//                   <div
//                     className={`h-8 w-8 rounded-full flex items-center justify-center ${
//                       statusEdu === "Completed"
//                         ? "bg-[#B9FF66]/20 text-[#B9FF66]"
//                         : "bg-gray-100 text-gray-400"
//                     }`}
//                   >
//                     <School size={16} />
//                   </div>
//                   <div>
//                     <Link
//                       href={statusEdu === "Completed" ? "#" : "/education"}
//                       className={`${
//                         statusEdu === "Completed"
//                           ? "cursor-not-allowed text-gray-400"
//                           : "text-[#B9FF66] hover:text-[#A5E55C]"
//                       } font-medium`}
//                     >
//                       Education
//                     </Link>
//                     <p className="text-sm text-gray-500">{statusEdu}</p>
//                   </div>
//                 </div>

//                 {/* Documents */}
//                 <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#B9FF66] transition">
//                   <div
//                     className={`h-8 w-8 rounded-full flex items-center justify-center ${
//                       statusDocs === "Completed"
//                         ? "bg-[#B9FF66]/20 text-[#B9FF66]"
//                         : "bg-gray-100 text-gray-400"
//                     }`}
//                   >
//                     <FileText size={16} />
//                   </div>
//                   <div>
//                     <Link
//                       href={statusDocs === "Completed" ? "#" : "/docs"}
//                       className={`${
//                         statusDocs === "Completed"
//                           ? "cursor-not-allowed text-gray-400"
//                           : "text-[#B9FF66] hover:text-[#A5E55C]"
//                       } font-medium`}
//                     >
//                       Documents
//                     </Link>
//                     <p className="text-sm text-gray-500">{statusDocs}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> 
//     </div>
//   );
// };

// export default UserDashBoard;



"use client";

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import {
  UserCircle,
  School,
  FileText,
  Award,
  Home,
  Bell,
  Search,
} from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AppContext } from "../../Context/ContextApi";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const {
    status,
    statusAddress,
    statusEdu,
    url,
    totalApplications,
    statusDocs,
  } = useContext(AppContext);

  const [totalPer, setTotalper] = useState(0);
  const [currentTotal1, setCurrentTotal1] = useState(0);

  // Get user data from localStorage on client side only
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setUserName(localStorage.getItem("name") || "");
    setUserEmail(localStorage.getItem("email") || "");
  }, []);

  const profilePercentage = () => {
    let total = 4;
    let currentTotal = 0;
    if (statusAddress === "Completed") currentTotal += 1;
    if (status === "Completed") currentTotal += 1;
    if (statusEdu === "Completed") currentTotal += 1;
    if (statusDocs === "Completed") currentTotal += 1;
    let grandTotal = (currentTotal / total) * 100;
    setTotalper(grandTotal);
    setCurrentTotal1(currentTotal);
  };

  useEffect(() => {
    profilePercentage();
  }, [status, statusAddress, statusEdu, statusDocs]);

  const stats = [
    {
      title: "Total Applications",
      value: `${totalApplications}`,
      icon: <FileText size={20} className="text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Applied Scholarships",
      value: "5",
      icon: <Award size={20} className="text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Notifications",
      value: "3",
      icon: <Bell size={20} className="text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Profile Completion",
      value: `${totalPer}%`,
      icon: <UserCircle size={20} className="text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  const activities = [
    {
      id: 1,
      title: "Application submitted for Need-Based Scholarship",
      time: "2 hours ago",
      icon: <FileText size={16} className="text-blue-500" />,
    },
    {
      id: 2,
      title: "Your merit scholarship application was approved",
      time: "1 day ago",
      icon: <Award size={16} className="text-green-500" />,
    },
    {
      id: 3,
      title: "Reminder: Complete your profile information",
      time: "2 days ago",
      icon: <UserCircle size={16} className="text-purple-500" />,
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${url}/api/user/logout`);
      if (response.data.success) {
        Cookies.remove("token");
        toast.success("Logged out successfully");

        router.push("/");

        localStorage.removeItem("scholarship");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-8 p-2">
            <School size={24} className="text-[#B9FF66]" />
            <Link
              href={`/dashboard/user-dashboard/${userId}`}
              className="text-xl font-bold text-gray-800"
            >
              Scholarship Portal
            </Link>
          </div>

          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg bg-[#B9FF66]/10 text-gray-800 font-medium"
            >
              <Home size={18} />
              Dashboard
            </a>

            <Link
              href={
                status === "Pending"
                  ? `/dashboard/user-dashboard/${userId}`
                  : `/dashboard/data/${userId}`
              }
              onClick={(e) => {
                if (status === "Pending") {
                  e.preventDefault();
                  toast.error("Please complete the Details section first!");
                }
              }}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
            >
              <UserCircle size={18} />
              Profile
            </Link>

            <div
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium cursor-pointer"
            >
              <FiLogOut size={18} color="red" />
              Logout
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              Dashboard
            </h1>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#B9FF66] focus:border-[#B9FF66] outline-none transition"
                />
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-[#B9FF66] flex items-center justify-center text-gray-800 font-medium">
                  {userName?.charAt(0) || ""}
                  {userName?.charAt(1) || ""}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bg} p-6 rounded-xl shadow-sm flex items-center justify-between border border-gray-200`}
              >
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-white">{stat.icon}</div>
              </div>
            ))}
          </div>

          {/* Recent Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-[#B9FF66] px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <FileText size={24} />
                  Recent Applications
                </h2>
              </div>
              {/* Dummy data table left unchanged */}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-[#B9FF66] px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <Bell size={24} />
                  Recent Activity
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-8 w-8 rounded-full bg-[#B9FF66]/20 flex items-center justify-center">
                        {activity.icon}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-[#B9FF66] px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <UserCircle size={24} />
                Profile Completion
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {totalPer}% Complete
                  </span>
                  <span className="text-sm font-medium text-[#B9FF66]">
                    {currentTotal1} of 4 sections
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#B9FF66] h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${totalPer}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Personal Details */}
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#B9FF66] transition">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      status === "Completed"
                        ? "bg-[#B9FF66]/20 text-[#B9FF66]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <UserCircle size={16} />
                  </div>
                  <div>
                    <Link
                      href={status === "Completed" ? "#" : "/personal-Info"}
                      className={`${
                        status === "Completed"
                          ? "cursor-not-allowed text-gray-400"
                          : "text-[#B9FF66] hover:text-[#A5E55C]"
                      } font-medium`}
                    >
                      Personal Details
                    </Link>
                    <p className="text-sm text-gray-500">{status}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#B9FF66] transition">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      statusAddress === "Completed"
                        ? "bg-[#B9FF66]/20 text-[#B9FF66]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Home size={16} />
                  </div>
                  <div>
                    <Link
                      href={statusAddress === "Completed" ? "#" : "/address"}
                      onClick={(e) => {
                        if (statusAddress === "Completed") {
                          e.preventDefault();
                          toast.error("Profile already completed");
                        }
                      }}
                      className={`font-medium ${
                        statusAddress === "Completed"
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-[#B9FF66] hover:text-[#A5E55C]"
                      }`}
                    >
                      Address
                    </Link>
                    <p className="text-sm text-gray-500">{statusAddress}</p>
                  </div>
                </div>

                {/* Education */}
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#B9FF66] transition">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      statusEdu === "Completed"
                        ? "bg-[#B9FF66]/20 text-[#B9FF66]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <School size={16} />
                  </div>
                  <div>
                    <Link
                      href={statusEdu === "Completed" ? "#" : "/education"}
                      className={`${
                        statusEdu === "Completed"
                          ? "cursor-not-allowed text-gray-400"
                          : "text-[#B9FF66] hover:text-[#A5E55C]"
                      } font-medium`}
                    >
                      Education
                    </Link>
                    <p className="text-sm text-gray-500">{statusEdu}</p>
                  </div>
                </div>

                {/* Documents */}
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#B9FF66] transition">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      statusDocs === "Completed"
                        ? "bg-[#B9FF66]/20 text-[#B9FF66]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <FileText size={16} />
                  </div>
                  <div>
                    <Link
                      href={statusDocs === "Completed" ? "#" : "/docs"}
                      className={`${
                        statusDocs === "Completed"
                          ? "cursor-not-allowed text-gray-400"
                          : "text-[#B9FF66] hover:text-[#A5E55C]"
                      } font-medium`}
                    >
                      Documents
                    </Link>
                    <p className="text-sm text-gray-500">{statusDocs}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default page;