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
    {
      name: "IBM",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
      name: "Capgemini",
      src: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg",
    },
    {
      name: "Cognizant",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg",
    },
    {
      name: "Oracle",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    },
  ];

  return (
    <section className="relative pt-24 bg-gradient-to-b from-black via-[#020d1a] to-black text-white py-10">
      <div className="relative max-w-7xl mx-auto">
        <div
          className="
            relative
            bg-white
            rounded-t-[80px]
            shadow-[0_-30px_80px_rgba(0,0,0,0.35)]
            px-6 py-16
            overflow-hidden
          "
        >
          {/* Heading */}
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />

            <p className="text-2xl font-semibold tracking-widest uppercase bg-red-500 bg-clip-text text-transparent">
              Trusted by Partners & Clients
            </p>

            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent" />
          </div>

          {/* Infinite Scrolling Logos */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-16 items-center animate-scroll"
              style={{
                animation: "scrollLeft 5s linear infinite",
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.name}
                  className="h-18 w-auto object-contain opacity-80 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
