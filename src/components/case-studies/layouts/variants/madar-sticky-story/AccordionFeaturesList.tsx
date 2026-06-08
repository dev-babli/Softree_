"use client"

import type { ComponentType } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import {
  Boxes,
  Clock,
  MessageSquare,
  Network,
  PackageCheck,
  Scale,
  ShieldCheck,
  Truck,
  Users,
  Wallet,
  ChevronDown,
} from "lucide-react"
import type { MadarAccordionItem, MadarIconKey } from "./types"

const ICONS: Record<MadarIconKey, ComponentType<{ className?: string }>> = {
  transportation: Truck,
  fleet: Users,
  communication: MessageSquare,
  load: Scale,
  delivery: PackageCheck,
  compliance: ShieldCheck,
  centralized: Network,
  package: Boxes,
  time: Clock,
  wallet: Wallet,
}

type Props = {
  items: MadarAccordionItem[]
  variant?: "light" | "dark"
  wide?: boolean
}

export function AccordionFeaturesList({ items, variant = "light", wide = false }: Props) {
  return (
    <Accordion.Root type="single" collapsible className={`madar-accordion madar-accordion--${variant}`}>
      {items.map((item) => {
        const Icon = ICONS[item.icon]
        return (
          <Accordion.Item
            key={item.id}
            value={item.id}
            className={`madar-accordion__item${wide ? " madar-accordion__item--wide" : ""}`}
          >
            <div className="madar-accordion__row">
              <div className="madar-accordion__icon">
                <Icon className="madar-accordion__icon-svg" aria-hidden />
              </div>
              <div className="madar-accordion__content">
                <Accordion.Header>
                  <Accordion.Trigger className="madar-accordion__trigger">
                    <span className="madar-accordion__title">{item.title}</span>
                    <span className="madar-accordion__toggle" aria-hidden>
                      <ChevronDown className="madar-accordion__chevron" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="madar-accordion__panel">
                  <p className="madar-accordion__text">{item.description}</p>
                </Accordion.Content>
              </div>
            </div>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}
