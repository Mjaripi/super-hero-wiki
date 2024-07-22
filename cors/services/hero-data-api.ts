import axios from 'axios';
import https from 'https'
import { AllDataResponse, ImageResponse, AppearanceResponse } from './hero-data-api.types'

const baseUrl = 'https://superheroapi.com/api/';

/**
 * Builds and request the API based on the path given
 * @param {string} path - The api path to be requested
 * @returns {Promise<object>} - The requested object from the path
 */
const superHeroClient = async (path: string) => {
    try {
        if (!process.env.SHTOKEN) throw new Error('API token not found')
        const url = `${baseUrl}${process.env.SHTOKEN}${path}`
        
        const response = await axios.get(url, { timeout: 3000, httpsAgent: new https.Agent({ keepAlive: true })});
        console.log(response)
        const data = await response.data;
        console.log(path)
        
        return data;
    } catch (error) {
        const err = error as Error;
        console.error(err.message)
    }
};

/**
 * Gets all the super hero data by id from the api 
 * @param {tring} id - Super hero id to be searched on the client
 * @returns {Promise<object>} - All the super hero data
 */
const getAllDataById = async (id: string) => {
    const path = `/${id}`;
    const data = await superHeroClient(path) as AllDataResponse

    return data;
};

/**
 * Gets the super hero apperance data by id from the api
 * @param {string} id - Super hero id to be searched on the client
 * @returns {Promise<object>} - The super hero apereance data
 */
const getApperanceDataById = async (id: string) => {
    const path = `/${id}/appearance`;
    const foundAppearanceData = await superHeroClient(path) as AppearanceResponse

    return foundAppearanceData;
};

/**
 * Gets the super hero image by id from the api
 * @param {string} id - Super hero id to be searched on the client
 * @returns {Promise<object>} - The super hero image if exists
 */
const getImageId = async (id: string) => {
    const path = `/${id}/image`;
    const foundImage = await superHeroClient(path) as ImageResponse

    return foundImage;
};

export { getAllDataById, getApperanceDataById, getImageId }