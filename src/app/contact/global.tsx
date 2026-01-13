"use client";

const locations = [
  {
    title: "INDIA (HQ)",
    map: "https://www.google.com/maps?q=Ahmedabad%20Gujarat&output=embed",
    address: (
      <>
        Softree Technology Pvt. Ltd.
        <br />
        Ahmedabad, Gujarat,
        <br />
        India
      </>
    ),
    phone: "+91 8000-161-161",
    highlight: true,
  },
  {
    title: "USA Office",
    map: "https://www.google.com/maps?q=New%20York%20United%20States&output=embed",
    address: (
      <>
        Softree Technologies USA
        <br />
        New York, NY,
        <br />
        United States
      </>
    ),
    phone: "+1 (309) 791-4105",
  },
  {
    title: "UK Office",
    map: "https://www.google.com/maps?q=London%20United%20Kingdom&output=embed",
    address: (
      <>
        Softree Technologies UK
        <br />
        London,
        <br />
        United Kingdom
      </>
    ),
    phone: "+44 20 7946 0958",
  },
  {
    title: "UAE Office",
    map: "https://www.google.com/maps?q=Dubai%20United%20Arab%20Emirates&output=embed",
    address: (
      <>
        Softree Technologies Middle East
        <br />
        Dubai,
        <br />
        United Arab Emirates
      </>
    ),
    phone: "+971 4 123 4567",
  },
];

export default function GlobalLocations() {
  return (
    <section className="bg-black py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold">Global Locations</h2>

        <p className="max-w-3xl text-gray-300 mb-16">
          Softree operates across key global markets to deliver scalable,
          secure, and future-ready digital solutions. Our distributed presence
          enables us to collaborate closely with clients, ensure faster
          delivery, and provide localized support worldwide.
        </p>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-14">
          {locations.map((loc, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 ${
                loc.highlight ? "bg-indigo-600" : "bg-white/5 backdrop-blur-xl"
              }`}
            >
              {/* MAP */}
              <iframe
                className="w-full h-[320px] grayscale contrast-125"
                src={loc.map}
                loading="lazy"
              />

              {/* CONTENT */}
              <div className="p-8 relative">
                <h3 className="text-xl font-semibold mb-4">{loc.title}</h3>

                <p
                  className={`text-sm leading-relaxed ${
                    loc.highlight ? "opacity-90" : "text-gray-300"
                  }`}
                >
                  {loc.address}
                </p>

                <p
                  className={`mt-6 font-medium ${
                    loc.highlight ? "text-white" : "text-indigo-400"
                  }`}
                >
                  {loc.phone}
                </p>

                {/* Icon */}
                <div className="absolute bottom-6 right-6 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                  📍
                </div>

                {/* Decorative dots for HQ */}
                {loc.highlight && (
                  <div className="absolute bottom-6 left-8 flex gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-white/40"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
