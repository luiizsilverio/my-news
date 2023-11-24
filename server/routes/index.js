import booksRouter from "./booksRoutes.js";

const routes = (app) => {

  app.route("/").get((req, res) => {
    res.send("My-Books API");
  })

  app.use(
    booksRouter,
  )

  app.route("*").get((req, res) => {
    return res.sendStatus(404);
  })
  
}

export default routes;
