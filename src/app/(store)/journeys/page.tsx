import { Metadata } from "next";

import { getCategoriesByType } from "@/lib/categories";
import { SolarBuyerJourney } from "@/modules/journeys/templates/solar-buyer-journey";

export const metadata: Metadata = {
    title: "Buyer Journey Solar 360º | Yello Solar Hub",
    description:
        "Mapeie a jornada completa do comprador solar: descoberta, dimensionamento, conversão e pós-venda com o ecossistema Yello.",
};

export default function BuyerJourneysPage() {
    const kits = getCategoriesByType("kits");
    const componentes = getCategoriesByType("componentes");
    const acessorios = getCategoriesByType("acessorios");

    return <SolarBuyerJourney kits={kits} componentes={componentes} acessorios={acessorios} />;
}
