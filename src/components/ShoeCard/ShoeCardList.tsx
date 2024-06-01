"use client";

import { Select, SelectItem } from "@nextui-org/select";
import ShoeCard from "@/components/ShoeCard/ShoeCard";
import { Button } from "@nextui-org/react";
import { Shoe } from "@/data/data";

/**
 * Represents the shoe card list properties.
 *
 * @typedef {Object} ShoeCardListProps
 * @property {Object} params - The parameters of the shoe card.
 * @property {string} params.shoeData - The data for the shoes to be displayed.
 * @property {string} params.shoeBrands - The list of shoe brands for filtering.
 */
interface ShoeCardListProps {
    shoeData: Shoe[];
    shoeBrands: string[];
}

/**
 * A component that displays a list of shoe cards and filtering options.
 *
 * @param {ShoeCardListProps} shoeCardListProps - The shoe card list properties containing the params.
 * @returns {JSX.Element} - The ShoeCardList component.
 */
export default function ShoeCardList({
    shoeData,
    shoeBrands,
}: ShoeCardListProps) {
    return (
        <section id="shoe-list" className="container mx-auto min-w-[375px]">
            <div className="mb-5 grid-cols-3 gap-4 md:grid">
                <div className="flex items-center justify-center">
                    <Button
                        variant="light"
                        size="lg"
                        color="secondary"
                        className="mb-5 w-full"
                    >
                        Popular
                    </Button>
                </div>

                <div className="flex items-center justify-center">
                    <Button
                        variant="light"
                        size="lg"
                        color="secondary"
                        className="mb-5 w-full"
                    >
                        Featured
                    </Button>
                </div>

                <Select
                    className="mb-5"
                    label="Filter by brand"
                    placeholder="All"
                >
                    {shoeBrands?.map((brand) => (
                        <SelectItem key={brand}>{brand}</SelectItem>
                    ))}
                </Select>
            </div>

            <div className="grid justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
                {shoeData.map((shoe) => (
                    <ShoeCard
                        key={shoe.ShoeId}
                        id={shoe.ShoeId}
                        title={`${shoe.Brand} ${shoe.Model}`}
                        brand={shoe.Brand}
                        price={shoe.Price}
                        imgAlt={`${shoe.Brand} ${shoe.Model}`}
                        imgSrc={shoe.Image}
                    />
                ))}
            </div>
        </section>
    );
}
