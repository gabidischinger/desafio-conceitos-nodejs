const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => id ===  repository.id);
  

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'repository not found.' });
  }

  const {likes} = repositories[repositoryIndex];

  const alteredRepository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = alteredRepository;
  return response.json(alteredRepository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => id ===  repository.id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'repository not found.' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => id ===  repository.id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'repository not found.' });
  }

  const {title, url, techs, likes} = repositories[repositoryIndex]; 
  const addedLike = likes + 1;

  const alteredRepository = {
    id,
    title,
    url,
    techs,
    likes: addedLike
  }

  repositories[repositoryIndex] = alteredRepository;
  return response.json(alteredRepository);

});

module.exports = app;
