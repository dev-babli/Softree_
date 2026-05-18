const cards = [
  {
    title: "Early Fabric Experts",
    desc: "Proven experience since preview stage.",
  },
  {
    title: "Global Delivery",
    desc: "Local support with worldwide reach.",
  },
  {
    title: "2,200+ Clients",
    desc: "Trusted Microsoft Solutions Partner.",
  },
  {
    title: "100+ Projects",
    desc: "End-to-end Fabric implementations.",
  },
];

function CheckCircle() {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        border: "2px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

export default function FabricPartner() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#f8f9fc] pt-20 pb-10 px-8 text-center">
        <h1 className="text-4xl font-bold text-black leading-tight max-w-5xl mx-auto mb-3">
          Microsoft Fabric Expertise by Softree
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-base">
          Softree helps businesses connect data, build insights, and make
          smarter decisions with Microsoft Fabric.
        </p>
      </section>

      {/* Cards Section */}
      <section className="bg-[#f8f9fc] pb-32 px-8">
        <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center text-center gap-5 pt-8 px-6 pb-8
              bg-gradient-to-r from-black via-[#0f2f7a] to-black
              rounded-xl shadow-lg
              hover:scale-105 transition-transform duration-300"
            >
              <CheckCircle />

              <div>
                <h3 className="text-white font-bold text-lg mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
