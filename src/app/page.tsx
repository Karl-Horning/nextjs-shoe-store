import ShoeCard from "@/components/ShoeCard/ShoeCard";
import fs from "fs";
import path from "path";

interface Shoe {
    ShoeId: string;
    Brand: string;
    Model: string;
    Price: string;
    Image: string;
}

async function getData() {
    const filePath = path.join(process.cwd(), "src", "data", "data.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data: Shoe[] = JSON.parse(jsonData);

    return data;
}

export default async function Home() {
    const data = await getData();

    return (
        <main className="container mx-auto min-w-[375px]">
            <section className="grid sm:grid-cols-2 justify-items-center gap-4 md:grid-cols-3">
                {data.map((item) => (
                    <ShoeCard
                        key={item.ShoeId}
                        id={item.ShoeId}
                        title={`${item.Brand} ${item.Model}`}
                        brand={item.Brand}
                        price={item.Price}
                        imgAlt={`${item.Brand} ${item.Model}`}
                        imgSrc={item.Image}
                    />
                ))}
            </section>
        </main>
    );
}
