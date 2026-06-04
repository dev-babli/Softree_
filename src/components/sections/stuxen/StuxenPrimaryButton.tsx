"use client";

import Image from "next/image";
import Link from "next/link";
import "./StuxenShared.css";

const ARROW_SRC =
  "https://cdn.prod.website-files.com/68d113e98de4829d272b54f0/68d122fe2f5c678d4e6b90e3_Primary%20Btn%20Arrow.svg";

export function StuxenPrimaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="primary-button w-inline-block">
      <div className="primary-btn-text-wrap">
        <div className="primary-btn-text _01">{label}</div>
        <div className="primary-btn-text _02">{label}</div>
      </div>
      <div className="primary-btn-arrow-wrapper">
        <div className="primary-btn-arrow-wrap">
          <Image
            src={ARROW_SRC}
            alt=""
            width={18}
            height={18}
            className="primary-btn-arrow _01"
            unoptimized
          />
          <Image
            src={ARROW_SRC}
            alt=""
            width={18}
            height={18}
            className="primary-btn-arrow _02"
            unoptimized
          />
        </div>
      </div>
    </Link>
  );
}
