"use client";

import React, { useState, useEffect } from "react";
import { Shoe } from "@/data/data";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import ShoeCard from "@/components/ShoeCard/ShoeCard";
import { Button } from "@nextui-org/react";
import { useQuery, gql } from "@apollo/client";

/**
 * Query to fetch all shoes.
 */
const GET_ALL_SHOES = gql`
    query getAllShoes {
        listShoes {
            items {
                ShoeId
                AvailableSizes
                Brand
                Image
                Model
                Price
            }
        }
    }
`;

/**
 * Query to fetch shoes by brand.
 */
const GET_SHOES_BY_BRAND = gql`
    query getShoesByBrand($brand: String!) {
        listShoes(filter: { Brand: { eq: $brand } }) {
            items {
                ShoeId
                AvailableSizes
                Brand
                Image
                Model
                Price
            }
        }
    }
`;

/**
 * Get unique brands from a list of shoes.
 *
 * @param {Shoe[]} shoes - List of shoes.
 * @returns {string[]} Unique brands.
 */
const getUniqueBrands = (shoes: Shoe[]) =>
    shoes
        .map((shoe: Shoe) => shoe.Brand)
        .filter((brand, index, self) => self.indexOf(brand) === index)
        .sort();

/**
 * Component for displaying a list of shoe cards.
 *
 * @returns {JSX.Element} JSX element representing the list of shoe cards.
 */
export default function ShoeCardList() {
    const {
        loading: loadingShoes,
        error: errorShoes,
        data: dataShoes,
        refetch: refetchShoes,
    } = useQuery(GET_ALL_SHOES);
    const {
        loading: loadingShoeByBrand,
        error: errorShoeByBrand,
        data: dataShoeByBrand,
        refetch: refetchShoeByBrand,
    } = useQuery(GET_SHOES_BY_BRAND);
    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectKey, setSelectKey] = useState<number>(0);
    const [loadingButtons, setLoadingButtons] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (dataShoes?.listShoes?.items) {
                const dataShoesItems: Shoe[] = dataShoes.listShoes.items;
                const uniqueBrands = getUniqueBrands(dataShoesItems);

                setBrands(uniqueBrands);
                setShoes(dataShoesItems);
            }
        };

        fetchData();
    }, [dataShoes]);

    /**
     * Handles button click events.
     *
     * @param {React.MouseEvent<HTMLButtonElement>} e - Button click event.
     */
    const handleButtonClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const buttonId = e.currentTarget.id;

        let result;
        switch (buttonId) {
            case "all-shoes-btn":
                result = await refetchShoes();
                setShoes(result.data.listShoes.items);
                break;
            case "popular-btn":
                result = await refetchShoes();
                const leastExpensiveShoes = [...result.data.listShoes.items]
                    .sort((a, b) => a.Price - b.Price)
                    .splice(0, 5);
                setShoes(leastExpensiveShoes);
                break;
            case "featured-btn":
                result = await refetchShoes();
                const mostExpensiveShoes = [...result.data.listShoes.items]
                    .sort((a, b) => b.Price - a.Price)
                    .splice(0, 5);
                setShoes(mostExpensiveShoes);
                break;
            default:
                break;
        }

        setSelectedBrand("");
        setLoadingButtons(false);
        setSelectKey((prevKey) => prevKey + 1);
    };

    /**
     * Handles brand selection from the select dropdown.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event - Change event from the select dropdown.
     */
    const handleBrandSelection: React.ChangeEventHandler<
        HTMLSelectElement
    > = async (event) => {
        const selectedValue = event.target.value;
        setSelectedBrand(selectedValue);

        const result = await refetchShoeByBrand({ brand: selectedValue });

        if (result.data.listShoes?.items) {
            setShoes(result.data.listShoes.items);
        }
    };

    return (
        <section id="shoe-list" className="container mx-auto min-w-[375px]">
            <div className="mb-5 grid-cols-4 gap-4 md:grid">
                <div className="flex items-center justify-center">
                    <Button
                        className="mb-5 w-full"
                        color="secondary"
                        id="all-shoes-btn"
                        isLoading={loadingButtons}
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
                        isLoading={loadingButtons}
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
                        isLoading={loadingButtons}
                        onClick={handleButtonClick}
                        size="lg"
                        variant="light"
                    >
                        Featured
                    </Button>
                </div>

                <Select
                    className="w-full"
                    isLoading={loadingButtons}
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

            {errorShoes && <p>Error: {errorShoes.message}</p>}
            {loadingShoes ? (
                <div className="flex items-center justify-center">
                    <Spinner color="secondary" size="lg" />
                </div>
            ) : (
                <div className="grid justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {shoes.map((shoe: Shoe) => (
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
            )}
        </section>
    );
}
