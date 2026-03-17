import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface KeyboardShortcutsProps {
  onAddTask: (column: string) => void;
  onMoveTaskLeft: () => void;
  onMoveTaskRight: () => void;
  onDeleteTask: () => void;
}

export const useKeyboardShortcuts = ({
  onAddTask,
  onDeleteTask,
  onMoveTaskLeft,
  onMoveTaskRight,
}: KeyboardShortcutsProps) => {
  const [selectedColumn, setSelectedColumn] = useState("backlog");

  useHotkeys(
    "enter, return",
    (e) => {
      e.preventDefault();
      console.log("Enter key pressed");

      onAddTask(selectedColumn);
    },
    {
      description: "Add new task",
      enableOnFormTags: true,
      preventDefault: true,
    },
  );

  useHotkeys(
    "left",
    (e) => {
      e.preventDefault();
      const columns = ["backlog", "todo", "doing", "done"];
      const currentIndex = columns.indexOf(selectedColumn);
      if (currentIndex > 0) {
        setSelectedColumn(columns[currentIndex - 1]);
      }
    },
    { description: "Move selection left" },
  );

  useHotkeys(
    "right",
    (e) => {
      e.preventDefault();
      const columns = ["backlog", "todo", "doing", "done"];
      const currentIndex = columns.indexOf(selectedColumn);
      if (currentIndex < columns.length - 1) {
        setSelectedColumn(columns[currentIndex + 1]);
      }
    },
    { description: "Move selection right" },
  );

  useHotkeys(
    "delete",
    (e) => {
      e.preventDefault();
      onDeleteTask();
    },
    { description: "Delete task" },
  );

  return { selectedColumn };
};
