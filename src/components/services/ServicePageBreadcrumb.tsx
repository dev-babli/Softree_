import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type ServiceBreadcrumbItem = {
  label: string;
  href?: string;
};

type ServicePageBreadcrumbProps = {
  items: ServiceBreadcrumbItem[];
  className?: string;
};

export default function ServicePageBreadcrumb({
  items,
  className = "mb-8",
}: ServicePageBreadcrumbProps) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="text-[13px] text-[#0a0a1a]/45">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={`${item.label}-${index}`} className="contents">
              {index > 0 ? (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-3.5 w-3.5 text-[#0a0a1a]/25" />
                </BreadcrumbSeparator>
              ) : null}
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage className="font-semibold text-[#0a0a1a]">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className="font-medium transition-colors hover:text-[#0a0a1a]"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
