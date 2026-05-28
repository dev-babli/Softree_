"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type Logo = {
  src: string;
  alt: string;
};

type Panel = {
  id: string;
  tab: string;
  title: string;
  subtitle?: string;
  trustedLabel: string;
  bg: string;
  logos: Logo[];
};

const PANELS: Panel[] = [
  {
    id: "banking",
    tab: "Banking",
    title: "Banks, Credit Unions, Financial Institutions",
    trustedLabel: "Trusted by banking leaders:",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1998017adc89faa49388c_fshome.avif",
    logos: [
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d16b280cf184acd5e590_AAA.svg",
        alt: "AAA logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d16b6cd956c92977098e_Aegon.svg",
        alt: "Aegon logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d16aac459c673700a2bb_Assurant.svg",
        alt: "Assurant logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d16a9b88dbc782a95258_morgan%20stanly.svg",
        alt: "Morgan Stanley logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d16a3fc4d5387dd1d0dd_sabadell.svg",
        alt: "Sabadell logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1694dc8d42c1a4d8870_London%20stock%20exchange.svg",
        alt: "London Stock Exchange logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d16962ea60d4dff464a3_Mashreq.svg",
        alt: "Mashreq logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d169dede6644ae4bbf55_Metlife.svg",
        alt: "MetLife logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d169088703c8b81957b2_Huntington.svg",
        alt: "Huntington logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d169e8b76dfa0cd44e5a_deutsche%20bank.svg",
        alt: "Deutsche Bank logo in display.",
      },
    ],
  },
  {
    id: "healthcare",
    tab: "Healthcare",
    title: "Payers, Providers, Life Sciences",
    trustedLabel: "Trusted by healthcare leaders:",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c19a3bfda82c7f2e12c79a_healthcarehome.avif",
    logos: [
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d187f468feef05f862be_Johnson%26Johnson.svg",
        alt: "Johnson and Johnson logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d18798a6097b80c5b40d_Florida%20Blue.svg",
        alt: "Florida Blue logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d187b73a21e6d9a15ed5_Roche.svg",
        alt: "Roche logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1867de07694ae69d4d2_Pfizer.svg",
        alt: "Pfizer logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d186bf94b0a51baa22e9_Palomar%20Health.svg",
        alt: "Palomar Health logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d186289223b236d382d2_Bon%20Secours%20Mercy%20Health.svg",
        alt: "Bon Secours Mercy Health logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d186ec53db2ef3ad8a25_Otsuka.svg",
        alt: "Otsuka logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d186b30b24a8a960deae_CareFirst.svg",
        alt: "CareFirst logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1863eb88cfb34a5e9e9_United%20Health.svg",
        alt: "United Health logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1865c5f0a8291a89459_Garnet%20Health.svg",
        alt: "Garnet Health logo in display.",
      },
    ],
  },
  {
    id: "retail",
    tab: "Retail",
    title: "Consumer Goods and Services",
    subtitle:
      "Make work more efficient, intelligent, and valuable across the organization.",
    trustedLabel: "Trusted by consumer leaders:",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c19a3b38b198ea6f222a3f_351a023e6b7126c0fc226cf7c9d3a1df_consumerhome.avif",
    logos: [
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1d565c54e2bc4461686_Colgate.svg",
        alt: "Colgate logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1d539323cddc94bdcea_Alaska.svg",
        alt: "Alaska logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1d53ac70422fa9bcc99_Nu%20Skin.svg",
        alt: "Nu Skin logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1d50b9a5ce5d8240aba_Columbia.svg",
        alt: "Columbia logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1d5e6083727c0b05de1_LG.svg",
        alt: "LG logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1d54d990662d8d2bc96_CocaCola.svg",
        alt: "Coca-Cola logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1d536aa4072ccc75d6d_Enbridge.svg",
        alt: "Enbridge logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1d55175ebd3c68e46e5_Carrier.svg",
        alt: "Carrier logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1d4249f4c82ff895a65_Bosch.svg",
        alt: "Bosch logo in display.",
      },
    ],
  },
  {
    id: "telecom",
    tab: "Telecom + Media",
    title: "Telecom, Media, Communications",
    subtitle:
      "Make work more efficient, intelligent, and valuable across the organization.",
    trustedLabel: "Trusted by telecom leaders:",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c19a3bfdc0d853dd98ecae_telecomhome.avif",
    logos: [
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a882fcfcad876f0ba1_Charter.svg",
        alt: "Charter logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a7552ceaa0ab3d0f3d_Autodesk.svg",
        alt: "Autodesk logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a779541145c7a86f8c_Wade%26Wendy.svg",
        alt: "Wade and Wendy logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a79cab0f637a1e5c60_Deutche%20Telekom.svg",
        alt: "Deutsche Telekom logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a7088703c8b8196ed5_Frontier.svg",
        alt: "Frontier logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a725d610c7736dbc19_Netapp.svg",
        alt: "NetApp logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a79c9803fbacc6b5aa_Altafiber.svg",
        alt: "Altafiber logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a724314d377a3debc5_Nable.svg",
        alt: "N-able logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a7cc2cec440e4e0646_ebay.svg",
        alt: "eBay logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1a6d6754df1a384f29f_AT%26T.svg",
        alt: "AT and T logo in display.",
      },
    ],
  },
  {
    id: "business",
    tab: "Business",
    title: "B2B Goods and Services",
    subtitle:
      "Make work more efficient, intelligent, and valuable across the organization.",
    trustedLabel: "Trusted by business leaders:",
    bg: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c19a3b2513192e19a6dcc2_b2bhome.avif",
    logos: [
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1eeab7a117935edb93f_Tata.svg",
        alt: "Tata logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1eeac459c673700cd62_Equinix.svg",
        alt: "Equinix logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1ee5024a2e507c6f9ba_Mphasis.svg",
        alt: "Mphasis logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1ee3f9b13078b1bc243_Airbus.svg",
        alt: "Airbus logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1ee31659ce1320cbaf4_Nippon%20Steel.svg",
        alt: "Nippon Steel logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1eecc2cec440e4e1c67_Genpact.svg",
        alt: "Genpact logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1ee9b88dbc782a98925_Shell.svg",
        alt: "Shell logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1ed0792339a0d62f81d_Konecta.svg",
        alt: "Konecta logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1ed25d610c7736dcdd6_Capgemini.svg",
        alt: "Capgemini logo in display.",
      },
      {
        src: "https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/68c1d1eddfbd288aa4f7f223_Teleperformance.svg",
        alt: "Teleperformance logo in display.",
      },
    ],
  },
];

