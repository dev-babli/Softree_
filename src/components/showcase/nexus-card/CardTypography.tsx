"use client";

import Image from "next/image";

/** Giant CARD letterforms — paths from follow.art */
export function CardTypography() {
  return (
    <div className="nexus-card-type" aria-hidden>
      <div className="nexus-card-type__svg-wrap">
        <svg
          className="nexus-card-type__svg nexus-card-type__svg--rd"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 680 685"
          fill="none"
          preserveAspectRatio="xMinYMin slice"
        >
          <path
            fill="#fff"
            d="M527.001 685V5h76.134c49.78 0 76.866 35.942 76.866 101.028v477.944c0 65.086-27.086 101.028-76.866 101.028h-76.134Zm62.225-78.686h13.909c9.517 0 14.641-9.714 14.641-27.2V111.858c0-18.458-5.124-28.172-14.641-28.172h-13.909v522.628Z"
          />
          <path
            fill="#fff"
            d="M352 685V5h75.853c49.597 0 76.583 35.943 76.583 101.029v118.514c0 64.114-20.422 99.086-58.349 99.086h-4.376v11.657h43.032L511 685h-61.995l-20.422-302.114h-13.858V685H352Zm62.725-374.971h13.128c9.482 0 14.587-10.686 14.587-28.172v-170c0-18.457-5.105-28.171-14.587-28.171h-13.128v226.343Z"
          />
        </svg>
        <svg
          className="nexus-card-type__svg nexus-card-type__svg--ca"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 680 685"
          fill="none"
          preserveAspectRatio="xMinYMin slice"
        >
          <path
            fill="#fff"
            d="m273.735 685-7.987-223.428h-30.496L227.265 685H167L190.235 5h121.256L334 685h-60.265ZM237.43 381.915h26.14l-5.809-161.258-1.452-138.914h-11.618l-1.452 138.914-5.809 161.258Z"
          />
          <path
            fill="#fff"
            d="M77.534 685C27.064 685 0 649.798 0 585.105V100.847C0 35.201 27.064 0 77.534 0c51.201 0 77.534 35.201 75.339 100.847l-5.851 180.765H84.848L90.7 105.603c.731-18.075-3.657-28.54-13.166-28.54s-14.63 10.465-14.63 28.54v473.794c0 18.075 5.121 28.541 14.63 28.541 8.777 0 13.166-10.466 13.166-28.541V389.118h62.173v195.987c0 64.693-26.332 99.895-75.34 99.895Z"
          />
        </svg>
      </div>
      <Image
        src="/showcase/nexus-card/your-word.svg"
        alt=""
        width={142}
        height={93}
        className="nexus-card-type__your"
        priority
      />
    </div>
  );
}
