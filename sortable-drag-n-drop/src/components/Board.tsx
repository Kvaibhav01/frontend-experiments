import { useState } from "react";
import Column from "./Column";
import BurnBarrel from "./BurnBarrel";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { CardType } from "../utils/types";
// import DEFAULT_CARDS from "../utils/card-data";

const Board = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  const handleAddTask = (column: string) => {
    const addButton = document.querySelector(
      `[data-column="${column}"] button[role="add-card"]`,
    );
    if (addButton) {
      (addButton as HTMLButtonElement).click();
    }
  };

  const { selectedColumn } = useKeyboardShortcuts({
    onAddTask: handleAddTask,
    onMoveTaskLeft: () => {},
    onMoveTaskRight: () => {},
    onDeleteTask: () => {},
  });

  // Use this code for preserving state using localStorage:
  // const [hasChecked, setHasChecked] = useState(false);

  // useEffect(() => {
  //   hasChecked && localStorage.setItem("cards", JSON.stringify(cards));
  // }, [cards]);

  // useEffect(() => {
  //   const storedCards = localStorage.getItem("cards");
  //   setCards(storedCards ? JSON.parse(storedCards) : []);
  //   setHasChecked(true);
  // }, []);

  return (
    <div className="flex h-full w-full justify-center gap-5 p-16">
      <Column
        title="Backlog"
        headingColor="text-zinc-300"
        column="backlog"
        cards={cards}
        setCards={setCards}
        isSelected={selectedColumn === "backlog"}
        onAddClick={handleAddTask}
      />
      <Column
        title="Todo"
        headingColor="text-lime-300"
        column="todo"
        cards={cards}
        setCards={setCards}
        isSelected={selectedColumn === "todo"}
        onAddClick={handleAddTask}
      />
      <Column
        title="Doing"
        headingColor="text-sky-300"
        column="doing"
        cards={cards}
        setCards={setCards}
        isSelected={selectedColumn === "doing"}
        onAddClick={handleAddTask}
      />
      <Column
        title="Done"
        headingColor="text-fuchsia-300"
        column="done"
        cards={cards}
        setCards={setCards}
        isSelected={selectedColumn === "done"}
        onAddClick={handleAddTask}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

export default Board;
