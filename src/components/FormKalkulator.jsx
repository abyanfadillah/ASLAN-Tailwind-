
import React from "react";
import { useState, useEffect } from "react";

import {  useNavigate } from "react-router-dom";
import { auth } from "../assets/database/Firebase";
import { db } from "../assets/database/Firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";

import Aos from "aos";

export default function FormKalkulator() {
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  });
  const navigate = useNavigate();

  const [isiNama, setIsiNama] = useState("");
  const [isiAlamat, setIsiAlamat] = useState("");
  const [isiNomor, setIsiNomor] = useState("");
  const [pilihKota, setPilihKota] = useState("");
  const [pilihKecamatan, setPilihKecamatan] = useState("");
  const [pilihKapal, setPilihKapal] = useState(0);
  const [pilihTipeKapal, setPilihTipeKapal] = useState(0);
  const [pilihBahanKapal, setPilihBahanKapal] = useState(0);
  const [isiNamaKapal, setIsiNamaKapal] = useState("");
  const [pilihJumlahN, setPilihJumlahN] = useState(0);
  const [pilihPerjalanan, setPilihPerjalanan] = useState(0);

 

  const kota = [
    { id: 1, value: "Bintan", strValue: "Bintan" },
    { id: 2, value: "Tanjung Pinang", strValue: "Tanjung Pinang" },
  ];

  const bintan = [
    { id: 1, value: "Bintan Timur", strValue: "Bintan Timur" },
    { id: 2, value: "Bintan Utara", strValue: "Bintan Utara" },
  ];

  const tanjungpinang = [
    { id: 1, value: "Tanjung Pinang Timur", strValue: "Tanjung Pinang Timur" },
    { id: 2, value: "Tanjung Pinang Kota", strValue: "Tanjung Pinang Kota" },
  ];

  const kapal = [{ id: 1, value: "30", strValue: "30 Ton" }];

  const tipeKapal = [
    { id: 1, value: "Kapal Jaring", strValue: "Kapal Jaring" },
  ];

  const bahanKapal = [{ id: 1, value: "Bahan Kayu", strValue: "Bahan Kayu" }];

  const jumlahNelayanK30 = [
    { id: 1, value: "1", strValue: "1 Orang" },
    { id: 2, value: "2", strValue: "2 Orang" },
    { id: 3, value: "3", strValue: "3 Orang" },
    { id: 4, value: "4", strValue: "4 Orang" },
    { id: 5, value: "5", strValue: "5 Orang" },
    { id: 6, value: "6", strValue: "6 Orang" },
    { id: 7, value: "7", strValue: "7 Orang" },
    { id: 8, value: "8", strValue: "8 Orang" },
    { id: 9, value: "9", strValue: "9 Orang" },
    { id: 10, value: "10", strValue: "10 Orang" },
  ];
  const perjalananK30 = [
    { id: 1, value: "14", strValue: "14 Hari" },
    { id: 2, value: "28", strValue: "28 Hari" },
  ];

  let typeKecamatan = null;
  let typeJumlahNelayan = null;
  let typeLamaPerjalanan = null;
  let optionsKecamatan = null;
  let optionsJumlahNelayan = null;
  let optionsLamaPerjalanan = null;


  //conditional tempat
  if (pilihKota === "Bintan") {
    typeKecamatan = bintan;
  } else if (pilihKota === "Tanjung Pinang") {
    typeKecamatan = tanjungpinang;
  }

  //conditional jumlah nelayan dan lama perjalanan
  if (tipeKapal != "") {
    typeJumlahNelayan = jumlahNelayanK30;
    typeLamaPerjalanan = perjalananK30;
  }



  //Mapping option kecamatan
  if (typeKecamatan) {
    optionsKecamatan = typeKecamatan.map((item) => (
      <option key={item.id} id={item.id} value={item.value}>
        {item.strValue}
      </option>
    ));
  }

  //Mapping option jumlah nelayan
  if (typeJumlahNelayan) {
    optionsJumlahNelayan = typeJumlahNelayan.map((item) => (
      <option key={item.id} id={item.id} value={item.value}>
        {item.strValue}
      </option>
    ));
  }

  //mapping option lama perjalanan
  if (typeLamaPerjalanan) {
    optionsLamaPerjalanan = typeLamaPerjalanan.map((item) => (
      <option key={item.id} id={item.id} value={item.value}>
        {item.strValue}
      </option>
    ));
  }

  const createDataLogistik = () => {
    setKebutuhanEsBatu((0.57 * pilihPerjalanan).toFixed(1));
    setKebutuhanMinyak((37.5 * pilihPerjalanan).toFixed(1));
    setkebutuhanBeras((0.39 * pilihPerjalanan * pilihJumlahN).toFixed(1));
    setKebutuhanAir((20 * pilihPerjalanan * pilihJumlahN).toFixed(1));
    const uidClient = auth.currentUser.uid;
    return addDoc(collection(db, "client", uidClient, "datalogistik"), {
      kepalaNelayan: isiNama,
      alamatNelayan: isiAlamat,
      nomorNelayan: isiNomor,
      namaKapalNelayan: isiNamaKapal,
      kotaNelayan: pilihKota,
      kecamatanNelayan: pilihKecamatan,
      kapalNelayan: Number(pilihKapal),
      tipeKapalNelayan: String(pilihTipeKapal),
      bahanKapalNelayan: String(pilihBahanKapal),
      jumlahNelayan: Number(pilihJumlahN),
      perjalananNelayan: Number(pilihPerjalanan),
      logistikEsbBatu: Number((0.57 * pilihPerjalanan).toFixed(1)),
      logistikMinyak: Number((37.5 * pilihPerjalanan).toFixed(1)),
      logistikAirBersih: Number(
        (20 * pilihPerjalanan * pilihJumlahN).toFixed(1)
      ),
      logistikBeras: Number((0.39 * pilihPerjalanan * pilihJumlahN).toFixed(1)),
      waktuInput: serverTimestamp(),
    });
  };

  const Hitung = async (e) => {
    e.preventDefault();
    if (
      isiNama == "" ||
      isiAlamat == "" ||
      isiNomor == "" ||
      pilihKota == "" ||
      pilihKecamatan == "" ||
      isiNamaKapal == "" ||
      pilihKapal == "" ||
      pilihTipeKapal == "" ||
      pilihBahanKapal == "" ||
      pilihJumlahN == "" ||
      pilihPerjalanan == ""
    ) {
      alert("Isi Data Form Secara Lengkap dan Bener");
    } else {
      alert("Data Berhasil di Kalkulasi");
      await createDataLogistik();
      navigate("/data");
    }
  };

  return (
    <>
      <div className="sm:ml-64   bg-bg-auth bg-opacity-20  h-auto min-h-screen place-items-center flex justify-center px-4 sm:px-6 lg:px-8 ">
        <div
          data-aos="fade-up"
          className="bg-gray-900 max-w-lg w-full space-y-8 shadow-2xl rounded-3xl mt-32 mb-32 "
        >
          <div className="p-6 lg:p-10 ">
            <div>
              <h2 className="text-center"></h2>

              <h2 className="mt-2 text-center text-4xl font-extrabold text-gray-300">
                Form
              </h2>
              <h2 className=" mt-1 text-center text-3xl font-extrabold text-gray-300">
                Pengadaan Logistik
              </h2>
            </div>

            <form
              onSubmit={Hitung}
              className="mt-8 space-y-6"
              action="#"
              method="POST"
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block font-semibold text-white"
                  >
                    Nama Kepala Nelayan
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="placeholder:text-gray-600 mb-5 px-3 py-2  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Isi Nama Lengkap"
                    onChange={(e) => setIsiNama(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="street-address"
                    className="block font-semibold text-white"
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="number"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="placeholder:text-gray-600 mb-5 px-3 py-2  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Isi Nomor Telepon"
                    onChange={(e) => setIsiNomor(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="street-address"
                    className="block font-semibold text-white"
                  >
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="placeholder:text-gray-600 mb-5 px-3 py-2  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Isi Alamat Lengkap"
                    onChange={(e) => setIsiAlamat(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="kota"
                    className="blockß font-semibold text-white"
                  >
                    Kota
                  </label>
                  <select
                    id="kota"
                    name="kota"
                    autoComplete="kota"
                    className="placeholder:text-gray-600 mb-5 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                    onChange={(e) => setPilihKota(e.target.value)}
                    defaultValue="default"
                  >
                    <option value="default" disabled>
                      Pilih Kota
                    </option>
                    {kota.map((item) => (
                      <option key={item.id} id={item.id} value={item.value}>
                        {item.strValue}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="kecamatan"
                    className="block font-semibold text-white"
                  >
                    Kecamatan
                  </label>
                  <select
                    id="kecamatan"
                    name="kecamatan"
                    autoComplete="kecamatan"
                    className="mb-5 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                    defaultValue="default"
                    onChange={(e) => setPilihKecamatan(e.target.value)}
                  >
                    <option value="default" disabled>
                      Pilih Kecamatan
                    </option>
                    {optionsKecamatan}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="street-address"
                    className="block font-semibold text-white"
                  >
                    Nama Kapal
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="placeholder:text-gray-600 mb-5 px-3 py-2  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Isi Nama Kapal"
                    onChange={(e) => setIsiNamaKapal(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="kota"
                    className="blockß font-semibold text-white"
                  >
                    Tipe Kapal
                  </label>
                  <select
                    id="gt-kapal"
                    name="gt-kapal"
                    autoComplete="gt-kapal"
                    className="mb-5 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm  sm:text-sm"
                    defaultValue="default"
                    onChange={(e) => setPilihTipeKapal(e.target.value)}
                  >
                    <option value="default" disabled>
                      Pilih Tipe Kapal
                    </option>
                    {tipeKapal.map((item) => (
                      <option key={item.id} id={item.id} value={item.value}>
                        {item.strValue}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="kota"
                    className="blockß font-semibold text-white"
                  >
                    Bahan Kapal
                  </label>
                  <select
                    id="gt-kapal"
                    name="gt-kapal"
                    autoComplete="gt-kapal"
                    className="mb-5 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm  sm:text-sm"
                    defaultValue="default"
                    onChange={(e) => setPilihBahanKapal(e.target.value)}
                  >
                    <option value="default" disabled>
                      Pilih Bahan Kapal
                    </option>
                    {bahanKapal.map((item) => (
                      <option key={item.id} id={item.id} value={item.value}>
                        {item.strValue}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="kota"
                    className="blockß font-semibold text-white"
                  >
                    Berat Kapal
                  </label>
                  <select
                    id="gt-kapal"
                    name="gt-kapal"
                    autoComplete="gt-kapal"
                    className="mb-5 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm  sm:text-sm"
                    defaultValue="default"
                    onChange={(e) => setPilihKapal(e.target.value)}
                  >
                    <option value="default" disabled>
                      Pilih GT Kapal
                    </option>
                    {kapal.map((item) => (
                      <option key={item.id} id={item.id} value={item.value}>
                        {item.strValue}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="jumlah-nelayan"
                    className="blockß font-semibold text-white"
                  >
                    Jumlah Nelayan
                  </label>
                  <select
                    id="jumlah-nelayan"
                    name="jumlah-nelayan"
                    autoComplete="jumlah-nelayan"
                    className="mb-5 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                    defaultValue="default"
                    onChange={(e) => setPilihJumlahN(e.target.value)}
                  >
                    <option value="default" disabled>
                      Pilih Jumlah Nelayan
                    </option>
                    {optionsJumlahNelayan}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="perjalanan"
                    className="blockß font-semibold text-white"
                  >
                    Lama Perjalanan
                  </label>
                  <select
                    id="perjalanan"
                    name="perjalanan"
                    autoComplete="perjalanan"
                    className="mb-5 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm  sm:text-sm"
                    defaultValue="default"
                    onChange={(e) => setPilihPerjalanan(e.target.value)}
                  >
                    <option value="default" disabled>
                      Pilih Lama Perjalanan
                    </option>
                    {optionsLamaPerjalanan}
                  </select>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 "
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <a
                      className="h-5 w-5 text-blue-900 group-hover:text-blue-800"
                      aria-hidden="true"
                    />
                  </span>
                  Hitung
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
