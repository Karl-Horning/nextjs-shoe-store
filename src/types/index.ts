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
export type Shoe = {
    ShoeId: string;
    Brand: string;
    Model: string;
    Price: string;
    Image: string;
    AvailableSizes: string[];
};
