import express, { Request, Response } from "express";
import dotenv from "dotenv";

import { getAllIds } from './services/hero-data-scrapper';
import { getDataById } from './services/hero-data-api';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Get all ids, page scraper
app.get("/get-all-ids", async (request: Request, response: Response) => {
  const ids = await getAllIds();

  response.set('Access-Control-Allow-Origin', '*');
  response.status(200).send(ids);
});

// Get by id, api request
app.get("/get-by-id/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  const data = await getDataById(id)

  response.set('Access-Control-Allow-Origin', '*');
  response.status(200).send(data);
});

// Main route
app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Willkommen");
}); 

// Unhandled routes
app.get("*", (request: Request, response: Response) => { 
  response.status(200).send("Whoops!"); 
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});