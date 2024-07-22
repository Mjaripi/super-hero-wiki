import axios from "axios";
import https from 'https'
import * as cheerio from "cheerio";
import { HeroBaseData } from './hero-data-scrapper.types'

const sourceUrl = 'https://superheroapi.com/ids.html';
const tableNotFoundMsg = 'Table not found on Source URL, check the page to be scraped';
const query = 'tbody tr td';

/**
 * Gets all the super hero ids by scraping the tables on a page
 * @returns {string[]} - An array with all the super hero ids.
 * @throws {Error} if the connection to the page fails or if the table meant to be scraped is not found
 */
const getAllIds = async () => {
  try {
    const response = await axios.get(sourceUrl, { timeout: 3000, httpsAgent: new https.Agent({ keepAlive: true }) });
    const selector = cheerio.load(response.data);
    const table = selector('table');
    if (!table) throw new Error(tableNotFoundMsg);

    const foundData: HeroBaseData[] = []
    const foundElements = table.find(query);

    foundElements.each((i, row) => {
      if (i % 2 === 0) {
        foundData.push({
          id: selector(row).text(),
          name: selector(foundElements[i + 1]).text(),
        })
      }
    });

    return foundData;
  } catch (error) {
    const err = error as Error
    console.error(err)
  }
};

export { getAllIds };