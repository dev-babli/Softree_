import { Play } from "lucide-react";

export default function PowerBIBenefits() {
  const left = [
    {
      title: "Real-Time Operational Visibility",
      desc: "Gain a unified, real-time view of your business operations with Power BI dashboards, enabling teams to identify inefficiencies, monitor KPIs, and respond proactively.",
    },
    {
      title: "Intelligent Decision-Making",
      desc: "Convert complex data into clear, interactive insights that empower leadership to make faster, data-driven decisions with accuracy and confidence.",
    },
    {
      title: "Enhanced Workforce Productivity",
      desc: "Streamline reporting and eliminate manual processes, allowing teams to focus on strategic initiatives and high-impact analysis.",
    },
  ];

  const right = [
    {
      title: "Enterprise-Scale Analytics",
      desc: "Scale analytics seamlessly across your organization with centralized data models and deep integration across multiple data sources.",
    },
    {
      title: "Deep Interactive Exploration",
      desc: "Empower users with dynamic dashboards, drill-through capabilities, and rich visualizations for deeper data exploration and understanding.",
    },
    {
      title: "Sustained Competitive Advantage",
      desc: "Leverage Power BI to uncover insights faster, improve operational efficiency, and stay ahead with continuous data-driven innovation.",
    },
  ];

  return (
    <section className="py-12 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-wider uppercase text-orange-600">
            Business Impact
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Redefining Business Intelligence Through Power BI Analytics
          </h2>
        </div>

        {/* description */}
        <p className="mt-6 text-slate-600 leading-relaxed max-w-5xl">
          Power BI enables organizations to turn data into a strategic asset.
          With interactive dashboards, real-time analytics, and seamless
          integration across data sources, businesses can uncover insights,
          optimize performance, and drive smarter decisions at scale.
        </p>

        {/* grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 mt-10">
          {/* LEFT */}
          <div className="space-y-6">
            {left.map((item, i) => (
              <div key={i} className="flex gap-4">
                <Play className="w-3.5 h-3.5 mt-1.5 text-orange-500 fill-orange-500 shrink-0" />

                <p className="text-slate-700 leading-relaxed">
                  <span className="font-semibold">{item.title}</span> –{" "}
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {right.map((item, i) => (
              <div key={i} className="flex gap-4">
                <Play className="w-3.5 h-3.5 mt-1.5 text-orange-500 fill-orange-500 shrink-0" />

                <p className="text-slate-700 leading-relaxed">
                  <span className="font-semibold">{item.title}</span> –{" "}
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
