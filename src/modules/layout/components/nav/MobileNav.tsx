/**
 * Yello Solar Hub - Mobile Navigation Component
 * 
 * Mobile menu com drawer usando Yello Design System
 * Accordion para categorias
 */

"use client";

import Link from "next/link";
import { useState } from "react";
import { menuByCategory } from "@lib/menu";
import { YelloLogo } from "@lib/design-system/components/YelloLogo";
import { Button } from "@lib/design-system/components/Button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4">
        {/* Logo */}
        <LocalizedClientLink href="/" className="flex items-center gap-2">
          <YelloLogo size={32} />
          <span className="text-sm font-bold bg-gradient-to-r from-yello-yellow via-yello-orange to-yello-magenta bg-clip-text text-transparent">
            Yello Solar
          </span>
        </LocalizedClientLink>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-geist-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen ? "true" : "false"}
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 animate-fade-in" onClick={() => setIsOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              {/* Close Button */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold bg-gradient-to-r from-yello-yellow via-yello-orange to-yello-magenta bg-clip-text text-transparent">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-geist-100"
                  aria-label="Fechar menu"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Kits Completos */}
              <div className="mb-4">
                <button
                  onClick={() => toggleCategory("kits")}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-yello-yellow50 transition-colors"
                >
                  <span className="font-semibold text-yello-orange">Kits Completos</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${expandedCategory === "kits" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedCategory === "kits" && (
                  <ul className="mt-2 space-y-1 pl-4">
                    {menuByCategory.kits.map((item) => (
                      <li key={item.href}>
                        <LocalizedClientLink
                          href={item.href}
                          className="block p-2 text-sm rounded-lg hover:bg-yello-yellow50"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Componentes */}
              <div className="mb-4">
                <button
                  onClick={() => toggleCategory("componentes")}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-yello-orange50 transition-colors"
                >
                  <span className="font-semibold text-yello-magenta">Componentes</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${expandedCategory === "componentes" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedCategory === "componentes" && (
                  <ul className="mt-2 space-y-1 pl-4">
                    {menuByCategory.componentes.map((item) => (
                      <li key={item.href}>
                        <LocalizedClientLink
                          href={item.href}
                          className="block p-2 text-sm rounded-lg hover:bg-yello-orange50"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Acessórios */}
              <div className="mb-4">
                <button
                  onClick={() => toggleCategory("acessorios")}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-geist-100 transition-colors"
                >
                  <span className="font-semibold text-geist-700">Acessórios</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${expandedCategory === "acessorios" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedCategory === "acessorios" && (
                  <ul className="mt-2 space-y-1 pl-4">
                    {menuByCategory.acessorios.map((item) => (
                      <li key={item.href}>
                        <LocalizedClientLink
                          href={item.href}
                          className="block p-2 text-sm rounded-lg hover:bg-geist-100"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-geist-200 pt-4 mt-4 space-y-2">
                <LocalizedClientLink href="/store" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="sm" fullWidth className="justify-start">
                    Todos os Produtos
                  </Button>
                </LocalizedClientLink>

                <LocalizedClientLink href="/sizing" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" fullWidth className="justify-start">
                    Dimensionamento
                  </Button>
                </LocalizedClientLink>

                <LocalizedClientLink href="/account" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="sm" fullWidth className="justify-start">
                    Minha Conta
                  </Button>
                </LocalizedClientLink>
              </div>

              {/* CTA */}
              <div className="mt-6 p-4 bg-gradient-to-br from-yello-yellow50 to-yello-orange50 rounded-lg">
                <p className="text-sm font-medium mb-2">Precisa de ajuda?</p>
                <LocalizedClientLink href="/sizing" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth>
                    Dimensionar Sistema
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
