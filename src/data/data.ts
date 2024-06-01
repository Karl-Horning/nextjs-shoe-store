import { readFileSync } from "fs";
import path from "path";

/**
 * Represents a shoe.
 *
 * @typedef {Object} Shoe
 * @property {string} ShoeId - The unique identifier of the shoe.
 * @property {string} Brand - The brand of the shoe.
 * @property {string} Model - The model of the shoe.
 * @property {string} Price - The price of the shoe.
 * @property {string} Image - The image filename of the shoe.
 * @property {string[]} AvailableSizes - The available sizes of the shoe.
 */
export interface Shoe {
    ShoeId: string;
    Brand: string;
    Model: string;
    Price: string;
    Image: string;
    AvailableSizes: string[];
}

/**
 * Fetches all shoe data.
 *
 * @returns {Promise<Shoe[]>} A promise that resolves to an array of all shoes.
 */
export async function getAllShoes(): Promise<Shoe[]> {
    try {
        const filePath = path.join(process.cwd(), "src", "data", "data.json");
        const jsonData = readFileSync(filePath, "utf8");
        const allShoes: Shoe[] = JSON.parse(jsonData);
        return allShoes;
    } catch (error) {
        console.error("Failed to fetch shoe data:", error);
        throw new Error("Failed to fetch shoe data.");
    }
}

/**
 * Fetches all unique shoe brands.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of unique shoe brands.
 */
export async function getAllBrands(): Promise<string[]> {
    try {
        const allShoes = await getAllShoes();
        const brands: Set<string> = new Set();

        // Get all shoe brands in the database and add them to the set
        allShoes.forEach((shoe) => brands.add(shoe.Brand));

        return Array.from(brands).sort();
    } catch (error) {
        console.error("Failed to fetch shoe brands:", error);
        throw new Error("Failed to fetch shoe brands.");
    }
}

/**
 * Fetches the shoe data based on the provided ID.
 *
 * @param {string} id - The unique identifier of the shoe.
 * @returns {Promise<Shoe | undefined>} A promise that resolves to the shoe data or undefined if not found.
 */
export async function getShoeById(id: string): Promise<Shoe | undefined> {
    try {
        const allShoes = await getAllShoes();
        const shoe = allShoes.find((shoe) => shoe.ShoeId === id);
        return shoe;
    } catch (error) {
        console.error(`Failed to fetch shoe with ID ${id}:`, error);
        throw new Error(`Failed to fetch shoe with ID ${id}.`);
    }
}
