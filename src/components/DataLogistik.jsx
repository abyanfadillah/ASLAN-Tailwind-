import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../assets/database/Firebase";
import { db } from "../assets/database/Firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  doc,
  query,
  orderBy,
} from "@firebase/firestore";
import { UserAuth } from "../assets/database/AuthContext";
import Aos from "aos";

export default function DataLogistik() {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [dataLogistik, setDataLogistik] = useState([]);
  const [idDokumen, setIdDokumen] = useState("");
  const [logicMasuk, setLogicMasuk] = useState(false);
  const [logicHapus, setLogicHapus] = useState(false);

  const deleteData = async () => {
    const uidClient = auth.currentUser.uid;
    const userData = doc(db, "client", uidClient, "datalogistik", idDokumen);
    await deleteDoc(userData);
    alert("Data Telah Dihapus");
    window.location.reload(false);
  };

  useEffect(() => {
    console.log(idDokumen);
  });

  const masukData = async () => {
    const uidClient = auth.currentUser.uid;
    const docKebutuhanLogistik = doc(
      db,
      "client",
      uidClient,
      "kebutuhanlogistik",
      "idKebutuhanLogistik"
    );
    await setDoc(docKebutuhanLogistik, { noDokumen: String(idDokumen) });
    navigate("/kebutuhanlogistik");
  };

  useEffect(() => {
    if (logicMasuk) {
      masukData();
    }
    setLogicMasuk(false);
    if (logicHapus) {
      deleteData();
    }
    setLogicHapus(false);
  }, [idDokumen]);

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });

    if (user != null) {
      const getDataLogistik = async () => {
        const uidClient = auth.currentUser.uid;
        const collectionDataLogistik = collection(
          db,
          "client",
          uidClient,
          "datalogistik"
        );
        const q = query(collectionDataLogistik, orderBy("waktuInput", "desc"));
        const data = await getDocs(q);
        setDataLogistik(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      };
      getDataLogistik();
    }
  }, [user]);
  return (
    <>
      <section className="sm:ml-64  bg-gray-900 h-auto  min-h-screen pt-8">
        <div className=" container sm:px-6 sm:py-10 mx-auto pt-24 ">
          <h1 className="text-3xl font-semibold  capitalize lg:text-4xl text-white text-center">
            Data Logistik <br />{" "}
            <span className="underline decoration-blue-500">Nelayan</span>
          </h1>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3 pb-8 px-8 ">
            {dataLogistik.map((item) => (
              <div key={item.id} data-aos="fade-up">
                <div className=" p-8 space-y-3 border-2  border-blue-300 rounded-xl place-items-center">
                  <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="w-full h-64 bg-gray-300 bg-center bg-bg-unsplash rounded-lg shadow-md"></div>

                    <div className="w-64 -mt-10 overflow-hidden rounded-lg shadow-lg md:w-64 bg-gray-800">
                      <h3 className="py-2 text-xs font-bold tracking-wide text-center  uppercase text-white">
                        {item.kepalaNelayan}
                      </h3>

                      <div className="flex items-center justify-between px-3 py-2  bg-gray-700">
                        <span className="text-[11px] font-bold  text-gray-200">
                          {" "}
                          {String(
                            new Date(
                              item["waktuInput"]["seconds"] * 1000
                            ).toLocaleDateString("default", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          )}{" "}
                        </span>
                        <div className="grid grid-cols-1 justify-center">
                          <button
                            onClick={async () => {
                              setIdDokumen(item.id);
                              setLogicMasuk(true);
                            }}
                            className="mr-1 mb-1 px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-900 hover:bg-gray-600  focus:bg-gray-600 focus:outline-none rounded-md w-16"
                          >
                            Buka
                          </button>
                          <button
                            onClick={(id) => {
                              setIdDokumen(item.id);
                              setLogicHapus(true);
                            }}
                            className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-200 transform bg-gray-900 hover:bg-gray-600  focus:bg-gray-600 focus:outline-none rounded-md w-16"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
