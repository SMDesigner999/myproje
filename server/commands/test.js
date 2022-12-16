require("dotenv").config();
const { Markup } = require("telegraf");

const test = async (ctx) => {
  console.log(ctx.message.from);

  const { id, first_name: first, last_name: last } = ctx.message.from;

  return ctx
    .reply("Привет Мирабзал", {
      caption: "Caption",
      parse_mode: "Markdown",
      ...Markup.inlineKeyboard([
        Markup.button.webApp("Мирабзал", process.env.URL_SITE),
      ]),
    })
    .catch((error) => {
      console.log("error test", error);
    });
};

module.exports = (bot) => {
  // bot.command("test", test);
  bot.newCommand({ command: "buy", description: "Магазин подписчиков" }, test);
};
