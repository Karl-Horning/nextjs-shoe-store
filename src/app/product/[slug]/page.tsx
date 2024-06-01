import { Button } from "@nextui-org/react";
import fs from "fs";
import Image from "next/image";
import path from "path";
import { BiCartAdd } from "react-icons/bi";

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
interface Shoe {
    ShoeId: string;
    Brand: string;
    Model: string;
    Price: string;
    Image: string;
    AvailableSizes: string[];
}

/**
 * Represents the page properties.
 *
 * @typedef {Object} PageProps
 * @property {Object} params - The parameters of the page.
 * @property {string} params.slug - The slug of the shoe.
 */
interface PageProps {
    params: {
        slug: string;
    };
}

/**
 * Represents the data properties.
 *
 * @typedef {Object} DataProps
 * @property {string} slug - The slug of the shoe.
 */
interface DataProps {
    slug: string;
}

/**
 * Fetches the shoe data based on the provided slug.
 *
 * @param {DataProps} dataProps - The data properties containing the slug.
 * @returns {Promise<Shoe|undefined>} The shoe data or undefined if not found.
 */
async function getData({ slug }: DataProps) {
    const filePath = path.join(process.cwd(), "src", "data", "data.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data: Shoe[] = JSON.parse(jsonData);
    const shoe: Shoe | undefined = data.find((shoe) => shoe.ShoeId === slug);

    return shoe;
}

/**
 * The page component that displays the shoe details.
 *
 * @param {PageProps} pageProps - The page properties containing the params.
 * @returns {JSX.Element} The rendered page component.
 */
export default async function page({ params }: PageProps) {
    const { slug } = params;
    const shoe = await getData({ slug });

    if (!shoe) {
        return <div>Shoe not found</div>;
    }

    return (
        <section className="text-gray-800">
            <div id="shoe-header-container">
                <h1 className="absolute left-1/2 top-4 -translate-x-1/2 transform text-2xl font-bold">
                    Details
                </h1>
                <Image
                    alt={`${shoe.Brand} ${shoe.Model}`}
                    className="mb-5 w-full"
                    height={500}
                    src={`/${shoe.Image}`}
                    width={500}
                />
            </div>

            <form className="container mx-auto">
                <p className="mb-5 text-gray-500">{shoe.Brand}</p>

                <div
                    id="shoe-name-price-container"
                    className="mb-5 md:flex md:justify-between md:text-2xl"
                >
                    <h2 className="mb-2 text-2xl">
                        {shoe.Brand} {shoe.Model}
                    </h2>
                    <p className="mb-2">£{shoe.Price}</p>
                </div>

                <p className="mb-8 font-bold">Select size:</p>
                <div
                    id="shoe-size-container"
                    className="mb-10 align-bottom md:flex md:justify-between"
                >
                    <div className="mb-10 flex md:justify-center">
                        {shoe.AvailableSizes.map((size) => (
                            <div key={size}>
                                <input
                                    className="peer top-4 hidden"
                                    id={size}
                                    name="shoe-size"
                                    required
                                    type="radio"
                                    value={size}
                                />
                                <label
                                    className="mr-2 cursor-pointer rounded-lg border border-gray-500 p-4 peer-checked:border-blue-500 peer-checked:bg-blue-100"
                                    htmlFor={size}
                                >
                                    {size}
                                </label>
                            </div>
                        ))}
                    </div>

                    <Button
                        className="w-full md:w-auto md:mt-[-16px]"
                        color="danger"
                        endContent={<BiCartAdd />}
                        radius="lg"
                        size="lg"
                        type="submit"
                    >
                        Add to cart
                    </Button>
                </div>
            </form>
        </section>
    );
}
