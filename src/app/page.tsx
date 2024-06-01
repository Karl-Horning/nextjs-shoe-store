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
        <main>
            <header className="container mx-auto my-40 min-w-[375px]">
                <h1 className="mb-10 text-center text-8xl font-bold">
                    Trainers without the sole-searching
                </h1>
            </header>

            <div className="container mx-auto min-w-[375px]">
                <section className="grid justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
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
            </div>
        </main>
    );
}
