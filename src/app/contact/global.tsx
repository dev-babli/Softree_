"use client";
import { MapPin, Phone, Mail } from "lucide-react";

const locations = [
  {
    title: "Cuttack Office",
    map: "https://www.google.com/maps?q=CDA%20Sector%2010%20Cuttack%20Odisha&output=embed",
    address: (
      <>
        Softree Technology Pvt. Ltd.
        <br />
        PLOT 5C/1283, SECTOR-10, CDA Cuttack, Odisha 753014
        <br />
        Odisha, India
      </>
    ),
    phone: "+91 91786 65408",
    mail: "soumyap@softreetechnology.com",
    salesPerson: "Soumya Priyadarshini",
    highlight: true,
  },

  {
    title: "Bengaluru Office",
    map: "https://www.google.com/maps?q=Bengaluru%20India&output=embed",
    address: (
      <>
        Softree Technology Pvt. Ltd.
        <br />
        Flat no. B308, Kempapura,Bengaluru, 560037,
        <br />
        India
      </>
    ),
    phone: "+91 90404 92078",
    mail: "shradhab@softreetechnology.com",
    salesPerson: "Shradha Bhagat",
  },
  {
    title: "USA Office",
    map: "https://www.google.com/maps?q=New%20York%20United%20States&output=embed",
    address: (
      <>
        Softree Technology Pvt. Ltd.
        <br />
        New York, NY,
        <br />
        United States
      </>
    ),
    phone: "+1 (309) 791-4105",
    salesPerson: "Emily Carter",
    mail: "emily.carter@softreetechnology.com",
  },
];

export default function GlobalLocations() {
  return (
    <section className="bg-white text-gray-900">
      {/* subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50 via-white to-blue-50" />

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold">Global Locations</h2>

        <p className="max-w-3xl text-gray-600 mb-10">
          Softree operates across key global markets to deliver scalable,
          secure, and future-ready digital solutions. Our distributed presence
          enables us to collaborate closely with clients, ensure faster
          delivery, and provide localized support worldwide.
        </p>
        {/* ================= LOCATIONS GRID ================= */}
        <div className="space-y-10">
          {/* ================= HQ ================= */}
          {locations
            .filter((l) => l.highlight)
            .map((loc, i) => (
              <div
                key={`hq-${i}`}
                className="
        group
        grid md:grid-cols-2
        rounded-3xl overflow-hidden
        border border-cyan-400/40
        bg-gradient-to-br from-gray-900 to-gray-800
        shadow-2xl
      "
              >
                {/* MAP */}
                <div className="relative h-full min-h-[400px]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={loc.map}
                    loading="lazy"
                  />

                  {/* HQ badge on map */}
                  <div className="absolute top-4 left-4 px-3 py-1 text-xs font-bold bg-cyan-400 text-black rounded-full">
                    HEADQUARTERS
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative p-10 flex justify-center text-white">
                  {/* CENTERED INNER */}
                  <div className="w-full max-w-xl flex flex-col justify-between">
                    {/* TOP */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold flex items-center gap-3">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/20 ring-1 ring-cyan-400/30">
                          <MapPin className="w-5 h-5 text-cyan-400" />
                        </span>
                        {loc.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed border-l-2 border-cyan-400/40 pl-4">
                        {loc.address}
                      </p>
                    </div>

                    {/* CONTACT */}
                    <div className="mt-8 space-y-5">
                      {/* Phone */}
                      <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800 ring-1 ring-white/10">
                          <Phone className="w-4 h-4 text-cyan-400" />
                        </span>

                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400">Phone</span>
                          <a
                            href={`tel:${loc.phone}`}
                            className="font-semibold hover:text-cyan-400 transition"
                          >
                            {loc.phone}
                          </a>
                        </div>
                      </div>

                      {/* Sales */}
                      {loc.salesPerson && (
                        <div className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800 ring-1 ring-white/10">
                            👤
                          </span>

                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400">
                              Sales Contact
                            </span>
                            <span className="font-semibold">
                              {loc.salesPerson}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      {loc.mail && (
                        <div className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800 ring-1 ring-white/10">
                            <Mail className="w-4 h-4 text-cyan-400" />
                          </span>

                          <div className="flex flex-col min-w-0">
                            <span className="text-xs text-gray-400">Email</span>
                            <a
                              href={`mailto:${loc.mail}`}
                              className="font-semibold hover:text-cyan-400 transition break-all"
                            >
                              {loc.mail}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* ================= OTHER OFFICES ================= */}
          <div className="grid lg:grid-cols-2 gap-8">
            {locations
              .filter((l) => !l.highlight)
              .map((loc, i) => (
                <div
                  key={`other-${i}`}
                  className="
            group
            grid md:grid-cols-2
            rounded-3xl overflow-hidden
            border border-white/10
            bg-gradient-to-br from-gray-900 to-gray-800
            shadow-lg
            hover:shadow-2xl hover:-translate-y-1
            transition-all duration-300
          "
                >
                  {/* MAP */}
                  <div className="relative h-full min-h-[320px]">
                    <iframe
                      className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition duration-500"
                      src={loc.map}
                      loading="lazy"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="relative p-8 flex flex-col justify-between text-white">
                    {/* TOP */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/20">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                        </span>
                        {loc.title}
                      </h3>

                      <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-cyan-400/40 pl-4">
                        {loc.address}
                      </p>
                    </div>

                    {/* CONTACT */}
                    <div className="mt-6 space-y-4">
                      {/* Phone */}
                      <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-800">
                          <Phone className="w-4 h-4 text-cyan-400" />
                        </span>

                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400">Phone</span>
                          <a
                            href={`tel:${loc.phone}`}
                            className="font-semibold hover:text-cyan-400 transition"
                          >
                            {loc.phone}
                          </a>
                        </div>
                      </div>

                      {/* Sales */}
                      {loc.salesPerson && (
                        <div className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-800">
                            👤
                          </span>

                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400">
                              Sales Contact
                            </span>
                            <span className="font-semibold">
                              {loc.salesPerson}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      {loc.mail && (
                        <div className="flex items-start gap-3">
                          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-800">
                            <Mail className="w-4 h-4 text-cyan-400" />
                          </span>

                          <div className="flex flex-col min-w-0">
                            <span className="text-xs text-gray-400">Email</span>
                            <a
                              href={`mailto:${loc.mail}`}
                              className="font-semibold hover:text-cyan-400 transition break-all"
                            >
                              {loc.mail}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
