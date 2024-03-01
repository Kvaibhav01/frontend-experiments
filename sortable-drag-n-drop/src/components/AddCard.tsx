import { PlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { AddCardProps } from "../utils/types";

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
          <motion.form layout onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Add a new task..."
              className="w-full rounded border border-orange-400 bg-orange-400/10 p-3 text-sm text-zinc-100 placeholder-orange-100 focus:outline-0"
            />
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-50"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
              >
                <span>Add</span>
                <PlusIcon className="w-4" />
              </button>
            </div>
          </motion.form>
        </>
      ) : (
        <motion.button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1 py-1 text-xs text-zinc-400 transition-colors hover:text-zinc-100"
        >
          <span>Add Card</span>
          <PlusIcon className="w-4" />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
