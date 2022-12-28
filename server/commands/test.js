require("dotenv").config();
const { Markup } = require("telegraf");
const models = require("../db/models");
const client = models.client;
const test = async (ctx) => {
  console.log(ctx.message.from);
  const { id, first_name: first, last_name: last } = ctx.message.from;
  const clientItem = await client.findOne({ where: { chatId: String(id) } });
  if (!clientItem) {
    await client.create({
      first,
      last,
      chatId: String(id),
    });
  } else {
    await client.update(
      {
        first,
        last,
      },
      { where: { chatId: id } }
    );
  }
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
