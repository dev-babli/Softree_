export default function TrustedBy() {
  const logos = [
    { name: "GO ERP", src: "/images/logo/goerp1.jpg" },
    { name: "Nuvento", src: "/images/logo/nuvento.jpg" },
    { name: "Snapon", src: "/images/logo/snapon.jpg" },
    {
      name: "Jonians",
      src: "/images/logo/jonians.jpg",
    },
    { name: "Export Control Group", src: "/images/logo/ecg.png" },
    { name: "SP Marketplace", src: "/images/logo/1.jpg" },
    { name: "Bosch", src: "/images/logo/bosch.png" },
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

           <p
  className="text-2xl font-semibold tracking-widest uppercase inline-block bg-clip-text text-transparent"
  style={{
    backgroundImage:
      "linear-gradient(90deg, #ff7a2f 0%, #c75a2a 35%, #6b5b5b 70%, #3a3a3a 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
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
