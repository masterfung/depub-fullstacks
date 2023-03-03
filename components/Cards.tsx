import Card from "./Card";
import { CardsType } from "../types/app";

const Cards = ({ cards }: { cards: CardsType }) => {
  return (
    <div className="flex flex-wrap">
      {cards.map((card, index: number) => (
        <div key={index} className="w-full md:w-1/3 p-2">
          <Card data={card} />
        </div>
      ))}
    </div>
  );
};

export default Cards;
