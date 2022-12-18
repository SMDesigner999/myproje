const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * renameColumn(goodIdId) => "compositionOrders"
 *
 */

const info = {
  revision: 3,
  name: "myMI",
  created: "2022-12-17T20:23:13.853Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["compositionOrders", "goodIdId", "goodId"],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["compositionOrders", "goodId", "goodIdId"],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
