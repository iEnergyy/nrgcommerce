"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  About: "/about",
  Contact: "/contact",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-300 focus:outline-none hover:text-ui-fg-base group/menu"
                >
                  <span className="relative px-3 py-2 text-sm font-medium tracking-wide uppercase">
                    Menu
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 group-hover/menu:scale-x-100"></span>
                  </span>
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300"
                enterFrom="opacity-0 translate-x-[-100%]"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-[-100%]"
              >
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-white border border-gray-200 rounded-xl shadow-2xl justify-between p-8"
                  >
                    {/* Header with close button */}
                    <div className="flex justify-between items-center mb-8">
                      <div className="text-2xl font-bold text-gray-900 tracking-wider">
                        NRG
                      </div>
                      <button 
                        data-testid="close-menu-button" 
                        onClick={close}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <XMark className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex flex-col gap-2 items-start justify-start flex-1">
                      {Object.entries(SideMenuItems).map(([name, href], index) => {
                        return (
                          <li key={name} className="w-full">
                            <LocalizedClientLink
                              href={href}
                              className="block w-full px-4 py-4 text-xl font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:translate-x-2 group"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                              style={{
                                animationDelay: `${index * 100}ms`,
                                animation: open ? 'fadeInUp 0.5s ease-out forwards' : 'none'
                              }}
                            >
                              <span className="flex items-center justify-between">
                                {name}
                                <ArrowRightMini className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </span>
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Footer */}
                    <div className="flex flex-col gap-y-6 pt-8 border-t border-gray-100">
                      <div
                        className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "w-4 h-4 text-gray-500 transition-transform duration-200",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="text-xs text-gray-500 text-center">
                        © {new Date().getFullYear()} NRG. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
