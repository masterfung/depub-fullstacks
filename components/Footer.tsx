import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black-100 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <ul className="flex justify-center sm:justify-start space-x-6">
              <li>
                <Link href="/learn">Learn</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-auto text-center sm:text-right mt-4 sm:mt-0">
            <p>
              Made with{" "}
              <span className="text-red-500">
                <FontAwesomeIcon icon={faHeart} />
              </span>{" "}
              by FreePub &copy; {currentYear}
            </p>
            <a
              href="https://www.flaticon.com/free-icons/beer"
              target="_blank"
              title="beer icons"
              rel="noreferrer"
            >
              Beer icons created by Freepik - Flaticon
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
