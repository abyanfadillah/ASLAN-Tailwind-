import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserAuth } from "../../assets/database/AuthContext";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function SideNav() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  });
  const Navigation = [
    {
      id: "1",
      name: "Halaman Utama",
      link: "/",
      src: "https://cdn-icons-png.flaticon.com/512/2897/2897683.png",
    },
    {
      id: "2",
      name: "Kalkulasi Logistik",
      link: "/kalkulatorlogistik",
      src: "https://cdn-icons-png.flaticon.com/512/2897/2897616.png",
    },
    {
      id: "3",
      name: "DataLogistik",
      link: "/data",
      src: "https://cdn-icons-png.flaticon.com/512/1739/1739716.png",
    },
  ];

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/masukakun");
      alert("Kamu Telah Keluar dari ASLAN");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <div className=" invisible sm:visible fixed z-30 flex flex-col w-64 h-screen px-4 py-8 bg-gray-800 ">
        <div data-aos="fade-right" >
          <h2 className="text-center font-sans font-extrabold font text-4xl bg-clip-text bg-gradient-to-br from-blue-700 to-cyan-200 text-transparent">
            ASLAN
          </h2>
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {Navigation.map((item) => (
                <NavLink
                  key={item.id}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center px-4 py-2 mt-2 rounded-md bg-gray-700 text-gray-200"
                      : "flex items-center px-4 py-2 mt-1 transition-colors duration-200 transform rounded-md text-gray-400  hover:bg-gray-700 hover:text-gray-200  "
                  }
                  to={item.link}
                >
                  <span className="inline-block p-2 rounded-xl  bg-blue-300 ">
                    <img className="object-fit w-8 h-8 " src={item.src} />
                  </span>

                  <span className="mx-4 font-medium">{item.name}</span>
                </NavLink>
              ))}

              <hr className="my-6 border-gray-200 dark:border-gray-600" />
            </nav>
            <div className="flex flex-col items-center mt-6 -mx-2">
              <img
                className="object-cover w-12 h-12 mx-2 rounded-full"
                src="https://img.icons8.com/external-bearicons-glyph-bearicons/344/external-User-essential-collection-bearicons-glyph-bearicons.png"
                alt="avatar"
              />
              <button className="text-xs mx-2 mt-2 font-medium text-gray-200 hover:text-gray-100">
                {user?.displayName || user.email}
              </button>
              <button
                onClick={handleLogout}
                className="mx-2 mt-1 text-sm font-medium text-gray-400 hover:text-gray-300"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
