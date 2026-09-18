import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function Payment() {
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
              ОПЛАТА ТА ДОСТАВКА
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
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Умови оплати
            </h2>
            
            <div className="space-y-4 mb-16">
              <p className="font-body leading-relaxed">
                Вартість продукції визначається відповідно до обраного товару, його комплектації, кількості, технічних характеристик та інших погоджених сторонами умов.
              </p>
              <p className="font-body leading-relaxed">
                Ціни, зазначені на Сайті, можуть стосуватися базової комплектації продукції. У разі зміни складу або комплектації набору остаточна вартість визначається індивідуально відповідно до погодженого технічного завдання та фактичної комплектації.
              </p>
              <p className="font-body leading-relaxed">
                Перед здійсненням оплати покупцю повідомляються погоджені умови замовлення, зокрема найменування та кількість продукції, комплектація, остаточна ціна, спосіб оплати та умови доставки.
              </p>
              <p className="font-body leading-relaxed">
                Оплата продукції здійснюється одним із способів, погоджених сторонами, зокрема:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body">
                <li>безготівковим розрахунком на поточний рахунок;</li>
                <li>шляхом оплати за реквізитами, наданими продавцем;</li>
                <li>іншим способом, доступним та погодженим сторонами.</li>
              </ul>
              <p className="font-body leading-relaxed">
                Для індивідуальних замовлень, продукції, що виготовляється або комплектується відповідно до технічного завдання покупця, може передбачатися попередня оплата або авансовий платіж. Розмір та порядок внесення авансу погоджуються сторонами до початку виконання замовлення.
              </p>
              <p className="font-body leading-relaxed">
                Замовлення може бути передане у виробництво, комплектацію або виконання після отримання оплати або авансового платежу, якщо інше не погоджено сторонами.
              </p>
              <p className="font-body leading-relaxed">
                У разі зміни погодженого технічного завдання, комплектації, кількості продукції або інших параметрів замовлення після його погодження остаточна вартість може бути відповідно перерахована.
              </p>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Доставка
            </h2>
            
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                Доставка продукції здійснюється на території України способами та перевізниками, погодженими сторонами під час оформлення замовлення.
              </p>
              <p className="font-body leading-relaxed">
                Спосіб доставки, місце доставки, строки та вартість доставки погоджуються індивідуально залежно від:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body">
                <li>виду та габаритів продукції;</li>
                <li>ваги та кількості товару;</li>
                <li>місця доставки;</li>
                <li>обраного перевізника;</li>
                <li>необхідності спеціального транспорту;</li>
                <li>інших особливостей конкретного замовлення.</li>
              </ul>
              <p className="font-body leading-relaxed">
                Вартість доставки не включається до ціни продукції, якщо інше прямо не погоджено сторонами.
              </p>
              <p className="font-body leading-relaxed">
                Для великогабаритної, важкої або продукції, що має особливі вимоги до транспортування, умови доставки визначаються індивідуально.
              </p>
              <p className="font-body leading-relaxed">
                Строк доставки залежить від наявності продукції, строку її виготовлення або комплектації, обраного способу доставки, місця призначення та роботи перевізника.
              </p>
              <p className="font-body leading-relaxed">
                При отриманні продукції покупцю рекомендується перевірити цілісність упаковки та, за можливості, відповідність кількості місць супровідним документам.
              </p>
              <p className="font-body leading-relaxed">
                У разі виявлення пошкодження упаковки або продукції під час отримання покупцю рекомендується зафіксувати такі обставини та звернутися до перевізника і продавця відповідно до встановленого порядку.
              </p>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
