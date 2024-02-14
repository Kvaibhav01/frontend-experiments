import { FireIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

function App() {
  return (
    <div className="h-screen w-full bg-neutral-900 to-neutral-50">
      <Board />
    </div>
  );
}

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        headingColor="text-neutral-200"
        column="backlog"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Todo"
        headingColor="text-yellow-200"
        column="todo"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Doing"
        headingColor="text-blue-200"
        column="doing"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Done"
        headingColor="text-emerald-200"
        column="done"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};


//? `setCards` and `setActive` should be resolved after adding more code
const Column = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);
  const filteredCards = cards.filter((card) => card.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}
      >
        {filteredCards.map((card: any) => {
          return <Card key={card.id} {...card} />;
        })}
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable="true"
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
      {/* <DropIndicator beforeId={-1} column={column} /> */}
      {/* <AddCard column={column} setCards={setCards} /> */}
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${active ? "border-red-800 bg-red-800/20 text-red-500" : "border-neutral-500 bg-neutral-500/20 text-neutral-500"}`}
    >
      {active ? (
        <FireIcon className="w-6 animate-bounce" />
      ) : (
        <TrashIcon className="w-6" />
      )}
    </div>
  );
};

type AddCardProps = {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent from adding empty cards
    if (!text.trim().length) return;

    const newCard = {
      id: Math.random().toString(),
      title: text.trim(),
      column,
    };
    setCards((cards) => [...cards, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <>
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-50"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add</span>
                <PlusIcon className="w-4" />
              </button>
            </div>
          </form>
        </>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
          <PlusIcon className="w-4" />
        </button>
      )}
    </>
  );
};

type ColumnType = "backlog" | "todo" | "doing" | "done";
type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

const DEFAULT_CARDS: CardType[] = [
  // Backlog
  {
    title: "Look for a bug",
    id: "1",
    column: "backlog",
  },
  {
    title: "SOX Complaint checklist",
    id: "2",
    column: "backlog",
  },
  // Todo
  {
    title: "Update user documentation",
    id: "3",
    column: "todo",
  },
  {
    title: "Review pull requests",
    id: "4",
    column: "todo",
  },
  {
    title: "Prepare for sprint planning",
    id: "5",
    column: "todo",
  },
  {
    title: "Refactor authentication service",
    id: "6",
    column: "todo",
  },
  // Doing
  {
    title: "Implement new feature",
    id: "7",
    column: "doing",
  },
  {
    title: "Run integration tests",
    id: "8",
    column: "doing",
  },
  {
    title: "Debug performance issue",
    id: "9",
    column: "doing",
  },
  {
    title: "Optimize database queries",
    id: "10",
    column: "doing",
  },
  // Done
  {
    title: "Release version 1.0.0",
    id: "11",
    column: "done",
  },
  {
    title: "Write release notes",
    id: "12",
    column: "done",
  },
  {
    title: "Deploy to production",
    id: "13",
    column: "done",
  },
  {
    title: "Celebrate successful release",
    id: "14",
    column: "done",
  },
];

export default App;
