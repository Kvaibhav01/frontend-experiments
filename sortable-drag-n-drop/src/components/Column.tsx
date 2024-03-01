import { useState } from "react";
import { CardType, ColumnProps } from "../utils/types";
import AddCard from "./AddCard";
import Card from "./Card";
import DropIndicator from "./DropIndicator";

const Column = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const filteredCards = cards.filter((card) => card.column === column);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer?.setData("cardId", card.id);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e: DragEvent) => {
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer?.getData("cardId");
    const indicators = getIndicators() as HTMLElement[];
    const { element } = getNearestIndicator(e, indicators);
    // Nearest card we are hovering. "-1" is the default signifying end of the card list
    const before = element.dataset.before || "-1";

    // If we are not hovering over the same card that we want to drag/drop i.e. true
    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((card) => card.id === cardId);

      if (!cardToTransfer) {
        return;
      }

      cardToTransfer = { ...cardToTransfer, column };
      copy = copy.filter((card) => card.id !== cardId);

      const moveToBack = before === "-1";
      if (moveToBack) {
        // Push it to the end of the array
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      setCards(copy);
    }
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators() as HTMLElement[];
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    (el.element as HTMLElement).style.opacity = "1";
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const clearHighlights = (elements?: HTMLElement[]) => {
    const indicators = elements || getIndicators();
    indicators.forEach((el) => (el.style.opacity = "0"));
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    // A buffer of 50px for the topmost card so we can easily drag it
    const DISTANCE_OFFSET = 50;

    const element = indicators.reduce(
      // Get position of indicator on the page
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      // Default values
      {
        offset: Number.NEGATIVE_INFINITY,
        // Last element in the array
        element: indicators[indicators.length - 1],
      },
    );

    return element;
  };

  return (
    <div className="w-64 shrink-0">
      <div className="mb-4 flex items-center gap-2">
        <h3 className={`font-medium ${headingColor}`}>{title} →</h3>
        <p className="rounded text-sm text-zinc-300">{filteredCards.length}</p>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${active ? "bg-zinc-800/50" : "bg-zinc-800/0"}`}
      >
        {filteredCards.map((card: any) => {
          return (
            <Card key={card.id} {...card} handleDragStart={handleDragStart} />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;
