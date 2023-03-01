import Image from "next/image";
import logo from '../static/img/beer.png';
import { CardType } from "../types/app";
import tinygradient from 'tinygradient';

const Card = ({data}: {data: CardType}) => {
    const randomGradient = tinygradient('#fad687', '#fee1a1', '#66f8fa', '#88f5f6');
    const css = randomGradient.css();
    // we are still missing upvotes and quoted by
      
    const gradientClass = `gradient-${randomGradient}`;
      
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg p-6 shadow-lg hover:scale-105 transition duration-300 ease-in-out" style={{background: css}}>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <Image src={logo} alt="Card Image" height="80" width="80" className="rounded-lg"/>
            </div>
            <div className="w-full md:flex-1 md:pl-6">
                <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
                <p className="text-gray-600 mb-4">{data.description}</p>
                <div className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">{data.author}</p>
                <span className="bg-gray-200 text-gray-700 rounded-lg px-2 py-1 text-sm font-medium">{data.version}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;