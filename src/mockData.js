const chores = [
  {
    id: 1,
    chore: "Polish silverware",
    description: "Inside trophy cabinet",
    userId: 1,
    createdAt: "2020-10-05T14:41:28.251+00:00",
  },
  {
    id: 2,
    chore: "Loaded dishwasher",
    description: "",
    userId: 1,
    createdAt: "2020-10-06T15:41:28.251+00:00",
  },
  {
    id: 3,
    chore: "Made bed",
    description: "Fresh sheets",
    userId: 1,
    createdAt: "2020-10-10T14:41:28.251+00:00",
  },
  {
    id: 4,
    chore: "Vacuumed",
    description: "Living room",
    userId: 2,
    createdAt: "2020-10-05T10:30:28.251+00:00",
  },
  {
    id: 5,
    chore: "Emptied recycling",
    description: "",
    userId: 1,
    createdAt: "2020-10-12T14:41:28.251+00:00",
  },
  {
    id: 6,
    chore: "Dusting",
    description: "",
    userId: 2,
    createdAt: "2020-10-20T14:41:28.251+00:00",
  },
];

const users = [
  { id: 1, name: "Nick Baumer", totalChores: 4 },
  { id: 2, name: "John Smith", totalChores: 2 },
  { id: 3, name: "Amy Anderson", totalChores: 0 },
];

const currentUser = 1;

const newChore = {
  id: null,
  chore: "",
  description: "",
  userId: "",
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newChore,
  chores,
  users,
  currentUser,
};
