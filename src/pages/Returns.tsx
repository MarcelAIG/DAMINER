import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export function Returns() {
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
              ПОВЕРНЕННЯ ТА ОБМІН
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
                Компанія «Дамінер» здійснює повернення та обмін товарів належної якості.
              </p>
              <p className="font-body leading-relaxed">
                Відповідно до Закону України «Про захист прав споживачів» Ви можете протягом 14 днів з моменту покупки повернути товари, придбані, за умови виконання всіх норм, передбачених законом.
              </p>
            </div>

            <div className="space-y-4 mb-16">
              <p className="font-body leading-relaxed">
                Повернення товару належної якості здійснюється:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body">
                <li>якщо він не використовувався;</li>
                <li>якщо збережено його товарний вигляд, споживчі властивості, пломби, ярлики;</li>
                <li>за наявності розрахункового документа, виданого покупцю разом із проданим товаром.</li>
              </ul>
              <p className="font-body leading-relaxed">
                Повернення товарів належної якості оплачується Вами.
              </p>
              <p className="font-body leading-relaxed">
                За умови отримання Вами товару з властивостями, що не відповідають зазначеним у замовленні, повернення буде організовано за наш рахунок.
              </p>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Правила повернення платежів
            </h2>
            
            <div className="space-y-4 mb-16">
              <ul className="list-disc pl-6 space-y-2 font-body">
                <li>надішліть на електронну пошту компанії ім’я, прізвище, номер телефону та реквізити для повернення коштів;</li>
                <li>протягом 5 робочих днів повертаємо кошти на вказаний рахунок.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                Відповідно до Закону «Про захист прав споживачів», компанія може відмовити споживачеві в обміні та поверненні товарів належної якості, якщо вони належать до категорій, зазначених у чинному Переліку непродовольчих товарів належної якості, що не підлягають поверненню та обміну.
              </p>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
