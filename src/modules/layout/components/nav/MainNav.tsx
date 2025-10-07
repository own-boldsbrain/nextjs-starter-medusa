/**
 * Yello Solar Hub - Main Navigation Component
 * 
 * Desktop navigation com mega-menu agrupado por categoria
 * Usa Yello Design System (Button, Card)
 */

"use client";

import { useState } from "react";
import { menuByCategory, type MenuItem } from "@lib/menu";
import { YelloLogo } from "@lib/design-system/components/YelloLogo";
import { Button } from "@lib/design-system/components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@lib/design-system/components/Card";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { SEGMENTS } from "@modules/journeys/constants/segments";

export function MainNav() {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
      {/* Logo */}
      <LocalizedClientLink href="/" className="flex items-center gap-2">
        <YelloLogo size={40} />
        <span className="text-lg font-bold bg-gradient-to-r from-yello-yellow via-yello-orange to-yello-magenta bg-clip-text text-transparent">
          Yello Solar Hub
        </span>
      </LocalizedClientLink>

      {/* Menu Principal */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Equipamentos - Mega Menu */}
        <div
          className="relative"
          onMouseEnter={() => setActiveMegaMenu("equipamentos")}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <Button variant="ghost" size="sm" className="font-medium">
            Equipamentos
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>

          {/* Mega Menu Dropdown */}
          {activeMegaMenu === "equipamentos" && (
            <div className="absolute top-full left-0 mt-2 w-screen max-w-4xl z-50 animate-fade-in-top">
              <Card elevation="floating" className="shadow-2xl">
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Kits Completos */}
                    <div>
                      <h3 className="text-sm font-semibold text-yello-orange mb-3 uppercase tracking-wide">
                        Kits Completos
                      </h3>
                      <ul className="space-y-2">
                        {menuByCategory.kits.map((item) => (
                          <li key={item.href}>
                            <LocalizedClientLink
                              href={item.href}
                              className="block px-3 py-2 rounded-lg hover:bg-yello-yellow50 transition-colors"
                            >
                              <div className="font-medium text-sm">{item.title}</div>
                              <div className="text-xs text-geist-500 mt-0.5 line-clamp-2">
                                {item.description}
                              </div>
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Componentes Principais */}
                    <div>
                      <h3 className="text-sm font-semibold text-yello-magenta mb-3 uppercase tracking-wide">
                        Componentes
                      </h3>
                      <ul className="space-y-2">
                        {menuByCategory.componentes.map((item) => (
                          <li key={item.href}>
                            <LocalizedClientLink
                              href={item.href}
                              className="block px-3 py-2 rounded-lg hover:bg-yello-orange50 transition-colors"
                            >
                              <div className="font-medium text-sm">{item.title}</div>
                              <div className="text-xs text-geist-500 mt-0.5 line-clamp-2">
                                {item.description}
                              </div>
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Acessórios */}
                    <div>
                      <h3 className="text-sm font-semibold text-geist-700 mb-3 uppercase tracking-wide">
                        Acessórios
                      </h3>
                      <ul className="space-y-2">
                        {menuByCategory.acessorios.map((item) => (
                          <li key={item.href}>
                            <LocalizedClientLink
                              href={item.href}
                              className="block px-3 py-2 rounded-lg hover:bg-geist-100 transition-colors"
                            >
                              <div className="font-medium text-sm">{item.title}</div>
                              <div className="text-xs text-geist-500 mt-0.5 line-clamp-2">
                                {item.description}
                              </div>
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="mt-6 pt-6 border-t border-geist-200 flex items-center justify-between">
                    <p className="text-sm text-geist-600">
                      Não sabe qual sistema escolher?
                    </p>
                    <LocalizedClientLink href="/sizing">
                      <Button variant="primary" size="sm">
                        Dimensionar Sistema
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Jornadas - Mega Menu */}
        <div
          className="relative"
          onMouseEnter={() => setActiveMegaMenu("journeys")}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <Button variant="ghost" size="sm" className="font-medium">
            Jornadas
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>

          {activeMegaMenu === "journeys" && (
            <div className="absolute top-full left-0 mt-2 w-screen max-w-3xl z-50 animate-fade-in-top">
              <Card elevation="floating" className="shadow-2xl">
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SEGMENTS.map((segment) => (
                      <LocalizedClientLink
                        key={segment.id}
                        href={`/journeys/${segment.id}`}
                        className="group rounded-2xl border border-geist-200 bg-white/80 px-4 py-5 transition-all hover:-translate-y-0.5 hover:border-yello-orange hover:bg-yello-yellow50"
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-geist-500">
                          {segment.subtitle}
                        </span>
                        <h3 className="mt-2 text-lg font-semibold text-geist-900 group-hover:text-yello-orange">
                          {segment.title}
                        </h3>
                        <p className="mt-2 text-sm text-geist-600 line-clamp-3">
                          {segment.overview}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-yello-orange">
                          Ver jornada completa
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </div>
                      </LocalizedClientLink>
                    ))}
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-yello-yellow/40 bg-yello-yellow50 px-4 py-3">
                    <p className="text-sm text-geist-700">
                      Explore as jornadas regulatórias e conecte cada etapa ao catálogo 360º.
                    </p>
                    <LocalizedClientLink href="/journeys">
                      <Button variant="primary" size="sm">
                        Ver Buyer Journey 360º
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Outros links */}
        <LocalizedClientLink href="/store">
          <Button variant="ghost" size="sm">
            Todos os Produtos
          </Button>
        </LocalizedClientLink>

        <LocalizedClientLink href="/sizing">
          <Button variant="outline" size="sm">
            Dimensionamento
          </Button>
        </LocalizedClientLink>

        <LocalizedClientLink href="/account">
          <Button variant="ghost" size="sm">
            Minha Conta
          </Button>
        </LocalizedClientLink>
      </div>
    </nav>
  );
}
