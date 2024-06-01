import Header from "@/components/Header/Header";
import ShoeCardList from "@/components/ShoeCard/ShoeCardList";

export default async function Home() {
    return (
        <main>
            <Header />
            <ShoeCardList />
        </main>
    );
}
