export interface HeroBaseData {
    id: string,
    name: string,
}

interface BaseResponse {
    response: string,
    id: string,
    name: string,
}

interface PowerstatsData {
    intelligence: string,
    strength: string,
    speed: string,
    durability: string,
    power: string,
    combat: string,
}

interface BiographyData {
    "full-name": string,
    "alter-egos": string,
    aliases: string[],
    "place-of-birth": string,
    "first-appearance": string,
    publisher: string,
    alignment: string,
}

interface AppearanceData {
    gender: string,
    race: string,
    height: string[],
    weight: string[],
    "eye-color": string,
    "hair-color": string,
}

interface WorkData {
    occupation: string,
    base: string,
}

interface ConnectionsData {
    "group-affiliation": string,
    relatives: string,
}

interface ImageData {
    url: string,
}

export interface AllDataResponse extends BaseResponse {
    powerstats: PowerstatsData,
    biography: BiographyData,
    appearance: AppearanceData,
    work: WorkData,
    connections: ConnectionsData,
    image: ImageData,
}