import axios from 'axios';

const baseUrl = 'https://superheroapi.com/api/';

/**
 * Get the super hero data by id from the api 
 * @param {tring} id - Super hero id to be searched
 * @returns {object} - The super hero data
 * @throws {Error} - if the api token is not found on env file or if the connection to the api fails
 */
const getDataById = async (id: string) => {
    try {
        if (!process.env.SHTOKEN) throw new Error('API token not found')

        const url = `${baseUrl}${process.env.SHTOKEN}/${id}`
        const response = await axios.get(url)
        const data = await response.data;
        
        return data;
    } catch (error) {
        const err = error as Error;
        console.error(err)
        throw err
    }
};

export { getDataById }