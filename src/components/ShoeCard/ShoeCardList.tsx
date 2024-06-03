"use client";

import React, { useState, useEffect } from "react";
import {
    getAllBrands,
    getAllShoes,
    getShoesByBrand,
    getLeastExpensiveShoes,
    getMostExpensiveShoes,
    Shoe,
} from "@/data/data";
import { Select, SelectItem } from "@nextui-org/react";
import ShoeCard from "@/components/ShoeCard/ShoeCard";
import { Button } from "@nextui-org/react";

/**
 * A component that displays a list of shoe cards and filtering options.
 *
 * @returns {JSX.Element} - The ShoeCardList component.
 */
export default function ShoeCardList() {
    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectKey, setSelectKey] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const allShoes = await getAllShoes();
            const allBrands = await getAllBrands();
            setShoes(allShoes);
            setBrands(allBrands);
        };

        fetchData();
    }, []);

    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const buttonId = e.currentTarget.id;

        let shoesFilter: Shoe[] = [];
        switch (buttonId) {
            case "all-shoes-btn":
                shoesFilter = await getAllShoes();
                break;
            case "popular-btn":
                shoesFilter = await getLeastExpensiveShoes();
                break;
            case "featured-btn":
                shoesFilter = await getMostExpensiveShoes();
                break;
            default:
                break;
        }

        setSelectedBrand("");
        setShoes(shoesFilter);

        // Increment the select key to force re-render of the Select component
        setSelectKey((prevKey) => prevKey + 1);
    };

    const handleBrandSelection: React.ChangeEventHandler<
        HTMLSelectElement
    > = async (event) => {
        const selectedValue = event.target.value;
        setSelectedBrand(selectedValue);

        const shoesFilter: Shoe[] = await getShoesByBrand(selectedValue);
        setShoes(shoesFilter);
    };

    return (
        <section id="shoe-list" className="container mx-auto min-w-[375px]">
            <div className="mb-5 grid-cols-4 gap-4 md:grid">
                <div className="flex items-center justify-center">
                    <Button
                        className="mb-5 w-full"
                        color="secondary"
                        id="all-shoes-btn"
                        onClick={handleButtonClick}
                        size="lg"
                        variant="ghost"
                    >
                        All Shoes
                    </Button>
                </div>

                <div className="flex items-center justify-center">
                    <Button
                        className="mb-5 w-full"
                        color="secondary"
                        id="popular-btn"
                        onClick={handleButtonClick}
                        size="lg"
                        variant="light"
                    >
                        Popular
                    </Button>
                </div>

                <div className="flex items-center justify-center">
                    <Button
                        className="mb-5 w-full"
                        color="secondary"
                        id="featured-btn"
                        onClick={handleButtonClick}
                        size="lg"
                        variant="light"
                    >
                        Featured
                    </Button>
                </div>

                <Select
                    className="w-full"
                    key={selectKey}
                    label="Filter by brand"
                    onChange={handleBrandSelection}
                    placeholder="All"
                    size="sm"
                    value={selectedBrand}
                >
                    {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                            {brand}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className="grid justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
                {shoes.map((shoe) => (
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
