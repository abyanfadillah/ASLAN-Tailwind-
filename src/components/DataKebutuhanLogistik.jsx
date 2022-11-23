import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../assets/database/Firebase";
import { db } from "../assets/database/Firebase";
import { getDoc, doc, updateDoc } from "@firebase/firestore";
import { UserAuth } from "../assets/database/AuthContext";
import emailjs from "@emailjs/browser";
import Aos from "aos";

export default function DataKebutuhanLogistik() {
  const { user } = UserAuth();
  var [dokumenNumber, setDokumenNumber] = useState("");
  var [ambilIdDokumen, setAmbilIdDokumen] = useState({
    alamatNelayan: "",
    jumlahNelayan: "",
    kapalNelayan: "",
    namaKapalNelayan: "",
    kecamatanNelayan: "",
    kepalaNelayan: "",
    tipeKapalNelayan: "",
    bahanKapalNelayan: "",
    kotaNelayan: "",
    logistikAirBersih: "",
    logistikBeras: 0,
    logistikEsbBatu: "",
    logistikMinyak: "",
    nomorNelayan: "",
    perjalananNelayan: "",
  });
  const [newSolar, setNewSolar] = useState();
  const [newAir, setNewAir] = useState();
  const [newBeras, setNewBeras] = useState();
  const [newEs, setNewEs] = useState();
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

        const docDataLogistik = doc(
          db,
          "client",
          uidClient,
          "kebutuhanlogistik",
          "idKebutuhanLogistik"
        );
        const snapIdDokumen = await getDoc(docDataLogistik);
        const dokumenJson = snapIdDokumen.data();
        console.log(dokumenJson.noDokumen);
        setDokumenNumber(dokumenJson.noDokumen);

        const collectionAmbilDataLogistik = doc(
          db,
          "client",
          uidClient,
          "datalogistik",
          dokumenJson.noDokumen
        );
        const data = await getDoc(collectionAmbilDataLogistik);
        const dataJson = data.data();
        console.log(dataJson);
        setAmbilIdDokumen({
          alamatNelayan: dataJson.alamatNelayan,
          jumlahNelayan: dataJson.jumlahNelayan,
          namaKapalNelayan: dataJson.namaKapalNelayan,
          kapalNelayan: dataJson.kapalNelayan,
          tipeKapalNelayan: dataJson.tipeKapalNelayan,
          bahanKapalNelayan: dataJson.bahanKapalNelayan,
          kecamatanNelayan: dataJson.kecamatanNelayan,
          kepalaNelayan: dataJson.kepalaNelayan,
          kotaNelayan: dataJson.kotaNelayan,
          logistikAirBersih: dataJson.logistikAirBersih,
          logistikBeras: dataJson.logistikBeras,
          logistikEsbBatu: dataJson.logistikEsbBatu,
          logistikMinyak: dataJson.logistikMinyak,
          nomorNelayan: dataJson.nomorNelayan,
          perjalananNelayan: dataJson.perjalananNelayan,
        });
        setNewSolar(dataJson.logistikMinyak);
        setNewAir(dataJson.logistikAirBersih);
        setNewEs(dataJson.logistikEsbBatu);
        setNewBeras(dataJson.logistikBeras);
        console.log(user?.displayName || user.email);
      };
      getDataLogistik();
    }
  }, [user]);
  var templateParams = {
    solar: Number(newSolar),
    airBersih: Number(newAir),
    beras: Number(newBeras),
    esBatu: Number(newEs),
    nama: String(ambilIdDokumen.kepalaNelayan),
    nomorTelepon: String(ambilIdDokumen.nomorNelayan),
    kota: String(ambilIdDokumen.kotaNelayan),
    kecamatan: String(ambilIdDokumen.kecamatanNelayan),
    alamat: String(ambilIdDokumen.alamatNelayan),
    namaKapal: String(ambilIdDokumen.namaKapalNelayan),
    email: String(user?.displayName || user.email),
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_ea4dwku",
        "template_f43ggmm",
        templateParams,
        "4citUsjisGm0o1jLP"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    emailjs
      .send(
        "service_ea4dwku",
        "template_vj4wvmo",
        templateParams,
        "4citUsjisGm0o1jLP"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    alert("Logistik Telah Dipesan, Mohon Menunggu Info Selanjutnya");
  };

  const updateData = async () => {
    const uidClient = auth.currentUser.uid;
    const userDoc = doc(db, "client", uidClient, "datalogistik", dokumenNumber);
    const dataUpdated = {
      logistikBeras: Number(newBeras),
      logistikEsbBatu: Number(newEs),
      logistikAirBersih: Number(newAir),
      logistikMinyak: Number(newSolar),
    };
    await updateDoc(userDoc, dataUpdated);
    alert("Data Telah Disimpan");
    window.location.reload(false);
  };

  const updatePlusSolar = async () => {
    setNewSolar(Number((newSolar + 0.1).toFixed(1)));
  };

  const updateMinusSolar = async () => {
    setNewSolar(Number((newSolar - 0.1).toFixed(1)));
  };

  const updatePlusEs = async () => {
    setNewEs(Number((newEs + 0.1).toFixed(1)));
  };

  const updateMinusEs = async () => {
    setNewEs(Number((newEs - 0.1).toFixed(1)));
  };

  const updatePlusAir = async () => {
    setNewAir(Number((newAir + 0.1).toFixed(1)));
  };

  const updateMinusAir = async () => {
    setNewAir(Number((newAir - 0.1).toFixed(1)));
  };

  const updatePlusBeras = async () => {
    setNewBeras(Number((newBeras + 0.1).toFixed(1)));
  };
  const updateMinusBeras = async () => {
    setNewBeras(Number((newBeras - 0.1).toFixed(1)));
  };

  return (
    <>
      <section className="bg-gray-900 sm:ml-64 h-auto min-h-screen py-24 ">
        <div className="container px-12 py-10 mx-auto ">
          <div className="place-items-center flex justify-center"></div>
          <h1
            name="message"
            className="text-3xl font-semibold  capitalize lg:text-4xl text-white "
          >
            Kebutuhan Logistik
            <br />{" "}
            <span className="underline decoration-blue-500">Nelayan</span>
          </h1>
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3"
          >
            <div className="space-y-3">
              <span className="inline-block p-3  rounded-full text-white bg-blue-300">
                <img
                  className="w-6 h-6"
                  src="https://cdn-icons-png.flaticon.com/512/456/456283.png"
                  alt=""
                />
              </span>

              <h1 className="text-2xl font-semibold capitalize text-white">
                Data Nelayan
              </h1>
              <p className=" text-gray-300 ">
                Nama Kepala Nelayan: {ambilIdDokumen.kepalaNelayan}
                <br />
                Jumlah Nelayan berangkat: {ambilIdDokumen.jumlahNelayan} Orang
                <br />
                Kota Nelayan: {ambilIdDokumen.kotaNelayan} <br />
                Kecamatan Nelyan: {ambilIdDokumen.kecamatanNelayan} <br />
                Alamat Nelayan: {ambilIdDokumen.alamatNelayan} <br />
                Nomor Telepon Nelayan: {ambilIdDokumen.nomorNelayan} <br />
                Lama Perjalanan :{ambilIdDokumen.perjalananNelayan} Hari
                <br />
              </p>
            </div>

            <div className="space-y-3">
              <span className="inline-block p-3  rounded-full text-white bg-blue-300">
                <img
                  className="w-6 h-6"
                  src="https://cdn-icons-png.flaticon.com/512/896/896624.png"
                  alt=""
                />
              </span>

              <h1 className="text-2xl font-semibold  capitalize text-white">
                Data Kapal
              </h1>

              <p className=" text-gray-300">
                Nama Kapal: {ambilIdDokumen.namaKapalNelayan} <br />
                Tipe Kapal: {ambilIdDokumen.tipeKapalNelayan} <br />
                Bahan Kapal: {ambilIdDokumen.bahanKapalNelayan} <br />
                Berat Kotor Kapal: {ambilIdDokumen.kapalNelayan} GT
                <br />
              </p>
            </div>

            <div className="space-y-3">
              <span className="inline-block p-3  rounded-full text-white bg-blue-300">
                <img
                  className="w-6 h-6"
                  src="https://cdn-icons-png.flaticon.com/512/3134/3134212.png"
                  alt=""
                />
              </span>

              <h1 className="text-2xl font-semibold  capitalize text-white">
                Kebutuhan Bahan Bakar Minyak{" "}
              </h1>

              <p className=" text-gray-300">
                <button
                  onClick={updateMinusSolar}
                  className=" bg-blue-300 inline-block align-middle p-1 rounded-full "
                >
                  {" "}
                  <img
                    className="w-3"
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828901.png"
                    alt=""
                  />
                </button>{" "}
                <button
                  onClick={updatePlusSolar}
                  className="bg-blue-300 inline-block align-middle p-1 rounded-full "
                >
                  {" "}
                  <img
                    className="w-3 h-3"
                    src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png"
                    alt=""
                  />
                </button>{" "}
                <span className="inline-block align-middle">
                  {" "}
                  {newSolar} Liter Solar{" "}
                </span>
              </p>
            </div>

            <div className="space-y-3">
              <span className="inline-block p-3 rounded-full text-white bg-blue-300">
                <img
                  className="w-6 h-6"
                  src="https://cdn-icons-png.flaticon.com/512/2995/2995903.png"
                  alt=""
                />
              </span>

              <h1 className="text-2xl font-semibold  capitalize text-white">
                Kebutuhan Es Batu
              </h1>

              <p className=" text-gray-300">
                <button
                  onClick={updateMinusEs}
                  className=" bg-blue-300 inline-block align-middle p-1 rounded-full "
                >
                  {" "}
                  <img
                    className="w-3"
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828901.png"
                    alt=""
                  />
                </button>{" "}
                <button
                  onClick={updatePlusEs}
                  className="bg-blue-300 inline-block align-middle p-1 rounded-full "
                >
                  {" "}
                  <img
                    className="w-3 h-3"
                    src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png"
                    alt=""
                  />
                </button>{" "}
                <span className="inline-block align-middle">
                  {" "}
                  {newEs} Ton Es Batu
                </span>
              </p>
            </div>

            <div className="space-y-3">
              <span className="inline-block p-3  rounded-full text-white bg-blue-300">
                <img
                  className="w-6 h-6"
                  src="https://cdn-icons-png.flaticon.com/512/3105/3105761.png"
                  alt=""
                />
              </span>

              <h1 className="text-2xl font-semibold  capitalize text-white">
                Kebutuhan Air Bersih
              </h1>

              <p className="text-gray-500 dark:text-gray-300">
                <button
                  onClick={updateMinusAir}
                  className=" bg-blue-300 inline-block align-middle p-1 rounded-full "
                >
                  {" "}
                  <img
                    className="w-3"
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828901.png"
                    alt=""
                  />
                </button>{" "}
                <button
                  onClick={updatePlusAir}
                  className="bg-blue-300 inline-block align-middle p-1 rounded-full "
                >
                  {" "}
                  <img
                    className="w-3 h-3"
                    src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png"
                    alt=""
                  />
                </button>{" "}
                <span className="inline-block align-middle">
                  {newAir} Liter Air Bersih
                </span>
              </p>
            </div>

            <div className="space-y-3">
              <span className="inline-block p-3   rounded-full text-white bg-blue-300">
                <img
                  className="w-6 h-6"
                  src="https://cdn-icons-png.flaticon.com/512/4184/4184039.png"
                  alt=""
                />
              </span>

              <h1 className="text-2xl font-semibold tcapitalize text-white">
                Kebutuhan Pokok
              </h1>

              <p className=" text-gray-300 place-items-center justify-start flex ">
                <div>
                  <button
                    onClick={updateMinusBeras}
                    className=" bg-blue-300 inline-block align-middle p-1 rounded-full "
                  >
                    {" "}
                    <img
                      className="w-3"
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828901.png"
                      alt=""
                    />
                  </button>{" "}
                  <button
                    onClick={updatePlusBeras}
                    className="bg-blue-300 inline-block align-middle p-1 rounded-full "
                  >
                    {" "}
                    <img
                      className="w-3 h-3"
                      src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png"
                      alt=""
                    />
                  </button>{" "}
                  <span className="inline-block align-middle">
                    {" "}
                    {newBeras} Kg Beras{" "}
                  </span>
                </div>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex item-center justify-center">
          <button
            onClick={updateData}
            type="submit"
            className="mx-2 px-8 py-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-900 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            Simpan
          </button>

          <button
            onClick={sendEmail}
            type="submit"
            className="mx-2 px-8 py-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            Pesan
          </button>
        </div>
      </section>
    </>
  );
}