export default function KoreEnterpriseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const marqueeSets = useMemo(
    () =>
      PANELS.map((panel) => ({
        ...panel,
        marquee: [...panel.logos, ...panel.logos],
      })),
    []
  );

  const activateTab = (index: number) => {
    setActiveIndex(index);
    const node = cardRefs.current[index];
    node?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section className="relative overflow-hidden bg-[#070708] py-20 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 20% 20%, rgba(255,122,47,0.06), transparent 65%), radial-gradient(40% 35% at 85% 75%, rgba(24,82,255,0.05), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:gap-10">
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-6 backdrop-blur-sm md:px-8 md:py-8">
            <div className="space-y-5">
              <h2 className="max-w-[18ch] text-[2.05rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
                We&apos;ve built our business by serving global enterprises
              </h2>
              <p className="text-[1rem] text-white/65">
                Across banking, healthcare, retail, telecom, and B2B sectors.
              </p>
            </div>
            <div className="mt-10 border-t border-dotted border-white/15 pt-6">
              <p className="max-w-[26ch] text-[0.95rem] leading-relaxed text-white/50">
                Discover how teams partner with Softree across regulated and complex industries.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-[4px] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-white/90"
                >
                  Start a project
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center rounded-[4px] border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white/50 hover:bg-white/5"
                >
                  See case studies
                </Link>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap gap-2">
              {marqueeSets.map((panel, index) => (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() => activateTab(index)}
                  className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.11em] transition ${
                    activeIndex === index
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-white/[0.04] text-white/60 hover:border-white/30 hover:text-white/85"
                  }`}
                >
                  {panel.tab}
                </button>
              ))}
            </div>

            <div
              ref={scrollerRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
            >
              {marqueeSets.map((panel, index) => (
                <div
                  key={panel.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="relative h-[440px] w-[86%] min-w-[86%] snap-start overflow-hidden rounded-[10px] ring-1 ring-white/10 md:h-[470px] md:w-[76%] md:min-w-[76%]"
                >
                  <img
                    src={panel.bg}
                    alt={panel.title}
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.82] saturate-[0.95]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/85" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
                    <div>
                      <h3 className="max-w-[20ch] text-[2rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white md:text-[2.35rem]">
                        {panel.title}
                      </h3>
                      {panel.subtitle ? (
                        <p className="mt-3 max-w-[58ch] text-sm text-white/88">{panel.subtitle}</p>
                      ) : null}
                    </div>

                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/90">
                        {panel.trustedLabel}
                      </p>
                      <div className="overflow-hidden rounded-md border border-white/10 bg-black/35 p-2 backdrop-blur-sm">
                        <div className="kore-marquee-track">
                          {panel.marquee.map((logo, logoIndex) => (
                            <div
                              key={`${logo.src}-${logoIndex}`}
                              className="inline-flex h-10 min-w-[128px] items-center justify-center rounded-md bg-white/10 px-3 backdrop-blur-[2px]"
                            >
                              <img src={logo.src} alt={logo.alt} className="max-h-5 w-auto object-contain" loading="lazy" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .kore-marquee-track {
          display: inline-flex;
          width: max-content;
          gap: 0.55rem;
          animation: kore-marquee 24s linear infinite;
        }
        @keyframes kore-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
