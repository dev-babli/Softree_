import NavigationClient from "@/components/sections/navigation-client";
import Footer from "@/components/sections/footer";

export default function ModelDrivenApp() {
  return (
    <section>
      <NavigationClient />
      <div className="mx-auto px-6 py-20">
        <Footer />
      </div>
    </section>
  );
}
