import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ConsultationModal } from './ConsultationModal';
import { PenTool, Cpu, Factory, Sliders } from 'lucide-react';

export function CustomMfg() {
  const { language } = useLanguage();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  
  const content = {
    ua: {
      title: "Виготовлення за технічним завданням",
      intro: "DAMINER розробляє та виготовляє пристрої, набори та спеціалізовані комплектації відповідно до технічних вимог замовника.",
      cta: "Отримати консультацію",
      cards: [
        {
          icon: <PenTool size={22} strokeWidth={1.25} />,
          title: "Індивідуальне виготовлення",
          desc: "Проектування рішень під ваші унікальні завдання."
        },
        {
          icon: <Cpu size={22} strokeWidth={1.25} />,
          title: "Розробка власних виробів",
          desc: "Від ідеї до готового до використання прототипу."
        },
        {
          icon: <Factory size={22} strokeWidth={1.25} />,
          title: "Серійне виробництво",
          desc: "Масштабування випуску з контролем якості."
        },
        {
          icon: <Sliders size={22} strokeWidth={1.25} />,
          title: "Індивідуальне комплектування",
          desc: "Створення спеціалізованих наборів обладнання."
        }
      ]
    },
    en: {
      title: "Custom Manufacturing",
      intro: "DAMINER develops and manufactures devices, kits, and specialized configurations according to the customer's technical requirements.",
      cta: "Get Consultation",
      cards: [
        {
          icon: <PenTool size={22} strokeWidth={1.25} />,
          title: "Custom Manufacturing",
          desc: "Engineering solutions for your unique challenges."
        },
        {
          icon: <Cpu size={22} strokeWidth={1.25} />,
          title: "Product Development",
          desc: "From initial concept to field-ready prototype."
        },
        {
          icon: <Factory size={22} strokeWidth={1.25} />,
          title: "Serial Production",
          desc: "Scaling manufacturing with strict quality control."
        },
        {
          icon: <Sliders size={22} strokeWidth={1.25} />,
          title: "Custom Configuration",
          desc: "Assembling specialized equipment kits."
        }
      ]
    }
  };

  const t = language === 'ua' ? content.ua : content.en;

  return (
    <>
      <section className="py-16 md:py-24 bg-off-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="max-w-3xl mb-10 md:mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark-navy tracking-tight mb-6"
            >
              {t.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-body text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-2xl"
            >
              {t.intro}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-metallic-silver/30 border-y border-metallic-silver/30 mb-10 md:mb-12">
            {t.cards.map((card, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                className="flex flex-col py-12 px-8 hover:bg-white transition-colors duration-400 group cursor-default"
              >
                <div className="text-primary-blue/70 mb-6 group-hover:text-primary-blue transition-colors duration-400">
                  {card.icon}
                </div>
                <h3 className="font-heading font-bold text-lg lg:text-xl text-dark-navy mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="font-body text-charcoal/70 text-[14px] leading-relaxed flex-1">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-start">
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="inline-flex items-center justify-center bg-primary-blue hover:bg-dark-navy text-white font-heading font-bold text-[11px] tracking-widest uppercase px-10 py-5 transition-colors duration-300 shadow-sm"
            >
              {t.cta}
            </button>
          </div>
          
        </div>
      </section>

      <ConsultationModal 
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </>
  );
}
