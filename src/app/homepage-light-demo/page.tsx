import type { Metadata } from "next";
import HomeDemo from "./home-page-demo";

export const metadata: Metadata = {
    title: "Softree — Homepage Light Demo (Preview)",
    description:
        "Internal preview of the redesigned homepage in the About Us design language. Not indexed.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
    },
};

export default function HomepageLightDemoPage() {
    return <HomeDemo />;
}
