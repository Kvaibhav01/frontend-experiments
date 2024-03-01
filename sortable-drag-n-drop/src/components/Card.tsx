import { motion } from "framer-motion";
import DropIndicator from "./DropIndicator";
import { CardProps } from "../utils/types";

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-zinc-700 bg-zinc-800 p-3 transition-colors hover:bg-zinc-700 active:cursor-grabbing active:bg-zinc-600"
      >
        <p className="text-sm text-zinc-100">{title}</p>
      </motion.div>
    </>
  );
};

export default Card;
