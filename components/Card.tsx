/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { CardType } from "../types/app";
import Link from "next/link";

const Card = ({ data }: { data: CardType }) => {
  return (
    <Link href={`post/${data.id.toString()}`}>
      <div className="flex flex-col md:flex-row bg-white rounded-lg p-6 shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
        <div className="w-full md:flex-1 md:pl-6">
          <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
          <p className="text-gray-600 mb-4">{data.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-gray-700 font-medium">{data.author}</p>
            <span className="bg-gray-200 text-gray-700 rounded-lg px-2 py-1 text-sm font-medium">
              {`v${data.version}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
