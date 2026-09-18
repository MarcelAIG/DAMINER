import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function Warranty() {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[90px] min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative bg-dark-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-70 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, #1e63d8 0%, transparent 80%)'
        }}></div>
        <div className="absolute inset-0 bg-mesh pointer-events-none z-[5]"></div>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading font-bold text-3xl md:text-5xl tracking-tight uppercase">
              ГАРАНТІЙНЕ ОБСЛУГОВУВАННЯ ПРОДУКЦІЇ
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 flex-grow bg-white">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-charcoal/80"
          >
            <div className="space-y-4 mb-16">
              <p className="font-body leading-relaxed">
                ТОВ «ДАМІНЕР» гарантує належну якість продукції власного виробництва за умови дотримання покупцем правил її транспортування, монтажу, експлуатації та зберігання.
              </p>
              <p className="font-body leading-relaxed">
                Гарантійний термін для більшості категорій - 1 рік. Для окремих комплектів та наборів може становити до 3 років.
              </p>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Що включає гарантія
            </h2>
            
            <div className="space-y-4 mb-16">
              <p className="font-body leading-relaxed">
                Протягом гарантійного строку ТОВ «ДАМІНЕР» забезпечує гарантійне обслуговування продукції у разі виявлення недоліків, які виникли з вини виробника та не є наслідком порушення правил експлуатації продукції.
              </p>
              <p className="font-body leading-relaxed">
                Залежно від характеру та причин виявленого недоліку гарантійне обслуговування може передбачати:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body">
                <li>безоплатне усунення недоліків;</li>
                <li>ремонт продукції або її окремих складових;</li>
                <li>заміну дефектних складових;</li>
                <li>інший спосіб усунення недоліку, передбачений законодавством України або погоджений сторонами.</li>
              </ul>
              <p className="font-body leading-relaxed">
                Для звернення щодо гарантійного обслуговування покупцю необхідно повідомити ТОВ «ДАМІНЕР» про виявлений недолік та надати інформацію, необхідну для його ідентифікації.
              </p>
              <p className="font-body leading-relaxed">
                За можливості покупець надає:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body">
                <li>найменування продукції;</li>
                <li>номер замовлення, рахунку, накладної або іншого документа, що підтверджує придбання;</li>
                <li>дату придбання або отримання продукції;</li>
                <li>опис виявленого недоліку;</li>
                <li>фото- або відеоматеріали, якщо вони допомагають визначити характер несправності;</li>
                <li>іншу інформацію, необхідну для розгляду гарантійного звернення.</li>
              </ul>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Випадки, на які гарантія не поширюється
            </h2>
            
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                Гарантійне обслуговування не поширюється на недоліки та пошкодження, якщо вони виникли внаслідок:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body">
                <li>порушення правил монтажу або встановлення продукції;</li>
                <li>порушення правил експлуатації, зберігання або транспортування;</li>
                <li>використання продукції не за призначенням;</li>
                <li>внесення конструктивних змін без погодження з виробником;</li>
                <li>ремонту, розбирання або втручання в конструкцію продукції особами, які не мають відповідних повноважень;</li>
                <li>механічних пошкоджень, що виникли після передачі продукції покупцю;</li>
                <li>впливу агресивного середовища, хімічних речовин або інших зовнішніх факторів, якщо така експлуатація не передбачена технічним завданням або документацією на продукцію;</li>
                <li>використання продукції з порушенням технічних вимог або рекомендацій виробника;</li>
                <li>природного зносу деталей і складових, якщо такий знос не є наслідком виробничого дефекту;</li>
                <li>інших обставин, які відповідно до законодавства України виключають відповідальність виробника за відповідний недолік.</li>
              </ul>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
