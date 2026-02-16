export default function TrustedBy() {
  const logos = [
    { name: "Accenture", src: "https://cdn.simpleicons.org/accenture" },
    { name: "Infosys", src: "https://cdn.simpleicons.org/infosys" },
    { name: "Wipro", src: "https://cdn.simpleicons.org/wipro" },
    { name: "HCL", src: "https://cdn.simpleicons.org/hcl" },
    { name: "TCS", src: "https://cdn.simpleicons.org/tcs" },
    { name: "Sanofi", src: "/images/logo/sanofi.jpg" },
    {
      name: "Microsoft",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
  ];

  return (
    <section className="relative pt-24 bg-gradient-to-b from-black via-[#020d1a] to-black text-white">
      {/* ================= FLOATING WHITE SURFACE ================= */}
      <div className="relative max-w-7xl mx-auto">
        <div
          className="
            relative
            bg-white
            rounded-t-[80px]
            shadow-[0_-30px_80px_rgba(0,0,0,0.35)]
            px-6 py-16
          "
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

            <p
              className="text-2xl font-semibold tracking-widest uppercase
               bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400
               bg-clip-text text-transparent"
            >
              Trusted by Partners & Clients
            </p>

            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />
          </div>

          {/* logos */}
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
            {logos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                className="
    h-18 w-auto object-contain
  "
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
