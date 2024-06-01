import Link from "next/link";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/react";

/**
 * Props for the ShoeCard component.
 *
 * @typedef {Object} ShoeCardProps
 * @property {string} id - The unique identifier for the shoe.
 * @property {string} title - The title of the shoe.
 * @property {string} brand - The brand of the shoe.
 * @property {string} price - The price of the shoe.
 * @property {string} imgAlt - The alt text for the shoe image.
 * @property {string} imgSrc - The source path for the shoe image.
 */
interface ShoeCardProps {
    id: string;
    title: string;
    brand: string;
    price: string;
    imgAlt: string;
    imgSrc: string;
}

/**
 * A card component to display a shoe's information.
 *
 * @param {ShoeCardProps} props - The props for the component.
 * @param {string} props.id - The unique identifier for the shoe.
 * @param {string} props.title - The title of the shoe.
 * @param {string} props.brand - The brand of the shoe.
 * @param {string} props.price - The price of the shoe.
 * @param {string} props.imgAlt - The alt text for the shoe image.
 * @param {string} props.imgSrc - The source path for the shoe image.
 * @returns {JSX.Element} - The rendered ShoeCard component.
 */
export default function ShoeCard({
    id,
    title,
    brand,
    price,
    imgAlt,
    imgSrc,
}: ShoeCardProps) {
    return (
        <div className="mb-8 w-full">
            <Link href={`/product/${id}`} className="w-full">
                <Card shadow="sm" key={id} fullWidth isPressable>
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={imgAlt}
                            className="w-full object-cover"
                            radius="lg"
                            shadow="sm"
                            src={imgSrc}
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="border-t-1 flex-initial border-zinc-100/50 bg-white/30 text-gray-800">
                        <div className="w-full">
                            <p className="mb-1 text-left text-sm font-bold">
                                {title}
                            </p>
                            <div className="flex w-full justify-between">
                                <p className="text-tiny">£{price}</p>
                                <p className="text-tiny mb-1 text-gray-500">
                                    {brand}
                                </p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    );
}
