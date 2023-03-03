import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../static/img/beer.png";
import Image from "next/image";
import Web3AuthConnector from "./Web3AuthConnector";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";

const navigation = [
  { id: 1, name: "Published", href: "/" },
  { id: 2, name: "Pending", href: "/pending" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { cid } = router.query;
  console.log("Router", router.pathname);

  return (
    <div className="isolate bg-white">
      <div className="lg:px-8 p-3">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/">
              <a href="/" className="-m-1.5 p-1.5 flex items-center">
                <Image src={logo} alt="FreePub Logo" height="30" width="30" />
                <span className="pl-2">
                  <b>FreePub</b>
                </span>
              </a>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={`mx-4 font-medium hover:text-blue-600 ${
                    router.pathname === item.href
                      ? "text-blue-900 border-b-2 border-blue-800 pb-2"
                      : "text-blue-500"
                  }`}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Web3AuthConnector />
            {/* will need to update the above to show connected vs published content */}
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <Link href="/">
                <a href="/" className="-m-1.5 p-1.5 flex items-center">
                  <Image src={logo} alt="FreePub Logo" height="30" width="30" />
                  <span className="pl-2">
                    <b>FreePub</b>
                  </span>
                </a>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
