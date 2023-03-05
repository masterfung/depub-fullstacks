import React, { ReactNode } from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="isolate bg-white">
      <Head>
        <title>FreePub</title>
      </Head>

      <Navbar />
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto py-3 px-4 flex justify-center align-middle h-7">
          <p>Welcome to FreePub! Learn to use our platform</p>
          <a
            href="https://loving-elderberry-8fc.notion.site/FreePub-055847bfad2b4ad3b1fb36e72fa2a0d3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-100 ml-3 align-middle"
          >
            Guide
          </a>
        </div>
      </div>
      <main className="p-2">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
