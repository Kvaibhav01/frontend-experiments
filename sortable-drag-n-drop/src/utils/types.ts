import { Dispatch, SetStateAction } from "react";

export interface ColumnProps {
  title: string;
  headingColor: string;
  column: string;
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
  isSelected?: boolean;
  onAddClick?: (column: string) => void;
}

export type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

export type ColumnType = "backlog" | "todo" | "doing" | "done";

export type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

export type CardProps = CardType & {
  handleDragStart: Function;
};

export type AddCardProps = {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  onAddClick?: () => void;
};
