"use client";

import { Image } from "@nextui-org/react";
import { getShoeById } from "@/data/data";
import ShoppingCart from "@/components/ShoppingCart/ShoppingCart";

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
 * The page component that displays the shoe details.
 *
 * @param {PageProps} pageProps - The page properties containing the params.
 * @returns {JSX.Element} - The rendered page component.
 */
export default async function page({ params }: PageProps) {
    const { slug } = params;
    const shoe = await getShoeById(slug);

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

            <form
                className="container mx-auto"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
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
                            {shoe.AvailableSizes.map((size, index) => (
                                <div key={size}>
                                    <input
                                        className="peer top-4 hidden"
                                        id={size}
                                        name="shoe-size"
                                        required
                                        type="radio"
                                        value={size}
                                        defaultChecked={index === 0} // Default check the first size
                                    />
                                    <label
                                        className="mr-2 cursor-pointer rounded-lg border border-gray-500 p-4 peer-checked:border-purple-500 peer-checked:bg-purple-100"
                                        htmlFor={size}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                document
                                                    .getElementById(size)
                                                    ?.click();
                                            }
                                        }}
                                        tabIndex={0}
                                    >
                                        {size}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <ShoppingCart />
                    </div>
                </div>
            </form>
        </main>
    );
}
