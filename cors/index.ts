import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import { getAllIds } from './services/hero-data-scrapper';
import { getAllDataById, getApperanceDataById, getImageId } from './services/hero-data-api';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Get all ids, page scraper
app.get('/all-ids', async (request: Request, response: Response) => {
  const baseData = await getAllIds();

  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.status(200).send(baseData);
});

// Get all data by id, api request
app.get('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;
  const data = await getAllDataById(id);

  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.status(200).send(data);
});

// get apperance data by id
app.get('/:id/apperance', async (request: Request, response: Response) => {
  const id = request.params.id;
  const data = await getApperanceDataById(id);

  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.status(200).send(data);
})

// get miage data by id
app.get('/:id/image', async (request: Request, response: Response) => {
  const id = request.params.id;
  const data = await getImageId(id);

  response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.status(200).send(data);
})

// Main route
app.get('/', (request: Request, response: Response) => { 
  response.status(200).send('Willkommen');
}); 

// Unhandled routes
app.get('*', (request: Request, response: Response) => { 
  response.status(200).send('Whoops!'); 
}); 

app.listen(PORT, () => { 
  console.log('Server running at PORT: ', PORT); 
}).on('error', (error) => {
  throw new Error(error.message);
});