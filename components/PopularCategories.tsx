import Image from "next/image";
import Link from "next/link";
import { popularCategories } from "@/lib/home";

export default function PopularCategories() {
  return (
    <section>
      <h2 className="section-title mb-4">Popular categories</h2>
      <div className="no-scrollbar flex gap-5 overflow-x-auto pb-1">
        {popularCategories.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group relative block w-[200px] shrink-0 overflow-hidden rounded-lg sm:w-[220px]"
          >
            <div className="relative aspect-[16/11] w-full bg-surface">
              <Image
                src={c.image}
                alt={c.label}
                fill
                sizes="220px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-3 text-[15px] font-bold text-white drop-shadow">
                {c.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
