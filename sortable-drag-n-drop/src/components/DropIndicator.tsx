import { DropIndicatorProps } from "../utils/types";

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-1 w-full rounded bg-orange-400 opacity-0"
    />
  );
};

export default DropIndicator;
