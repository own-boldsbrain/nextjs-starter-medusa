/**
 * Mobile Actions Drawer Component
 * 
 * Bottom sheet drawer para ações de produto em mobile.
 * Padrão Medusa B2B: Headless UI Dialog, backdrop blur, rounded-t-2xl.
 * 
 * Features:
 * - Bottom sheet animation (slide up)
 * - Backdrop blur com overlay
 * - Variant selection
 * - Quantity selector
 * - Add to cart CTA
 * - Close button
 * 
 * Uso:
 * - Product page mobile (< 1024px)
 * - Triggered por "Ver opções" button em mobile
 * 
 * @see https://github.com/medusajs/b2b-starter-medusa
 */

"use client"

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from '@/lib/design-system/components/Button'
// XMark icon inline (sem dependência de heroicons)

interface ProductVariant {
    id: string
    title: string
    options: Array<{ value: string }>
    calculated_price?: {
        calculated_amount: number
        currency_code: string
    }
}

interface MobileActionsDrawerProps {
    /**
     * Estado de abertura do drawer
     */
    isOpen: boolean

    /**
     * Callback para fechar o drawer
     */
    onClose: () => void

    /**
     * Título do produto
     */
    productTitle: string

    /**
     * Variantes disponíveis
     */
    variants?: ProductVariant[]

    /**
     * Variante selecionada
     */
    selectedVariantId?: string

    /**
     * Callback para selecionar variante
     */
    onSelectVariant?: (variantId: string) => void

    /**
     * Quantidade selecionada
     */
    quantity: number

    /**
     * Callback para atualizar quantidade
     */
    onQuantityChange: (quantity: number) => void

    /**
     * Callback para adicionar ao carrinho
     */
    onAddToCart: () => void

    /**
     * Estado de loading do add to cart
     */
    isAddingToCart?: boolean

    /**
     * Preço formatado
     */
    price?: string
}

// Inline XMark icon
const XMark = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
)

export function MobileActionsDrawer({
    isOpen,
    onClose,
    productTitle,
    variants = [],
    selectedVariantId,
    onSelectVariant,
    quantity,
    onQuantityChange,
    onAddToCart,
    isAddingToCart = false,
    price,
}: MobileActionsDrawerProps) {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50 lg:hidden">
                {/* Backdrop */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
                </TransitionChild>

                {/* Panel Container */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-x-0 bottom-0 flex max-h-[80vh]">
                            <TransitionChild
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-y-full"
                                enterTo="translate-y-0"
                                leave="transform transition ease-in-out duration-200"
                                leaveFrom="translate-y-0"
                                leaveTo="translate-y-full"
                            >
                                <DialogPanel
                                    className="pointer-events-auto w-screen"
                                    data-testid="mobile-actions-drawer"
                                >
                                    <div className="flex h-full flex-col bg-white shadow-2xl rounded-t-2xl">
                                        {/* Header */}
                                        <div className="flex items-start justify-between p-4 border-b border-ui-border-base">
                                            <div className="flex-1">
                                                <DialogTitle className="text-lg font-semibold text-ui-fg-base line-clamp-2">
                                                    {productTitle}
                                                </DialogTitle>
                                                {price && (
                                                    <p className="text-xl font-bold text-yello-orange mt-1">
                                                        {price}
                                                    </p>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-3 flex h-10 w-10 items-center justify-center rounded-lg text-ui-fg-subtle hover:bg-ui-bg-subtle transition-colors"
                                                onClick={onClose}
                                                data-testid="mobile-drawer-close-button"
                                            >
                                                <span className="sr-only">Fechar</span>
                                                <XMark className="h-6 w-6" />
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 overflow-y-auto p-4">
                                            {/* Variant Selector */}
                                            {variants.length > 0 && onSelectVariant && (
                                                <div className="mb-6">
                                                    <label className="block text-sm font-medium text-ui-fg-base mb-3">
                                                        Opções disponíveis
                                                    </label>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {variants.map((variant) => (
                                                            <button
                                                                key={variant.id}
                                                                type="button"
                                                                onClick={() => onSelectVariant(variant.id)}
                                                                className={`
                                  flex items-center justify-between p-3 rounded-lg border-2 transition-all
                                  ${selectedVariantId === variant.id
                                                                        ? 'border-yello-orange bg-yello-orange bg-opacity-5'
                                                                        : 'border-ui-border-base hover:border-ui-border-strong'
                                                                    }
                                `}
                                                                data-testid={`variant-option-${variant.id}`}
                                                            >
                                                                <div className="text-left">
                                                                    <p className="text-sm font-medium text-ui-fg-base">
                                                                        {variant.title}
                                                                    </p>
                                                                    {variant.options && variant.options.length > 0 && (
                                                                        <p className="text-xs text-ui-fg-subtle mt-0.5">
                                                                            {variant.options.map(o => o.value).join(' · ')}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                {variant.calculated_price && (
                                                                    <p className="text-sm font-semibold text-ui-fg-base">
                                                                        {new Intl.NumberFormat('pt-BR', {
                                                                            style: 'currency',
                                                                            currency: variant.calculated_price.currency_code,
                                                                        }).format(variant.calculated_price.calculated_amount / 100)}
                                                                    </p>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Quantity Selector */}
                                            <div className="mb-6">
                                                <label className="block text-sm font-medium text-ui-fg-base mb-3">
                                                    Quantidade
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-ui-border-base hover:bg-ui-bg-subtle transition-colors disabled:opacity-50"
                                                        disabled={quantity <= 1}
                                                        data-testid="quantity-decrease-button"
                                                    >
                                                        <span className="text-lg font-semibold">−</span>
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={quantity}
                                                        onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
                                                        className="flex h-10 w-20 items-center justify-center rounded-lg border border-ui-border-base bg-white text-center text-base font-medium focus:border-yello-orange focus:outline-none focus:ring-2 focus:ring-yello-orange focus:ring-opacity-20"
                                                        data-testid="quantity-input"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => onQuantityChange(quantity + 1)}
                                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-ui-border-base hover:bg-ui-bg-subtle transition-colors"
                                                        data-testid="quantity-increase-button"
                                                    >
                                                        <span className="text-lg font-semibold">+</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer CTA */}
                                        <div className="border-t border-ui-border-base bg-ui-bg-subtle p-4">
                                            <Button
                                                yelloVariant="primary"
                                                size="lg"
                                                fullWidth
                                                onClick={onAddToCart}
                                                loading={isAddingToCart}
                                                disabled={!selectedVariantId && variants.length > 0}
                                                data-testid="mobile-add-to-cart-button"
                                            >
                                                {isAddingToCart ? 'Adicionando...' : 'Adicionar ao carrinho'}
                                            </Button>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
