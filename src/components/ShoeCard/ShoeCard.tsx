import Image from "next/image";
import Link from "next/link";

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
        <div className="mb-8">
            <Link href={`/product/${id}`}>
                <Image
                    alt={imgAlt}
                    className="mb-2 rounded-3xl"
                    height={400}
                    src={`/${imgSrc}`}
                    width={400}
                />
                <h2 className="mb-2 text-xl text-gray-800">{title}</h2>
                <p className="mb-2 text-gray-500">{brand}</p>
                <p className="mb-2 text-gray-800">{price}</p>
            </Link>
        </div>
    );
}
