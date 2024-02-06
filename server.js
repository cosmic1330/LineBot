const app = require("./app");

const port = process.env.PORT || 7676;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
