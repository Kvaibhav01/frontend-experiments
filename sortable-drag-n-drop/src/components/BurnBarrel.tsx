import { FireIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";
import { CardType } from "../utils/types";

const BurnBarrel = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer?.getData("cardId");
    setCards((card) => card.filter((c) => c.id !== cardId));
    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-11 grid h-60 w-60 shrink-0 place-content-center rounded border ${active ? "border-red-800 bg-red-800/20 text-red-500" : "border-zinc-500 bg-zinc-500/20 text-zinc-500"}`}
    >
      {active ? (
        <div className="flex flex-col items-center gap-1">
          <FireIcon className="w-6 animate-bounce" />
          <p className="font-medium">Release to say goodbye</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <TrashIcon className="w-6" />
          <p className="font-medium">Burn task here</p>
        </div>
      )}
    </div>
  );
};

export default BurnBarrel;
