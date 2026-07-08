"use client"



import { motion, useInView } from "framer-motion"

import { useRef } from "react"



import { EASE_T } from "@/lib/motion"

import { AgenticSection } from "../primitives/AgenticSection"

import { enterpriseBenefits } from "../data"



export function AgenticAiEnterprise() {

  const { eyebrow, title, intro, left, right } = enterpriseBenefits

  const ref = useRef<HTMLDivElement>(null)

  const inView = useInView(ref, { once: true, margin: "-80px" })



  return (

    <AgenticSection badge={eyebrow} headline={title} body={intro}>

      <motion.div

        ref={ref}

        className="grid gap-8 md:grid-cols-2 md:gap-12"

        initial={{ opacity: 0, y: 24 }}

        animate={inView ? { opacity: 1, y: 0 } : {}}

        transition={{ duration: 0.7, ease: EASE_T.silk }}

      >

        {[left, right].map((column, colIndex) => (

          <ul key={colIndex} className="space-y-5">

            {column.map((item) => (

              <li key={item.title} className="flex gap-3 border-l-2 border-[#FF5812]/30 pl-4">

                <p className="text-[15px] leading-[1.7] text-[#0a0a1a]/70">

                  <strong className="font-semibold text-[#0a0a1a]">{item.title}</strong>

                  {": "}

                  {item.desc}

                </p>

              </li>

            ))}

          </ul>

        ))}

      </motion.div>

    </AgenticSection>

  )

}

