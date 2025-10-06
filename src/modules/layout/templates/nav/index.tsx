import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import { MainNav } from "@modules/layout/components/nav/MainNav"
import { MobileNav } from "@modules/layout/components/nav/MobileNav"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative mx-auto border-b duration-200 bg-white border-geist-200 shadow-sm">
        {/* Desktop Navigation */}
        <nav className="content-container flex items-center justify-between w-full h-20 text-small-regular">
          <MainNav />

          {/* Right side - Cart */}
          <div className="hidden lg:flex items-center gap-x-4 h-full">
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </header>
    </div>
  )
}
