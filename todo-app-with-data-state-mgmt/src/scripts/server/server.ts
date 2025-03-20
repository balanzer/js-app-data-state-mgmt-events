import { Model, Registry, Server } from "miragejs";
import { ModelDefinition } from "miragejs/-types";

type Movie = {
  name: string;
  year: number;
};

const MovieModel: ModelDefinition<Movie> = Model.extend({});

type AppRegistry = Registry<
  {
    movie: typeof MovieModel;
  },
  {
    movies: typeof MovieModel;
  }
>;

new Server<AppRegistry>({
  models: {
    movie: MovieModel,
  },

  routes() {
    this.namespace = "api";

    this.get("/movies", (schema, request) => {
      return schema.db.movies.all();
    });
  },

  seeds(server: Server<AppRegistry>) {
    server.create("movie", { name: "Inception", year: 2010 });
    server.create("movie", { name: "Interstellar", year: 2014 });
    server.create("movie", { name: "Dunkirk", year: 2017 });
  },
});
