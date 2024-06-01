import Header from "@/components/Header/Header";
import ShoeCardList from "@/components/ShoeCard/ShoeCardList";
import { getAllBrands, getAllShoes } from "@/data/data";

export default async function Home() {
    const allShoes = await getAllShoes();
    const allBrands = await getAllBrands();

    return (
        <main>
            <Header />
            <ShoeCardList shoeData={allShoes} shoeBrands={allBrands} />
        </main>
    );
}
