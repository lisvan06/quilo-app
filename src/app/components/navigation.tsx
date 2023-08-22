"use client";

import { useSession } from "next-auth/react";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationBar() {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  let auth = status === "authenticated" ? true : false;

  const userMenu = [    
    {
      id: "menuDashBoard",
      name: "Dashboard",
      href: "/dashboard",
    },{      
      id: "menuProfile",
      name: "Profile",
      href: "/dashboard/profile",
    },
    {
      id: "menuProducts",
      name: "Products",
      href: "/dashboard/products",
    },
    {
      id: "menuLogout",
      name: "Logout",
      href: "/api/auth/signout",
    }
  ];

  const navigation = [
    // Not Authenticated
    {
      name: "Home",
      id: "navhome",
      href: "/",
      current: pathname == "/" ? true : false,
      authenticated: false,
    },
    {
      name: "Dashboard",
      id: "navdb",
      href: "/dashboard",
      current: pathname == "/dashboard" ? true : false,
      authenticated: true,
    },
    {
      name: "Profile",
      id: "navprofile",
      href: "/dashboard/profile",
      current: pathname == "/dashboard/profile" ? true : false,
      authenticated: true,
    },
    {
      name: "Products",
      id: "navproducts",
      href: "/dashboard/products",
      current: pathname == "/dashboard/products" ? true : false,
      authenticated: true,
    },
    {
      name: "About",
      id: "navabout",
      href: "/about",
      current: pathname == "/about" ? true : false,
      authenticated: false,
    },
    {
      name: "Contact",
      id: "navcontact",
      href: "/contact",
      current: pathname == "/contact" ? true : false,
      authenticated: false,
    },
    // {
    //   name: "Help",
    //   id: "navhelp",
    //   href: "/help",
    //   current: pathname == "/help" ? true : false,
    //   authenticated: false,
    // },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  id="db123"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) =>
                      auth && item.authenticated ? (
                        <a
                          id={item.id}
                          key={item.id}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ) : !item.authenticated ? (
                        <a
                          id={item.id}
                          key={item.id}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!session ? (
                  <>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex flex-1 items-center mr-3">
                        <a
                          href="/login"
                          className="hover:bg-gray-900 text-white  bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Log In
                        </a>
                      </div>

                      <a
                        href="/register"
                        className="hover:bg-gray-900 text-white  bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Register
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2  focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <span className="text-xs m-2">
                            {session?.user?.email}
                          </span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="/images.png"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
                        {userMenu.map((item)=> 

                            (
                              <Menu.Item key={item.id+1}>
                            {({ active }) => (
                              <a
                                id={item.id}
                                key={item.id}
                                href={item.href}
                                className={classNames(
                                  active ? "" : "",
                                  "block px-4 py-2 text-sm text-gray-700 dark:text-white dark:hover:bg-gray-900"
                                )}
                              >
                                {item.name}
                              </a>
                            )}                         
                          </Menu.Item>
                            )
                        )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) =>
                auth ? (
                  <Disclosure.Button
                    as="a"
                    id={item.id}                    
                    key={item.id}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ) : !item.authenticated ? (
                  <Disclosure.Button  
                    as="a"
                    id={item.id}                
                    key={item.id}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ) : null
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
