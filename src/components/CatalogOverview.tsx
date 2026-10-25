import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATALOG_CATEGORY_SLUGS, CATALOG_CATEGORY_IMAGES } from '../data/catalogCategories';

/**
 * Catalog landing grid (/catalog) — lists every product category as a card.
 */
export function CatalogOverview() {
  const { t } = useLanguage();

  const items = CATALOG_CATEGORY_SLUGS.map((slug, index) => ({
    slug,
    index,
    title: t.categories.items[index],
    description: t.categories.descriptions[index],
    imageUrl: CATALOG_CATEGORY_IMAGES[slug],
  })).filter((item) => Boolean(item.title));

  return (
    <section aria-labelledby="catalog-overview-heading" className="pt-12 md:pt-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <h2 id="catalog-overview-heading" className="sr-only">
          {t.categories.heading}
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {items.map((item) => (
            <motion.li
              key={item.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * item.index, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                id={`catalog-category-${item.slug}`}
                to={`/catalog/${item.slug}`}
                className="group relative h-full flex flex-col bg-white border border-[#E3E8EF] rounded-xl overflow-hidden hover:border-primary-blue/30 hover:shadow-[0_15px_40px_-10px_rgba(30,99,216,0.18)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute top-0 left-0 w-full h-[3px] bg-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                <div className="aspect-[4/3] bg-white flex items-center justify-center p-8 relative overflow-hidden border-b border-[#E3E8EF]/60 group-hover:border-primary-blue/20 transition-colors duration-300">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,99,216,0.06),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="font-heading font-black text-2xl md:text-3xl text-dark-navy mb-3 group-hover:text-primary-blue transition-colors duration-300 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-body text-charcoal/70 text-[15px] mb-6 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 group-hover:gap-3 font-heading font-black text-xs tracking-widest uppercase text-primary-blue mt-auto transition-all duration-300">
                    <span>{t.categories.learnMore.replace(/\s*→\s*$/, '')}</span>
                    <ArrowRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
