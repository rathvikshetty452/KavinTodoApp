import type { ISearchBoxStyles } from "@fluentui/react";

  export const searchBoxStyles: Partial<ISearchBoxStyles> = {
    root: { width: "100%", margin:"5px auto" },
  };
  export const initialitem=[
    {
      id: 1,
      taskName: "Creating new task",
      taskDesc: "Creating new task for TM",
      status: "Pending",
      date: new Date().toISOString(),
    },
    {
      id: 2,
      taskName: "Design UI",
      taskDesc: "Building the home page layout",
      status: "inprogress",
      date: new Date().toISOString(),
    },
    {
      id: 3,
      taskName: "Submit report",
      taskDesc: "Final report submission to client",
      status: "Completed",
      date: new Date().toISOString(),
    },
  ];