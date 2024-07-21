import axios from "axios";
import * as cheerio from "cheerio";

const sourceUrl = 'https://superheroapi.com/ids.html';
const query = 'tbody tr td';

/**
 * Gets all the super hero ids by scraping the tables on a page
 * @returns {string[]} - An array with all the super hero ids.
 * @throws {Error} if the connection to the page fails or if the table meant to be scraped is not found
 */
const getAllIds = async () => {
  try {
    const ids: string[] = []
    const response = await axios.get(sourceUrl);
    const selector = cheerio.load(response.data);
    const table = selector('table');
    if (!table) throw new Error('Table not found on Source URL, check the page to be scraped');

    table.find(query).each((i,row) => {
      if (i%2 === 0) ids.push(selector(row).text())
    });

    return ids;
  } catch (error) {
    const err = error as Error
    console.error(err)
    throw err;
  }
};

export { getAllIds };