import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/lib/design-system/components/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/lib/design-system/components/Card";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";

type Props = {
    params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
    // In development, use fixtures for static params
    if (process.env.NODE_ENV === 'development') {
        try {
            const fs = await import('fs');
            const path = await import('path');

            const fixturesPath = path.join(process.cwd(), 'src/lib/fixtures/products.json');
            if (fs.existsSync(fixturesPath)) {
                const products = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8')) as any[];

                // Get unique kit handles from products with equipment_type 'kit'
                const kitHandles = [...new Set(
                    products
                        .filter(p => p.metadata?.equipment_type === 'kit')
                        .map(p => p.handle)
                )];

                return kitHandles.map(handle => ({ handle }));
            }
        } catch (error) {
            console.warn('Failed to generate kit static params from fixtures:', error);
        }
    }

    // Fallback
    return [];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { handle } = params;

    // Try to get kit data from fixtures
    let kitTitle = `Kit ${handle}`;
    let kitDescription = `Detalhes do kit solar ${handle}`;

    if (process.env.NODE_ENV === 'development') {
        try {
            const fs = await import('fs');
            const path = await import('path');

            const fixturesPath = path.join(process.cwd(), 'src/lib/fixtures/products.json');
            if (fs.existsSync(fixturesPath)) {
                const products = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8')) as any[];
                const kit = products.find(p => p.handle === handle && p.metadata?.equipment_type === 'kit');

                if (kit) {
                    kitTitle = kit.title;
                    kitDescription = kit.description || `Kit solar ${kit.title}`;
                }
            }
        } catch (error) {
            console.warn('Failed to get kit metadata from fixtures:', error);
        }
    }

    return {
        title: `${kitTitle} | Kits Solares | Yello Solar Hub`,
        description: kitDescription,
    };
}

async function getKitData(handle: string) {
    // In development, load from fixtures
    if (process.env.NODE_ENV === 'development') {
        try {
            const fs = await import('fs');
            const path = await import('path');

            const fixturesPath = path.join(process.cwd(), 'src/lib/fixtures/products.json');
            if (fs.existsSync(fixturesPath)) {
                const products = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8')) as any[];
                const kit = products.find(p => p.handle === handle && p.metadata?.equipment_type === 'kit');

                if (kit) {
                    return kit;
                }
            }
        } catch (error) {
            console.warn('Failed to load kit data from fixtures:', error);
        }
    }

    // Fallback: try to find by category
    // This would need integration with medusa-client
    return null;
}

export default async function KitPage(props: Props) {
    const params = await props.params;
    const { handle } = params;

    const kit = await getKitData(handle);

    if (!kit) {
        notFound();
    }

    return (
        <div className="content-container py-12 space-y-12">
            <header className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-yello-yellow/40 bg-yello-yellow100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-yello-orange">
                    Kit Solar
                </div>
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-gradient-yello">
                        {kit.title}
                    </h1>
                    <p className="mx-auto max-w-4xl text-lg text-geist-600">
                        {kit.description}
                    </p>
                    {kit.price && (
                        <div className="text-2xl font-bold text-yello-orange">
                            {kit.price} {kit.currency}
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Especificações Técnicas</CardTitle>
                            <CardDescription>
                                Detalhes completos do kit solar
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {kit.metadata && Object.entries(kit.metadata).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                                    <span>{String(value)}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {kit.images && kit.images.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Imagens</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {kit.images.map((image: string, index: number) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`${kit.title} ${index + 1}`}
                                            className="rounded-lg object-cover"
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ações</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button yelloVariant="primary" fullWidth>
                                Adicionar ao Carrinho
                            </Button>
                            <Button yelloVariant="outline" fullWidth>
                                Solicitar Orçamento
                            </Button>
                            <LocalizedClientLink href="/sizing">
                                <Button yelloVariant="ghost" fullWidth>
                                    Dimensionar Sistema
                                </Button>
                            </LocalizedClientLink>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Suporte</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm text-geist-600">
                                <p>Precisa de ajuda para escolher o kit ideal?</p>
                                <p>Nossa equipe técnica está pronta para auxiliar.</p>
                            </div>
                            <LocalizedClientLink href="/contact">
                                <Button yelloVariant="ghost" size="sm" fullWidth>
                                    Falar com Especialista
                                </Button>
                            </LocalizedClientLink>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <section className="rounded-3xl border border-yello-yellow/40 bg-yello-yellow50 px-8 py-10 text-center">
                <h2 className="text-3xl font-bold text-geist-900 mb-3">Próximos Passos</h2>
                <p className="mx-auto mb-6 max-w-3xl text-base text-geist-700">
                    Continue sua jornada solar com dimensionamento personalizado e financiamento facilitado.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <LocalizedClientLink href="/sizing">
                        <Button yelloVariant="primary" size="md">
                            Dimensionar Sistema
                        </Button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href="/financing">
                        <Button yelloVariant="outline" size="md">
                            Simular Financiamento
                        </Button>
                    </LocalizedClientLink>
                </div>
            </section>
        </div>
    );
}