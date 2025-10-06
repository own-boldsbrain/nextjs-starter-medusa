/**
 * Yello Solar Hub - Equipamentos Index Page
 * 
 * Route: /equipamentos
 * Lista todas as categorias de equipamentos solares
 */

import { Metadata } from "next";
import { getAllCategories, getCategoriesByType } from "@lib/categories";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lib/design-system/components/Card";
import { Button } from "@lib/design-system/components/Button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export const metadata: Metadata = {
  title: "Equipamentos Solares | Kits, Painéis, Inversores e Mais | Yello Solar Hub",
  description:
    "Catálogo completo de equipamentos solares: kits on-grid, off-grid, híbridos, painéis TIER 1, inversores, baterias e acessórios. Dimensionamento AI incluído.",
  keywords: [
    "equipamentos solares",
    "kit solar",
    "painéis solares",
    "inversores",
    "baterias",
    "sistema fotovoltaico",
  ],
};

export default function EquipamentosPage() {
  const kits = getCategoriesByType("kits");
  const componentes = getCategoriesByType("componentes");
  const acessorios = getCategoriesByType("acessorios");

  return (
    <div className="content-container py-12">
      {/* Hero Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black bg-gradient-to-r from-yello-yellow via-yello-orange to-yello-magenta bg-clip-text text-transparent mb-4">
          Equipamentos Solares
        </h1>
        <p className="text-xl text-geist-600 max-w-3xl mx-auto">
          Catálogo completo de equipamentos fotovoltaicos com dimensionamento AI, cálculo HSP regional e classificação TIER.
        </p>
      </div>

      {/* Sizing CTA */}
      <Card variant="yellow" elevation="floating" className="mb-12">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold mb-2">Não sabe por onde começar?</h2>
              <p className="text-geist-600">
                Nossa IA dimensiona o sistema ideal baseado no seu consumo, região HSP e objetivos de economia.
              </p>
            </div>
            <LocalizedClientLink href="/sizing">
              <Button variant="primary" size="xl" className="min-w-[240px]">
                🤖 Dimensionar Sistema
              </Button>
            </LocalizedClientLink>
          </div>
        </CardContent>
      </Card>

      {/* Kits Completos */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-1 bg-gradient-to-b from-yello-yellow to-yello-orange rounded-full" />
          <div>
            <h2 className="text-3xl font-bold text-geist-900">Kits Completos</h2>
            <p className="text-geist-500">Sistemas prontos para instalação</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((category) => (
            <LocalizedClientLink key={category.slug} href={`/equipamentos/${category.slug}`}>
              <Card elevation="raised" interactive className="h-full transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    {category.tierLevel === "premium" && (
                      <span className="px-2 py-1 text-xs font-semibold bg-yello-yellow text-black rounded">
                        ⭐ Premium
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.hasHSP && (
                      <span className="text-xs px-2 py-1 bg-yello-orange50 text-yello-orange rounded-full">
                        ☀️ HSP
                      </span>
                    )}
                    {category.requiresSizing && (
                      <span className="text-xs px-2 py-1 bg-yello-magenta50 text-yello-magenta rounded-full">
                        🤖 Sizing AI
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </LocalizedClientLink>
          ))}
        </div>
      </section>

      {/* Componentes Principais */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-1 bg-gradient-to-b from-yello-orange to-yello-magenta rounded-full" />
          <div>
            <h2 className="text-3xl font-bold text-geist-900">Componentes Principais</h2>
            <p className="text-geist-500">Painéis, inversores e baterias TIER 1</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {componentes.map((category) => (
            <LocalizedClientLink key={category.slug} href={`/equipamentos/${category.slug}`}>
              <Card elevation="raised" interactive className="h-full transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    {category.tierLevel === "premium" && (
                      <span className="px-2 py-1 text-xs font-semibold bg-yello-yellow text-black rounded">
                        TIER 1
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </LocalizedClientLink>
          ))}
        </div>
      </section>

      {/* Acessórios e Complementos */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-1 bg-gradient-to-b from-geist-300 to-geist-500 rounded-full" />
          <div>
            <h2 className="text-3xl font-bold text-geist-900">Acessórios e Complementos</h2>
            <p className="text-geist-500">Proteção, monitoramento e expansão</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acessorios.map((category) => (
            <LocalizedClientLink key={category.slug} href={`/equipamentos/${category.slug}`}>
              <Card elevation="raised" interactive className="h-full transition-all hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </LocalizedClientLink>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <Card variant="orange" elevation="floating">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-3">Ainda com dúvidas?</h3>
            <p className="text-geist-600 mb-6 max-w-2xl mx-auto">
              Nossa equipe de especialistas pode ajudar você a escolher os melhores equipamentos para o seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocalizedClientLink href="/sizing">
                <Button variant="primary" size="lg">
                  Dimensionar Sistema
                </Button>
              </LocalizedClientLink>
              <LocalizedClientLink href="/store">
                <Button variant="outline" size="lg">
                  Ver Todos os Produtos
                </Button>
              </LocalizedClientLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
