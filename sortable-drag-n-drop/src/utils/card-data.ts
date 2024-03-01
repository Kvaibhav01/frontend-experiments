type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

type ColumnType = "backlog" | "todo" | "doing" | "done";

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

export default DEFAULT_CARDS;
