import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export function Privacy() {
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
              ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ ТА ОБРОБКИ ПЕРСОНАЛЬНИХ ДАНИХ
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
                Ми поважаємо право користувачів на конфіденційність персональної інформації та вживаємо необхідних заходів для її захисту.
              </p>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Які персональні дані можуть оброблятися
            </h2>
            
            <div className="space-y-4 mb-16">
              <ul className="list-disc pl-6 space-y-2 font-body">
                <li>ім’я, прізвище та по батькові (за наявності);</li>
                <li>номер телефону;</li>
                <li>адреса електронної пошти;</li>
                <li>адреса доставки або інша адреса необхідна для виконання замовлення;</li>
                <li>реквізити, необхідні для оформлення документів та проведення розрахунків;</li>
                <li>інформація про замовлені товари, їх кількість, комплектацію та технічні характеристики;</li>
                <li>інформація, яку користувач добровільно надає під час погодження технічного завдання або умов замовлення;</li>
                <li>історія замовлень та взаємодії з компанією;</li>
                <li>інша інформація, необхідна для обробки та виконання конкретного звернення або замовлення.</li>
              </ul>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Мета обробки персональних даних
            </h2>
            
            <div className="space-y-4 mb-16">
              <p className="font-body leading-relaxed">
                Персональні дані можуть оброблятися з метою:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body">
                <li>опрацювання звернень користувачів;</li>
                <li>надання інформації про товари та їх характеристики;</li>
                <li>уточнення наявності, ціни, комплектації та технічних параметрів товарів;</li>
                <li>підготовки та погодження замовлень;</li>
                <li>підготовки технічних завдань та індивідуальної комплектації товарів;</li>
                <li>укладення та виконання договорів;</li>
                <li>організації доставки та передачі товару;</li>
                <li>здійснення розрахунків;</li>
                <li>оформлення первинних та інших необхідних документів;</li>
                <li>ведення бухгалтерського та податкового обліку;</li>
                <li>виконання вимог законодавства України;</li>
                <li>захисту прав та законних інтересів компанії та користувачів;</li>
                <li>розгляду претензій, звернень та інших питань, пов’язаних із замовленнями.</li>
              </ul>
              <p className="font-body leading-relaxed">
                Персональні дані не використовуються для цілей, несумісних із зазначеними вище, без наявності відповідної правової підстави.
              </p>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Передача персональних даних третім особам
            </h2>
            
            <div className="space-y-4 mb-16">
              <p className="font-body leading-relaxed">
                Компанія не продає та не передає персональні дані третім особам для їхніх власних рекламних або маркетингових цілей.
              </p>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Захист персональних даних
            </h2>
            
            <div className="space-y-4 mb-16">
              <p className="font-body leading-relaxed">
                Ми вживаємо організаційні і технічні заходи для захисту персональних даних від незаконного або випадкового доступу, знищення, зміни, блокування, копіювання, поширення та інших неправомірних дій.
              </p>
            </div>

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6">
              Контактна інформація продавця
            </h2>
            
            <div className="space-y-4">
              <p className="font-body leading-relaxed">
                ФОП Кондратюк М. В.<br />
                Код ЄДРПОУ / РНОКПП: 45351050<br />
                Адреса: вул. Геологів, 30, м. Ніжин, Чернігівська область, 16610.<br />
                Електронна пошта: daminer23@ukr.net<br />
                Телефон: 0503811723
              </p>
              <p className="font-body leading-relaxed">
                Якщо Ви маєте питання – можете звернутися за вказаними контактними даними для детальної консультації.
              </p>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
