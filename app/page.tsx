import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Hello World</h1>

      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        <Link href="/mobile">
          <button>Mobile App</button>
        </Link>

        <Link href="/web">
          <button>Web App</button>
        </Link>

           <Link href="/power-apps">
          <button>Power Apps</button>
        </Link>
            <Link href="/sharepoint">
          <button>SharePoint</button>
        </Link>
           <Link href="/spfx-developments">
          <button>SPFX Consulting</button>
        </Link>
          <Link href="/power-bi">
          <button>Power BI</button>
        </Link>
      </div>
    </div>
  );
}
