import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export function Terms() {
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
              УМОВИ ВИКОРИСТАННЯ
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
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                Сайт є інформаційно-довідковим ресурсом, призначеним для ознайомлення Користувачів з асортиментом товарів, наборів, їх характеристиками, комплектацією та вартістю.
              </p>
              <p className="font-body leading-relaxed">
                Інформація про товари, набори, їх характеристики, комплектацію, фотографії, описи та ціни розміщується на Сайті для ознайомлення Користувачів.
              </p>
              <p className="font-body leading-relaxed">
                Якщо Користувач бажає змінити комплектацію набору, склад товару, кількість, технічні характеристики або інші параметри, остаточна ціна визначається індивідуально відповідно до погодженого сторонами технічного завдання та фактичної комплектації.
              </p>
              <p className="font-body leading-relaxed">
                Сайт не передбачає автоматичного укладення договору купівлі-продажу шляхом оформлення замовлення безпосередньо на Сайті.
              </p>
              <p className="font-body leading-relaxed">
                Замовлення може погоджуватися Користувачем та Власником Сайту за допомогою телефону, електронної пошти, месенджерів або іншим погодженим сторонами способом.
              </p>
              <p className="font-body leading-relaxed">
                Обробка персональних даних Користувачів здійснюється відповідно до Політики конфіденційності та обробки персональних даних, розміщеної на Сайті.
              </p>
              <p className="font-body leading-relaxed">
                Надаючи свої персональні дані, Користувач повинен ознайомитися з відповідною Політикою конфіденційності.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
