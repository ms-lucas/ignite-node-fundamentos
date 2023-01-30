import { randomUUID } from "node:crypto";
import { Database } from "./database/database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const { search } = request.query;

      return response.end(
        JSON.stringify(
          database.select("users", { name: search, email: search })
        )
      );
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (request, response) => {
      const { name, email } = request.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return response.writeHead(201).end(JSON.stringify(user));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      database.delete("users", id);

      return response.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const { name, email } = request.body;

      database.update("users", id, { name, email });

      return response.writeHead(204).end();
    },
  },
];
