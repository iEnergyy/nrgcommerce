import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b border-gray-200 duration-300 bg-white/95 backdrop-blur-sm shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Left side - Menu */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-300 tracking-wider"
              data-testid="nav-store-link"
            >
              NRG
            </LocalizedClientLink>
          </div>

          {/* Right side - Account & Cart */}
          <div className="flex items-center gap-x-8 h-full flex-1 basis-0 justify-end">
            {/* Account Link - Isolated from cart updates */}
            <div className="hidden small:flex items-center h-full">
              <LocalizedClientLink
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 group/account"
                href="/account"
                data-testid="nav-account-link"
              >
                <span className="relative">
                  Account
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 group-hover/account:scale-x-100"></span>
                </span>
              </LocalizedClientLink>
            </div>
            
            {/* Cart Button - Separate container */}
            <div className="flex items-center h-full">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2 group/cart"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    <span className="relative">
                      Cart (0)
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 group-hover/cart:scale-x-100"></span>
                    </span>
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
