import EngineeringSolutionsSection from "@/components/sections/engineering-solutions/EngineeringSolutionsSection";

/* Standalone preview route for the "Engineering Solutions Built for Impact"
 * marketing block. Lives on its own surface so it can be reviewed pixel-by-
 * pixel against the design reference without competing with site chrome. */
export default function Page() {
    return (
        <main className="min-h-screen w-full" style={{ background: "#FAFAFA" }}>
            <EngineeringSolutionsSection />
        </main>
    );
}
