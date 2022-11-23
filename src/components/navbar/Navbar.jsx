import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../assets/database/AuthContext';


import SmSideNav from '../sidenav/SmSideNav';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
      try {
      await logout();
      navigate('/masukakun');
      console.log('You are logged out')
      } catch (e) {
      console.log(e.message);
  }
}
  return (
    <>

    <Disclosure as="nav" className="visible sm:invisible fixed z-20 w-full bg-gray-800 ">
      {({ open }) => (
        <>
          <div className="w-full mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                    <a href="#" aria-label="logo" className="font-sans font-extrabold font text-4xl bg-clip-text bg-gradient-to-br from-blue-700 to-cyan-200 text-transparent">
                    ASLAN
                    </a>
                  
                </div>
               
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
              <SmSideNav/>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  </>
  )
}
