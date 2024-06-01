import { IoCartOutline } from "react-icons/io5";
import { Button, Image } from "@nextui-org/react";
import fs from "fs";
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
        <main className="text-gray-800">
            <section id="header-container" className="w-full">
                <Image
                    alt={`${shoe.Brand} ${shoe.Model}`}
                    className="mb-5 w-full"
                    height={"100%"}
                    radius="none"
                    src={`/${shoe.Image}`}
                    width={"100%"}
                />
            </section>

            <form className="container mx-auto">
                <div className="lg:flex lg:justify-between">
                    <div id="shoe-info">
                        <p className="mb-5 text-gray-500">{shoe.Brand}</p>

                        <h2 className="mb-5 text-4xl">
                            {shoe.Brand} {shoe.Model}
                        </h2>
                        <p className="mb-5 text-xl">£{shoe.Price}</p>
                    </div>

                    <div id="buying-options">
                        <p className="mb-8 font-bold">Select size:</p>

                        <div className="mb-10 flex">
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
                                        className="mr-2 cursor-pointer rounded-lg border border-gray-500 p-4 peer-checked:border-purple-500 peer-checked:bg-purple-100"
                                        htmlFor={size}
                                    >
                                        {size}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <Button
                            className="mb-20 w-full"
                            color="secondary"
                            endContent={<IoCartOutline />}
                            radius="lg"
                            size="lg"
                            type="submit"
                        >
                            Add to cart
                        </Button>
                    </div>
                </div>
            </form>
        </main>
    );
}
