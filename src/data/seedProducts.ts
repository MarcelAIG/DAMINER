export interface FirestoreProductSpecification {
  nameUa: string;
  nameEn: string;
  valueUa: string;
  valueEn: string;
  value: string;
}

export interface FirestoreProductKitItem {
  itemUa: string;
  countUa: string;
  itemEn: string;
  countEn: string;
}

export interface SeedProduct {
  id: string;
  route: string;
  category: string;
  categorySlug: string;
  nameUa: string;
  nameEn: string;
  shortDescriptionUa: string;
  shortDescriptionEn: string;
  descriptionUa: string;
  descriptionEn: string;
  specifications: FirestoreProductSpecification[];
  kitContents: FirestoreProductKitItem[];
  images: string[];
  primaryImage: string;
  priceMode: 'request' | 'from';
  priceAmount: string | null;
  published: boolean;
  sortOrder: number;
}

export const SEED_PRODUCTS: SeedProduct[] = [
  // 1. Щупи (3 products)
  {
    id: "1",
    route: "/product/1",
    category: "Щупи",
    categorySlug: "probes",
    nameUa: "ЩР-1",
    nameEn: "ShchR-1",
    shortDescriptionUa: "Щуп складається з алюмінієвої рукоятки та двох алюмінієвих подовжувальних штанг для кріплення чотирьох змінних наконечників.",
    shortDescriptionEn: "The probe consists of an aluminum handle and two aluminum extension rods for attaching four interchangeable tips.",
    descriptionUa: "Щуп пошуковий ЩР-1 призначений для розвідки та пошуку протипіхотних та протитанкових мін при проведенні робіт з розмінування, а також пошуку інших предметів та схованок при проведенні пошукових робіт.\n\nЩуп складається з алюмінієвої рукоятки та двох алюмінієвих подовжувальних штанг, до яких за допомогою накидної гайки кріпляться чотири змінних наконечники — стальний, латунний та два діелектричних.\n\nНакидна гайка має два отвори, що дозволяють кріпити змінні наконечники вздовж осі щупа або під кутом 30 градусів.\n\nЗавдяки цьому щуп може збиратися у двох варіантах — для роботи стоячи або для роботи лежачи.\n\nЩуп розміщений у чохлі для переноски.",
    descriptionEn: "",
    primaryImage: "/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_09 PM.png",
    images: [
      "/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_09 PM.png",
      "/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_02 PM.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри у положенні для роботи стоячи", nameEn: "", valueUa: "не більше 1470 мм", valueEn: "", value: "не більше 1470 мм" },
      { nameUa: "Габаритні розміри у положенні для роботи лежачи", nameEn: "", valueUa: "не більше 570 мм", valueEn: "", value: "не більше 570 мм" },
      { nameUa: "Габаритні розміри у складеному (транспортному) положенні", nameEn: "", valueUa: "не більше 480 × 120 × 40 мм", valueEn: "", value: "не більше 480 × 120 × 40 мм" },
      { nameUa: "Загальна вага щупа", nameEn: "", valueUa: "не більше 0,65 кг", valueEn: "", value: "не більше 0,65 кг" }
    ],
    kitContents: [
      { itemUa: "1. Щуп у зборі (змінні наконечники 4 шт. — стальний, латунний, 2 діелектричних)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "2. Чохол для переноски", countUa: "1 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 1
  },
  {
    id: "2",
    route: "/product/2",
    category: "Щупи",
    categorySlug: "probes",
    nameUa: "ЩР-3/2",
    nameEn: "ShchR-3/2",
    shortDescriptionUa: "Щуп складається з дерев’яної рукоятки та однієї алюмінієвої подовжуючої штанги для кріплення чотирьох змінних наконечників.",
    shortDescriptionEn: "The probe consists of a wooden handle and one aluminum extension rod for attaching four interchangeable tips.",
    descriptionUa: "Щуп пошуковий ЩР-3/2 призначений для розвідки та пошуку протипіхотних та протитанкових мін при проведенні робіт з розмінування, а також пошуку інших предметів та схованок при проведенні пошукових робіт.\n\nЩуп складається з дерев’яної рукоятки та алюмінієвої подовжуючої штанги, до яких за допомогою накидної гайки кріпляться чотири змінних наконечники — стальний, латунний та два діелектричних.\n\nНакидна гайка має два отвори, що дозволяють кріпити змінні наконечники вздовж осі щупа або під кутом 30 градусів.\n\nЗавдяки цьому щуп може збиратися у двох варіантах — для роботи стоячи або для роботи лежачи.\n\nЩуп розміщений у чохлі для переноски.",
    descriptionEn: "",
    primaryImage: "/ЩР-3:2 /ChatGPT Image Aug 28, 2026, 10_41_22 PM.png",
    images: [
      "/ЩР-3:2 /ChatGPT Image Aug 28, 2026, 10_41_22 PM.png",
      "/ЩР-3:2 /ChatGPT Image Aug 28, 2026, 10_41_30 PM.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри у робочому положенні", nameEn: "", valueUa: "не більше 1320 мм", valueEn: "", value: "не більше 1320 мм" },
      { nameUa: "Габаритні розміри у складеному (транспортному) положенні", nameEn: "", valueUa: "не більше 750 × 120 × 40 мм", valueEn: "", value: "не більше 750 × 120 × 40 мм" },
      { nameUa: "Загальна вага щупа", nameEn: "", valueUa: "не більше 0,55 кг", valueEn: "", value: "не більше 0,55 кг" }
    ],
    kitContents: [
      { itemUa: "1. Щуп у зборі (змінні наконечники 4 шт. — стальний, латунний, 2 діелектричних)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "2. Чохол для переноски", countUa: "1 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 2
  },
  {
    id: "3",
    route: "/product/3",
    category: "Щупи",
    categorySlug: "probes",
    nameUa: "ЩР-8",
    nameEn: "ShchR-8",
    shortDescriptionUa: "Щуп складається з пластикової рукоятки та трьох алюмінієвих подовжуючих штанг для кріплення змінних наконечників.",
    shortDescriptionEn: "The probe consists of a plastic handle and three aluminum extension rods for attaching interchangeable tips.",
    descriptionUa: "Щуп пошуковий ЩР-8 призначений для розвідки та пошуку протипіхотних та протитанкових мін при проведенні робіт з розмінування, а також пошуку інших предметів та схованок при проведенні пошукових робіт.\n\nЩуп складається з пластикової рукоятки та трьох алюмінієвих подовжуючих штанг, до яких за допомогою накидної гайки кріпляться змінні наконечники — стальний, латунний та два діелектричних.\n\nНакидна гайка має два отвори, що дозволяють кріпити змінні наконечники вздовж осі щупа або під кутом 30 градусів.\n\nЗавдяки цьому щуп може збиратися у двох варіантах — для роботи стоячи або для роботи лежачи.\n\nЩуп розміщений у чохлі для переноски.",
    descriptionEn: "",
    primaryImage: "/ЩР-8/ChatGPT Image Aug 28, 2026, 11_15_16 PM.png",
    images: [
      "/ЩР-8/ChatGPT Image Aug 28, 2026, 11_15_16 PM.png",
      "/ЩР-8/ChatGPT Image Aug 28, 2026, 11_15_05 PM.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри у положенні для роботи стоячи", nameEn: "", valueUa: "не більше 1680 мм", valueEn: "", value: "не більше 1680 мм" },
      { nameUa: "Габаритні розміри у положенні для роботи лежачи", nameEn: "", valueUa: "не більше 570 мм", valueEn: "", value: "не більше 570 мм" },
      { nameUa: "Габаритні розміри у складеному (транспортному) положенні", nameEn: "", valueUa: "не більше 520 × 120 × 40 мм", valueEn: "", value: "не більше 520 × 120 × 40 мм" },
      { nameUa: "Загальна вага щупа", nameEn: "", valueUa: "не більше 0,85 кг", valueEn: "", value: "не більше 0,85 кг" }
    ],
    kitContents: [
      { itemUa: "1. Щуп у зборі (змінні наконечники 4 шт. — стальний, латунний, 2 діелектричних)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "2. Чохол для переноски", countUa: "1 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 3
  },

  // 2. Дзеркала (5 products)
  {
    id: "m1",
    route: "/product/m1",
    category: "Дзеркала",
    categorySlug: "mirrors",
    nameUa: "ЗД-1",
    nameEn: "ZD-1",
    shortDescriptionUa: "Дзеркало з розсувною штангою та освітлювачем для огляду приміщень, транспортних засобів, спортивних споруд.",
    shortDescriptionEn: "Mirror with an extendable rod and illuminator for inspecting premises, vehicles, and sports facilities.",
    descriptionUa: "ДЗЕРКАЛО З РОЗСУВНОЮ ШТАНГОЮ ТА ОСВІТЛЮВАЧЕМ\n\nДзеркало ЗД-1 призначене для огляду приміщень, транспортних засобів, спортивних споруд, пошуку зброї, вибухонебезпечних предметів, контрабанди.\n\nДзеркало може використовуватися працівниками вибухотехнічних служб, служб охорони, митниці, прикордонних військ та іншими підрозділами.\n\nДзеркало виготовляється при сприянні НДІ спецтехніки при ГУ МВС України.",
    descriptionEn: "",
    primaryImage: "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (1).png",
    images: [
      "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (1).png",
      "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (2).png",
      "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_14 AM (3).png",
      "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_14 AM (4).png"
    ],
    specifications: [
      { nameUa: "Довжина в робочому положенні", nameEn: "", valueUa: "1540 мм", valueEn: "", value: "1540 мм" },
      { nameUa: "Довжина в складеному положенні", nameEn: "", valueUa: "620 мм", valueEn: "", value: "620 мм" },
      { nameUa: "Вага без освітлювача", nameEn: "", valueUa: "не більше 0,6 кг", valueEn: "", value: "не більше 0,6 кг" },
      { nameUa: "Дзеркало", nameEn: "", valueUa: "Ø150 мм", valueEn: "", value: "Ø150 мм" }
    ],
    kitContents: [
      { itemUa: "Штанга телескопічна з шарніром", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Змінне дзеркало", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Кронштейн для ліхтаря", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Чохол", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Ліхтарик", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Елементи живлення для ліхтаря", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Паспорт", countUa: "1 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 4
  },
  {
    id: "m2",
    route: "/product/m2",
    category: "Дзеркала",
    categorySlug: "mirrors",
    nameUa: "ЗД-2Д",
    nameEn: "ZD-2D",
    shortDescriptionUa: "Набір дзеркал з розсувною штангою та освітлювачем для пошуку зброї, вибухонебезпечних предметів, контрабанди.",
    shortDescriptionEn: "Mirror set with an extendable rod and illuminator for searching weapons, explosive items, and contraband.",
    descriptionUa: "НАБІР ДЗЕРКАЛ З РОЗСУВНОЮ ШТАНГОЮ ТА ОСВІТЛЮВАЧЕМ\n\nНабір дзеркал ЗД-2 призначений для огляду приміщень, транспортних засобів, спортивних споруд, пошуку зброї, вибухонебезпечних предметів, контрабанди.\n\nНабір може використовуватися працівниками вибухотехнічних служб, служб охорони, митниці, прикордонних військ та іншими підрозділами.\n\nНабір виготовляється при сприянні НДІ спецтехніки при ГУ МВС України.",
    descriptionEn: "",
    primaryImage: "/ЗД-2Д\"/ChatGPT Image Aug 29, 2026, 01_20_44 PM.png",
    images: [
      "/ЗД-2Д\"/ChatGPT Image Aug 29, 2026, 01_20_44 PM.png",
      "/ЗД-2Д\"/ChatGPT Image Aug 29, 2026, 01_20_48 PM.png"
    ],
    specifications: [
      { nameUa: "Довжина в робочому положенні", nameEn: "", valueUa: "1540 мм", valueEn: "", value: "1540 мм" },
      { nameUa: "Довжина в складеному положенні", nameEn: "", valueUa: "620 мм", valueEn: "", value: "620 мм" },
      { nameUa: "Вага без освітлювача", nameEn: "", valueUa: "не більше 0,6 кг", valueEn: "", value: "не більше 0,6 кг" },
      { nameUa: "Дзеркала", nameEn: "", valueUa: "Ø150 мм, Ø105 мм, Ø70 мм, 120 × 75 мм", valueEn: "", value: "Ø150 мм, Ø105 мм, Ø70 мм, 120 × 75 мм" }
    ],
    kitContents: [
      { itemUa: "Штанга телескопічна з шарніром", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Змінні дзеркала", countUa: "4 шт.", itemEn: "", countEn: "" },
      { itemUa: "Кронштейн для ліхтаря", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Валіза з планшетами", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Ліхтар з елементами живлення", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Паспорт", countUa: "1 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 5
  },
  {
    id: "m3",
    route: "/product/m3",
    category: "Дзеркала",
    categorySlug: "mirrors",
    nameUa: "ЗД-2У",
    nameEn: "ZD-2U",
    shortDescriptionUa: "Набір дзеркал, що може використовуватися працівниками вибухотехнічних служб, служб охорони та митниці.",
    shortDescriptionEn: "Mirror set that can be used by explosive ordnance disposal units, security, and customs services.",
    descriptionUa: "НАБІР ДЗЕРКАЛ З РОЗСУВНОЮ ШТАНГОЮ ТА ОСВІТЛЮВАЧЕМ\n\nНабір дзеркал ЗД-2У призначений для огляду приміщень, транспортних засобів, спортивних споруд, пошуку зброї, вибухонебезпечних предметів, контрабанди.\n\nНабір може використовуватися працівниками вибухотехнічних служб, служб охорони, митниці, прикордонних військ та іншими підрозділами.\n\nНабір виготовляється при сприянні НДІ спецтехніки при ГУ МВС України.",
    descriptionEn: "",
    primaryImage: "/ЗД-2У/ChatGPT Image Aug 29, 2026, 01_29_49 PM.png",
    images: [
      "/ЗД-2У/ChatGPT Image Aug 29, 2026, 01_29_49 PM.png"
    ],
    specifications: [
      { nameUa: "Довжина в робочому положенні", nameEn: "", valueUa: "1240 мм", valueEn: "", value: "1240 мм" },
      { nameUa: "Довжина в складеному положенні", nameEn: "", valueUa: "610 мм", valueEn: "", value: "610 мм" },
      { nameUa: "Вага без освітлювача", nameEn: "", valueUa: "не більше 0,8 кг", valueEn: "", value: "не більше 0,8 кг" },
      { nameUa: "Дзеркало", nameEn: "", valueUa: "Ø170 мм", valueEn: "", value: "Ø170 мм" }
    ],
    kitContents: [
      { itemUa: "Штанга телескопічна з шарніром", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Змінне дзеркало", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Кронштейн для ліхтаря", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Чохол", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Ліхтарик", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Елементи живлення для ліхтаря", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "Паспорт", countUa: "1 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 6
  },
  {
    id: "m4",
    route: "/product/m4",
    category: "Дзеркала",
    categorySlug: "mirrors",
    nameUa: "ЗД-3",
    nameEn: "ZD-3",
    shortDescriptionUa: "Оглядове дзеркало ЗД-3 для огляду днищ автотранспортних засобів, оснащене колесами та світлодіодним ліхтарем.",
    shortDescriptionEn: "Inspection mirror ZD-3 for inspecting the undercarriage of vehicles, equipped with wheels and an LED flashlight.",
    descriptionUa: "Дзеркало оглядове ЗД-3 призначене для огляду днищ автотранспортних засобів та інших аналогічних об’єктів. Використовується для виявлення вибухових пристроїв, контрабанди та пошкоджень машин. Поверхня дзеркала виконана випуклою, що забезпечує широкий кут огляду. Для зручності користування дзеркало оснащене колесами.\n\nВиріб призначений для використання персоналом служб безпеки, поліції, митниці, прикордонниками та іншими службами.\n\nКонструктивно виріб складається із двоколінної штанги, до якої під кутом прикріплене сферичне дзеркало. Для транспортування дзеркало вкладається в чохол. На штанзі розміщений світлодіодний акумуляторний ліхтар для підсвітки, оснащений зарядним пристроєм.",
    descriptionEn: "Inspection mirror ZD-3 is designed for inspecting the undercarriage of vehicles and other similar objects. It is used to detect explosive devices, contraband, and vehicle damage. The surface of the mirror is convex, which provides a wide viewing angle. For ease of use, the mirror is equipped with wheels.\n\nThe product is intended for use by security personnel, police, customs, border guards, and other services.\n\nStructurally, the product consists of a two-section rod to which a spherical mirror is attached at an angle. For transportation, the mirror is placed in a cover. A rechargeable LED flashlight with a charger is placed on the rod for illumination.",
    primaryImage: "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_57_21 PM.png",
    images: [
      "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_57_21 PM.png",
      "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_44_55 PM.png",
      "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_58_10 PM.png",
      "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_59_22 PM.png",
      "/ЗД-3/ChatGPT Image Aug 29, 2026, 02_00_31 PM.png",
      "/ЗД-3/ChatGPT Image Aug 29, 2026, 02_01_52 PM.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри, мм, не більше", nameEn: "Overall dimensions, mm, no more than", valueUa: "1400 × 300 × 200", valueEn: "1400 × 300 × 200", value: "1400 × 300 × 200" },
      { nameUa: "Габарити у складеному положенні", nameEn: "Dimensions in folded position", valueUa: "920 × 300 × 200", valueEn: "920 × 300 × 200", value: "920 × 300 × 200" },
      { nameUa: "Тип дзеркала", nameEn: "Mirror type", valueUa: "кругле, сферичне", valueEn: "round, spherical", value: "кругле, сферичне" },
      { nameUa: "Діаметр дзеркала, мм", nameEn: "Mirror diameter, mm", valueUa: "300 ± 5", valueEn: "300 ± 5", value: "300 ± 5" },
      { nameUa: "Вага виробу, кг, не більше", nameEn: "Product weight, kg, no more than", valueUa: "1,6", valueEn: "1.6", value: "1,6" }
    ],
    kitContents: [
      { itemUa: "Дзеркало сферичне на колесах", countUa: "1 шт.", itemEn: "Spherical mirror on wheels", countEn: "1 pc." },
      { itemUa: "Ліхтар світлодіодний з тримачем", countUa: "1 шт.", itemEn: "LED flashlight with holder", countEn: "1 pc." },
      { itemUa: "Пристрій зарядний для ліхтаря", countUa: "1 к-т", itemEn: "Charger for flashlight", countEn: "1 set" },
      { itemUa: "Чохол для дзеркала", countUa: "1 шт.", itemEn: "Cover for mirror", countEn: "1 pc." }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 7
  },
  {
    id: "m5",
    route: "/product/m5",
    category: "Дзеркала",
    categorySlug: "mirrors",
    nameUa: "ЗД-4",
    nameEn: "ZD-4",
    shortDescriptionUa: "Оглядове дзеркало ЗД-4 для огляду днищ автотранспортних засобів, оснащене колесами та акумуляторним світлодіодним ліхтарем.",
    shortDescriptionEn: "Inspection mirror ZD-4 for inspecting the undercarriage of vehicles, equipped with wheels and a rechargeable LED flashlight.",
    descriptionUa: "Дзеркало оглядове ЗД-4 призначене для огляду днищ автотранспортних засобів та інших аналогічних об’єктів. Використовується для виявлення вибухових пристроїв, контрабанди та пошкоджень машин. Поверхня дзеркала виконана випуклою, що забезпечує широкий кут огляду. Для зручності користування дзеркало оснащене колесами.\n\nВиріб призначений для використання персоналом служб безпеки, поліції, митниці, прикордонниками та іншими службами.\n\nКонструктивно виріб складається із трьохколінної штанги, до якої під кутом прикріплене сферичне дзеркало. Для транспортування дзеркало вкладається в чохол. На корпусі дзеркала розміщений світлодіодний акумуляторний ліхтар для підсвітки, оснащений зарядним пристроєм.",
    descriptionEn: "Inspection mirror ZD-4 is designed for inspecting the undercarriage of vehicles and other similar objects. It is used to detect explosive devices, contraband, and vehicle damage. The surface of the mirror is convex, which provides a wide viewing angle. For ease of use, the mirror is equipped with wheels.\n\nThe product is intended for use by security personnel, police, customs, border guards, and other services.\n\nStructurally, the product consists of a three-section rod to which a spherical mirror is attached at an angle. For transportation, the mirror is placed in a cover. A rechargeable LED flashlight with a charger is placed on the mirror housing for illumination.",
    primaryImage: "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_13_09 PM.png",
    images: [
      "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_13_09 PM.png",
      "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_14_51 PM.png",
      "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_16_22 PM.png",
      "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_17_17 PM.png",
      "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_18_14 PM.png",
      "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_19_28 PM.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри, мм, не більше", nameEn: "Overall dimensions, mm, no more than", valueUa: "1600 × 320 × 100", valueEn: "1600 × 320 × 100", value: "1600 × 320 × 100" },
      { nameUa: "Габарити у складеному положенні", nameEn: "Dimensions in folded position", valueUa: "600 × 320 × 130", valueEn: "600 × 320 × 130", value: "600 × 320 × 130" },
      { nameUa: "Тип дзеркала", nameEn: "Mirror type", valueUa: "прямокутне, сферичне", valueEn: "rectangular, spherical", value: "прямокутне, сферичне" },
      { nameUa: "Розмір дзеркала, мм", nameEn: "Mirror size, mm", valueUa: "320 × 180", valueEn: "320 × 180", value: "320 × 180" },
      { nameUa: "Вага виробу, кг, не більше", nameEn: "Product weight, kg, no more than", valueUa: "1,4", valueEn: "1.4", value: "1,4" }
    ],
    kitContents: [
      { itemUa: "Дзеркало сферичне на колесах з ліхтарем", countUa: "1 шт.", itemEn: "Spherical mirror on wheels with a flashlight", countEn: "1 pc." },
      { itemUa: "Пристрій зарядний для ліхтаря", countUa: "1 к-т", itemEn: "Charger for flashlight", countEn: "1 set" },
      { itemUa: "Чохол для дзеркала", countUa: "1 шт.", itemEn: "Cover for mirror", countEn: "1 pc." }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 8
  },

  // 3. Набори (4 products)
  {
    id: "k1",
    route: "/product/k1",
    category: "Набори",
    categorySlug: "kits",
    nameUa: "ЕОД-1",
    nameEn: "EOD-1",
    shortDescriptionUa: "Комплексний набір для пошуку та знешкодження вибухонебезпечних предметів із кріпленням системи MOLLE та ременем для перенесення.",
    shortDescriptionEn: "Comprehensive kit for finding and neutralizing explosive ordnance, featuring a MOLLE attachment system and a carrying strap.",
    descriptionUa: "НАБІР ДЛЯ РОЗМІНУВАННЯ / КОМПЛЕКТ САПЕРА ЕОД-1\n\nНабір призначений для транспортування і зберігання стандартних і спеціальних приладів та інструментів, які використовуються для виконання специфічних завдань: огляду місць мінувань, пошуку вибухонебезпечних предметів, знешкодження боєприпасів та саморобних вибухових пристроїв.\n\nКомплексний набір включає модулі та пристосування для виконання всього комплексу робіт у різноманітних умовах — відкрита місцевість, будівлі та споруди, автомобільний транспорт та ін.\n\nНабір має компактні розміри, мінімальну вагу та зручне кріплення за допомогою системи MOLLE, а також ремінь для перенесення.",
    descriptionEn: "",
    primaryImage: "/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_49_42 PM.png",
    images: [
      "/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_49_42 PM.png",
      "/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_59_43 PM.png",
      "/ЕОД-1/ChatGPT Image Aug 29, 2026, 03_00_42 PM.png",
      "/ЕОД-1/ChatGPT Image Aug 29, 2026, 03_03_04 PM.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри сумки", nameEn: "", valueUa: "не більше 330 × 230 × 120 мм", valueEn: "", value: "не більше 330 × 230 × 120 мм" },
      { nameUa: "Загальна вага", nameEn: "", valueUa: "не більше 4,7 кг", valueEn: "", value: "не більше 4,7 кг" }
    ],
    kitContents: [
      { itemUa: "1. Сумка з ременем", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "2. Мультитул сапера", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "3. Лопатка саперна", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "4. Паракорд 3 мм, 35 м", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "5. Захват мотузковий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "6. Кішка для розтяжок", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "7. Кішка для з’єму мін", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "8. Датчик розтяжок", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "9. Карабіни", countUa: "2 шт.", itemEn: "", countEn: "" },
      { itemUa: "10. Стяжки пластикові", countUa: "20 шт.", itemEn: "", countEn: "" },
      { itemUa: "11. Стропа мотузкова 1 м", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "12. Різак", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "13. Кусачки для ізоляції", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "14. Кусачки бокорізи малі", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "15. Ножиці зігнуті", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "16. Ножиці прямі", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "17. Зажим з фіксатором", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "18. Зажим різьбовий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "19. Пінцет прямий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "20. Пінцет зігнутий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "21. Захват цанговий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "22. Гачок трьохсторонній", countUa: "3 шт.", itemEn: "", countEn: "" },
      { itemUa: "23. Ліхтарик налобний", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "24. Ліхтарик USB малий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "25. Шнур USB", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26. Котушка для ізострічки", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.1. Ізострічка червона", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.2. Ізострічка чорна", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.3. Стрічка тканинна", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.4. Скотч армований", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.5. Скотч двосторонній", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "27. Запобіжні чеки Р-подібні", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "28. Запобіжні чеки Т-подібні", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "29. Запобіжні чеки З-подібні", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "30. Запобіжні чеки довгі", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "31. Перенаправлювач розтяжок", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "32. Булавки", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "33. Карабіни для розтяжок", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "34. Оправка для МУВ", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "35. Ключ для підривників ПТМ", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36. Котушка з дротом та нитками", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.1. Котушка з дротом сталькою (100 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.2. Котушка з дротом 0,8 мм (20 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.3. Котушка з чорними нитками (100 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.4. Котушка з зеленими нитками (100 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.5. Котушка з ліскою (100 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "37. Пенал універсальний", countUa: "2 шт.", itemEn: "", countEn: "" },
      { itemUa: "38. Комплект скребків 4 шт.", countUa: "1 компл", itemEn: "", countEn: "" },
      { itemUa: "39. Пенал для детонаторів", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "40. Мінідзеркало оглядове", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "41. Щуп малий односекційний", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "42. Маркер знайдених мін «М»", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "43. Турбозапальничка газова", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "44. Щітка шириною 20–25 мм", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "45. Саморіз 30 мм", countUa: "10 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 9
  },
  {
    id: "k2",
    route: "/product/k2",
    category: "Набори",
    categorySlug: "kits",
    nameUa: "ЕОД-1МН",
    nameEn: "EOD-1MN",
    shortDescriptionUa: "Спеціальний набір для пошуку та знешкодження вибухонебезпечних предметів зі зручним кріпленням та фіксацією до ноги.",
    shortDescriptionEn: "Special kit for finding and neutralizing explosive items, featuring convenient attachment and leg fixation.",
    descriptionUa: "СПЕЦІАЛЬНИЙ НАБІР ДЛЯ РОЗМІНУВАННЯ\n\nНабір призначений для транспортування і зберігання стандартних і спеціальних приладів та інструментів, які використовуються для виконання специфічних завдань: огляду місць мінувань, пошуку вибухонебезпечних предметів, знешкодження боєприпасів та саморобних вибухових пристроїв.\n\nКомплексний набір включає модулі та пристосування для виконання всього комплексу робіт в різноманітних умовах — відкрита місцевість, будівлі та споруди, автомобільний транспорт та ін.\n\nНабір має компактні розміри, мінімальну вагу та зручне кріплення з фіксацією до ноги.",
    descriptionEn: "",
    primaryImage: "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_25_05 PM.png",
    images: [
      "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_25_05 PM.png",
      "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_23_51 PM.png",
      "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_26_18 PM.png",
      "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_27_43 PM.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри сумки", nameEn: "", valueUa: "не більше 310 × 210 × 120 мм", valueEn: "", value: "не більше 310 × 210 × 120 мм" },
      { nameUa: "Загальна вага", nameEn: "", valueUa: "не більше 2,7 кг", valueEn: "", value: "не більше 2,7 кг" }
    ],
    kitContents: [
      { itemUa: "1. Щуп великий трьохсекційний з трьома наконечниками", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "2. Крюк екстрактор ПТМ", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "3. Лассо 1,5 метра", countUa: "2 шт.", itemEn: "", countEn: "" },
      { itemUa: "4. Шнур паракорд 35 м на котушці з карабіном", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "5. Обтискач сапера комбінований (мультитул)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "6. Котушка з набором дротів та ниток (5 котушок)", countUa: "1 компл", itemEn: "", countEn: "" },
      { itemUa: "7. Котушка з дротом сталькою (100 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "8. Карабіни для постановки розтяжок", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "9. Булавки", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "10. Кішка ялинка", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "11. Зажим", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "12. Пенал універсальний для детонаторів", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "13. Стяжки пластикові", countUa: "20 шт.", itemEn: "", countEn: "" },
      { itemUa: "14. Ліхтарик світлодіодний налобний", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "15. Щуп малий односекційний із 3 змінними наконечниками", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "16. Маркер знайдених мін «М» на металевій стійці", countUa: "5 шт.", itemEn: "", countEn: "" },
      { itemUa: "17. Стрічка ізоляційна тканинна", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "18. Сумка (кріплення до ноги) з чохлами для комплектуючих", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "19. Щітка шириною 20–25 мм", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "20. Рулетка 3 м", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "21. Кішка для тралення розтяжок спеціальна", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "22. Сапка сапера", countUa: "1 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 10
  },
  {
    id: "k3",
    route: "/product/k3",
    category: "Набори",
    categorySlug: "kits",
    nameUa: "КР-04",
    nameEn: "KR-04",
    shortDescriptionUa: "Індивідуальний набір для технічного забезпечення саперів ЗСУ під час пошуку, знешкодження та знищення мін і фугасів.",
    shortDescriptionEn: "Individual kit for the technical support of Armed Forces sappers during the search, neutralization, and destruction of mines and fougasses.",
    descriptionUa: "ІНДИВІДУАЛЬНИЙ НАБІР ДЛЯ РОЗМІНУВАННЯ\n\nІндивідуальний набір для розмінування «КР-04» призначений для технічного забезпечення саперів інженерно-саперних підрозділів Збройних Сил України під час виконання ними робіт з пошуку, знешкодження й знищення мін та фугасів, позначення на місцевості ідентифікованих мін, огородження на місцевості розвіданих ділянок, пророблення проходів в загородженнях, а також перевірки мін на предмет невилучення.\n\nКомплексний набір включає модулі та пристосування для виконання всього комплексу робіт у різноманітних умовах — відкрита місцевість, будівлі та споруди, автомобільний транспорт та ін.\n\nНабір має компактні розміри та мінімальну вагу. Комплектуючі розміщені в сумці, яка має ручку і ремінь для перенесення та кріплення з системою MOLLE.",
    descriptionEn: "",
    primaryImage: "/КР-04/ChatGPT Image Aug 29, 2026, 03_58_47 PM.png",
    images: [
      "/КР-04/ChatGPT Image Aug 29, 2026, 03_58_47 PM.png",
      "/КР-04/ChatGPT Image Aug 29, 2026, 03_57_49 PM.png",
      "/КР-04/ChatGPT Image Aug 29, 2026, 04_00_29 PM.png",
      "/КР-04/ChatGPT Image Aug 29, 2026, 04_06_20 PM.png",
      "/КР-04/ChatGPT Image Aug 29, 2026, 04_13_49 PM.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри сумки", nameEn: "", valueUa: "не більше 290 × 220 × 140 мм", valueEn: "", value: "не більше 290 × 220 × 140 мм" },
      { nameUa: "Загальна вага", nameEn: "", valueUa: "не більше 2,9 кг", valueEn: "", value: "не більше 2,9 кг" }
    ],
    kitContents: [
      { itemUa: "1. Сумка для розміщення складових набору", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "2. Обтискач сапера комбінований (мультитул)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "3. Щуп малий односекційний в комплекті", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "4. Кішка саперна (кішка-ялинка збірна)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "5. Кішка спеціальна для тралення розтяжок", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "6. Крюк екстрактор ПТМ", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "7. Лассо 1,5 метра", countUa: "2 шт.", itemEn: "", countEn: "" },
      { itemUa: "8. Шнур паракорд 35 м на котушці з карабіном", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "9. Сапка сапера", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "10. Ключ універсальний для переведення підривачів ПТМ", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "11. Планшет для ключа універсального ПТМ та чек", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "12. Запобіжна чека (стандартна)", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "13. Маркер проходу білого кольору", countUa: "12 шт.", itemEn: "", countEn: "" },
      { itemUa: "14. Маркер ВНП червоного кольору", countUa: "12 шт.", itemEn: "", countEn: "" },
      { itemUa: "15. Пенал універсальний для детонаторів", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "16. Ізолююча стрічка тканинна", countUa: "1 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 11
  },
  {
    id: "k4",
    route: "/product/k4",
    category: "Набори",
    categorySlug: "kits",
    nameUa: "КР-06",
    nameEn: "KR-06",
    shortDescriptionUa: "Набір сапера, що розміщується на ремінно-плечовій системі в спеціальних підсумках за допомогою кріплення MOLLE.",
    shortDescriptionEn: "Sapper kit that is placed on a belt-shoulder system in special pouches using a MOLLE attachment.",
    descriptionUa: "НАБІР САПЕРА / КОМПЛЕКТ КР-06\n\nНабір призначений для транспортування і зберігання стандартних і спеціальних приладів та інструментів, які використовуються для виконання специфічних завдань: огляду місць мінувань, пошуку вибухонебезпечних предметів, знешкодження боєприпасів та саморобних вибухових пристроїв.\n\nКомплексний набір включає модулі та пристосування для виконання всього комплексу робіт у різноманітних умовах — відкрита місцевість, будівлі та споруди, автомобільний транспорт та ін.\n\nНабір розміщується на ремінно-плечовій системі в спеціальних підсумках за допомогою кріплення системи MOLLE, має компактні розміри та мінімальну вагу.",
    descriptionEn: "",
    primaryImage: "/КР-06/ChatGPT Image Sep 19, 2026, 08_52_30 PM.png",
    images: [
      "/КР-06/ChatGPT Image Sep 19, 2026, 08_52_30 PM.png",
      "/КР-06/ChatGPT Image Sep 19, 2026, 08_31_46 PM.png",
      "/КР-06/ChatGPT Image Sep 19, 2026, 08_44_04 PM.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри", nameEn: "", valueUa: "не більше 600 × 250 × 120 мм", valueEn: "", value: "не більше 600 × 250 × 120 мм" },
      { nameUa: "Загальна вага", nameEn: "", valueUa: "не більше 4,7 кг", valueEn: "", value: "не більше 4,7 кг" }
    ],
    kitContents: [
      { itemUa: "1. Ремінно-плечова система з спеціальними підсумками та кріпленням за допомогою системи MOLLE", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "2. Мультитул компактний", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "3. Сапка саперна", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "4. Паракорд 3 мм довжиною 35 м", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "5. Захват мотузковий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "6. Кішка для тралення розтяжок", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "7. Кішка для з’єму мін", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "8. Датчик розтяжок", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "9. Карабіни", countUa: "2 шт.", itemEn: "", countEn: "" },
      { itemUa: "10. Стяжки пластикові", countUa: "20 шт.", itemEn: "", countEn: "" },
      { itemUa: "11. Стропа мотузкова 1 м", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "12. Різак", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "13. Кусачки для зачистки ізоляції", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "14. Кусачки бокорізи малі", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "15. Ножиці зігнуті", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "16. Ножиці прямі", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "17. Зажим з фіксатором", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "18. Зажим різьбовий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "19. Пінцет прямий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "20. Пінцет зігнутий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "21. Захват цанговий", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "22. Гачок трьохсторонній", countUa: "3 шт.", itemEn: "", countEn: "" },
      { itemUa: "23. Ліхтарик світлодіодний налобний", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "24. Шнур USB", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "25. Рулетка 3 м", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26. Котушка для ізострічки", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.1. Ізострічка поліетиленова червона", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.2. Ізострічка поліетиленова чорна", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.3. Стрічка ізоляційна тканинна", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.4. Скотч армований", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "26.5. Скотч двосторонній", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "27. Запобіжні чеки Р-подібні", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "28. Запобіжні чеки Т-подібні", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "29. Запобіжні чеки З-подібні", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "30. Запобіжні чеки довгі", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "31. Перенаправлювач розтяжок", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "32. Булавки", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "33. Карабіни для постановки розтяжок", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "34. Оправка для МУВ", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "35. Універсальний ключ для підривників ПТМ", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36. Котушка з набором дотів та ниток", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.1. Котушка з дротом сталькою (100 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.2. Котушка з дротом 0,8 мм (20 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.3. Котушка з чорними нитками (100 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.4. Котушка з зеленими нитками (100 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "36.5. Котушка з ліскою (100 м)", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "37. Пенал універсальний", countUa: "2 шт.", itemEn: "", countEn: "" },
      { itemUa: "38. Комплект скребків 4 шт.", countUa: "1 компл", itemEn: "", countEn: "" },
      { itemUa: "39. Пенал для детонаторів", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "40. Мінідзеркало оглядове", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "41. Щуп малий односекційний", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "42. Маркер знайдених мін «М»", countUa: "10 шт.", itemEn: "", countEn: "" },
      { itemUa: "43. Турбозапальничка газова", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "44. Щітка шириною 20–25 мм", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "45. Саморіз 30 мм", countUa: "10 шт.", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 12
  },

  // 4. Сіткомети протидронові (1 product)
  {
    id: "net-1",
    route: "/product/net-1",
    category: "Сіткомети протидронові",
    categorySlug: "nets",
    nameUa: "СМ-1 «СТРИЖ»",
    nameEn: "SM-1 \"STRYZH\"",
    shortDescriptionUa: "Механічна система протидії FPV та безпілотним літальним апаратам, розроблена для використання у бойових умовах.",
    shortDescriptionEn: "Mechanical system for countering FPV and unmanned aerial vehicles, designed for use in combat conditions.",
    descriptionUa: "Сіткомет протидроновий «СТРИЖ» — це механічна система протидії FPV та безпілотним літальним апаратам, розроблена для використання у бойових умовах.\n\nПристрій вистрілює сітку, яка нейтралізує ворожі БпЛА, уражаючи їхні пропелери. Не потребує живлення чи спеціальних навичок — готовий до застосування за кілька секунд.\n\nСіткомет комплектується учбовим багаторазовим картриджем для учбової стрільби.\n\nСіткомет ефективно протидіє FPV-дронам, у тому числі моделям із оптоволоконними системами зв’язку. Підходить для піхотних підрозділів, мобільних груп, охорони техніки та позицій у міських або польових умовах.\n\nПускова система обладнана запобіжником, що унеможливлює самовільний спуск ударно-спускового механізму.",
    descriptionEn: "",
    primaryImage: "/Сіткомети протидронові/net-main.png",
    images: [
      "/Сіткомети протидронові/net-main.png",
      "/Сіткомети протидронові/net-02.png",
      "/Сіткомети протидронові/net-03.png",
      "/Сіткомети протидронові/net-04.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри спорядженого пристрою", nameEn: "", valueUa: "255 × 155 × 72 мм", valueEn: "", value: "255 × 155 × 72 мм" },
      { nameUa: "Загальна вага", nameEn: "", valueUa: "0,750 кг", valueEn: "", value: "0,750 кг" },
      { nameUa: "Розмір сітки", nameEn: "", valueUa: "не менше 3500 × 3500 мм", valueEn: "", value: "не менше 3500 × 3500 мм" },
      { nameUa: "Дальність ураження", nameEn: "", valueUa: "10–30 м", valueEn: "", value: "10–30 м" },
      { nameUa: "Холостий патрон", nameEn: "", valueUa: "9 мм", valueEn: "", value: "9 мм" },
      { nameUa: "Наявність запобіжника", nameEn: "", valueUa: "наявний", valueEn: "", value: "наявний" },
      { nameUa: "Повне розкриття сітки", nameEn: "", valueUa: "10 м", valueEn: "", value: "10 м" }
    ],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 13
  },

  // 5. Саперні пристосування (19 products)
  {
    id: "tool-1",
    route: "/product/tool-1",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Електричний кабель на барабані",
    nameEn: "Electric Cable on Reel",
    shortDescriptionUa: "Електричний кабель на барабані для прокладки тимчасових електричних мереж напругою до 380 В.",
    shortDescriptionEn: "Electric cable on a reel for laying temporary electrical networks with a voltage of up to 380 V.",
    descriptionUa: "Електричний кабель на барабані призначений для прокладки тимчасових електричних мереж напругою до 380 В.",
    descriptionEn: "Electric cable on a reel is designed for laying temporary electrical networks with a voltage of up to 380 V.",
    primaryImage: "/electric-cable/cable-main.png",
    images: [
      "/electric-cable/cable-main.png",
      "/electric-cable/cable-02.png",
      "/electric-cable/cable-03.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри, мм, не більше", nameEn: "Overall dimensions, mm, no more than", valueUa: "270 × 220 × 175", valueEn: "270 × 220 × 175", value: "270 × 220 × 175" },
      { nameUa: "Довжина кабелю", nameEn: "Cable length", valueUa: "300 м", valueEn: "300 m", value: "300 м" },
      { nameUa: "Вага, кг, не більше", nameEn: "Weight, kg, no more than", valueUa: "6,8", valueEn: "6.8", value: "6,8" },
      { nameUa: "Електричний опір серцевини довжиною 1 км, не більше", nameEn: "Electrical resistance of a core 1 km long, no more than", valueUa: "41 Ом", valueEn: "41 Ohm", value: "41 Ом" },
      { nameUa: "Міцність на розрив проводів, не менше", nameEn: "Tensile strength of wires, not less than", valueUa: "441 Н (45 кгс)", valueEn: "441 N (45 kgf)", value: "441 Н (45 кгс)" }
    ],
    kitContents: [
      { itemUa: "Котушка", countUa: "1 шт.", itemEn: "Reel", countEn: "1 pc." },
      { itemUa: "Двожильний провід", countUa: "300 м", itemEn: "Two-core wire", countEn: "300 m" },
      { itemUa: "Захисний чохол", countUa: "1 шт.", itemEn: "Protective cover", countEn: "1 pc." }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 14
  },
  {
    id: "tool-2",
    route: "/product/tool-2",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Кактус-5",
    nameEn: "Kaktus-5",
    shortDescriptionUa: "Пристрій примусової зупинки автотранспорту, призначений для перешкоджання несанкціонованому проїзду на режимні об'єкти та зупинки на дорогах.",
    shortDescriptionEn: "Forced vehicle stopping device, designed to prevent unauthorized passage into restricted facilities and stop vehicles on roads.",
    descriptionUa: "ПРИСТРІЙ ПРИМУСОВОЇ ЗУПИНКИ АВТОТРАНСПОРТУ\nПЗА – «Кактус-5»\n\nПристрій примусової зупинки автотранспорту «Кактус-5» призначений для перешкоджання несанкціонованому проїзду легкового і вантажного колісного автотранспорту з пневматичними шинами на режимні об'єкти та примусової зупинки автотранспорту на дорогах, при неможливості зупинити порушників іншими способами.\n\nПристрій легко транспортується і швидко встановлюється практично на будь-яке дорожнє покриття. Ширина загородження — 5,65 метрів.\n\nПри наїзді автомобіля на загородження стержні залишаються в шині, здійснюючи ефективне випускання повітря через спеціальні отвори.\n\nПристрій «Кактус-5» легко складається в напівжорсткий чохол для переноски. В чохлі пристрій перебуває в положенні, готовому до використання.",
    descriptionEn: "",
    primaryImage: "/kaktus-5/kaktus-main.png",
    images: [
      "/kaktus-5/kaktus-main.png",
      "/kaktus-5/kaktus-02.png",
      "/kaktus-5/kaktus-03.png",
      "/kaktus-5/kaktus-04.png",
      "/kaktus-5/kaktus-05.jpg"
    ],
    specifications: [
      { nameUa: "Довжина в складеному (транспортному) положенні", nameEn: "", valueUa: "68 см", valueEn: "", value: "68 см" },
      { nameUa: "Довжина в робочому положенні", nameEn: "", valueUa: "не менше 565 см", valueEn: "", value: "не менше 565 см" },
      { nameUa: "Відстань між сусідніми шипами", nameEn: "", valueUa: "10 см", valueEn: "", value: "10 см" },
      { nameUa: "Висота шипів", nameEn: "", valueUa: "90 мм", valueEn: "", value: "90 мм" },
      { nameUa: "Вага", nameEn: "", valueUa: "не більше 12 кг", valueEn: "", value: "не більше 12 кг" }
    ],
    kitContents: [
      { itemUa: "1. ПЗА – «Кактус-5»", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "2. Чохол (пенал) для перенесення", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "3. Паспорт", countUa: "1 шт.", itemEn: "", countEn: "" },
      { itemUa: "4. Комплект запасних шипів, 30 шт.", countUa: "1 компл", itemEn: "", countEn: "" }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 15
  },
  {
    id: "tool-3",
    route: "/product/tool-3",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Ключ-1",
    nameEn: "Key-1",
    shortDescriptionUa: "Комплект «Ключ-1» для дистанційного знешкодження протитанкових мін типу ТМ-62.",
    shortDescriptionEn: "The 'Key-1' kit for remote neutralization of TM-62 type anti-tank mines.",
    descriptionUa: "Комплект засобів «Ключ-1» призначений для дистанційного знешкодження (деактивування) протитанкових мін типу ТМ-62.\n\nВиріб призначений для технічного забезпечення саперів інженерно-саперних підрозділів під час виконання робіт з дистанційного викручування та вилучення підривачів типу «МВЧ-62» та «МВП-62» протитанкової міни типу ТМ-62, а також її зрушення або перевертання (витягування з ґрунту) з метою виявлення вибухонебезпечних пасток, які можуть бути встановлені під нею.\n\nНабір має компактні розміри та мінімальну вагу.",
    descriptionEn: "The \"Key-1\" tool kit is designed for the remote neutralization (deactivation) of TM-62 type anti-tank mines.\n\nThe product is intended for the technical support of sappers of engineering and sapper units during the execution of works on remote unscrewing and extraction of fuzes of the \"MVCh-62\" and \"MVP-62\" types of the TM-62 anti-tank mine, as well as its moving or overturning (pulling out of the ground) in order to detect explosive traps that may be installed under it.\n\nThe kit has compact dimensions and minimal weight.",
    primaryImage: "/key-1/key-main.png",
    images: [
      "/key-1/key-main.png",
      "/key-1/key-01.jpg",
      "/key-1/key-02.png",
      "/key-1/key-03.png",
      "/key-1/key-04.png"
    ],
    specifications: [
      { nameUa: "Габаритні розміри набору, мм, не більше", nameEn: "Overall dimensions of the kit, mm, no more than", valueUa: "250 × 260 × 150", valueEn: "250 × 260 × 150", value: "250 × 260 × 150" },
      { nameUa: "Загальна вага набору, кг, не більше", nameEn: "Total weight of the kit, kg, no more than", valueUa: "2,8", valueEn: "2.8", value: "2,8" }
    ],
    kitContents: [
      { itemUa: "Універсальний викручувач для підривача типу «МВЧ-62» та підривача типу «МВП-62»", countUa: "1 шт.", itemEn: "Universal unscrewer for the \"MVCh-62\" type fuze and the \"MVP-62\" type fuze", countEn: "1 pc." },
      { itemUa: "Екстрактор (гак) для вилучення міни з ґрунту", countUa: "1 шт.", itemEn: "Extractor (hook) for extracting a mine from the ground", countEn: "1 pc." },
      { itemUa: "Захват мотузковий", countUa: "1 шт.", itemEn: "Rope grab", countEn: "1 pc." },
      { itemUa: "Універсальний ключ для переводу підривників ПТМ", countUa: "1 шт.", itemEn: "Universal key for switching ATM fuzes", countEn: "1 pc." },
      { itemUa: "Паракорд 6 мм довжиною 50 м з карабіном", countUa: "1 шт.", itemEn: "Paracord 6 mm, length 50 m with a carabiner", countEn: "1 pc." },
      { itemUa: "Сумка для транспортування складових набору", countUa: "1 шт.", itemEn: "Bag for transporting the kit components", countEn: "1 pc." }
    ],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 16
  },
  {
    id: "tool-4",
    route: "/product/tool-4",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Магнітні граблі МГ-2",
    nameEn: "Magnetic Rake MG-2",
    shortDescriptionUa: "Пошукове магнітне пристосування МГ-2 для обстеження місця вибуху та збору осколків.",
    shortDescriptionEn: "Search magnetic tool MG-2 for inspecting an explosion site and collecting fragments.",
    descriptionUa: "Магнітні граблі МГ-2 (пошукове магнітне пристосування) призначені для застосування експертами-криміналістами, працівниками вибухотехнічних служб і саперними пошуковими групами при проведенні обстеження і огляду місця події, пов’язаного з вибухом.\n\nПристрій дозволяє швидко і ефективно обстежити місце вибуху і зібрати осколки вибухового пристрою, розкидані на великій площі.\n\nЕфективність збору осколків за допомогою виробу МГ-2 значно вище, ніж при застосуванні інших пристроїв.\n\nПристосування просте по конструкції і зручне в роботі.\n\nДля транспортування виріб легко розбирається і укладається в сумку, і його в складеному вигляді легко можна транспортувати будь-якими видами транспорту.",
    descriptionEn: "The magnetic rake MG-2 (search magnetic tool) is designed for use by forensic experts, explosive ordnance disposal personnel, and sapper search groups when surveying and inspecting a blast scene.\n\nThe device allows for quick and efficient inspection of the explosion site and the collection of explosive device fragments scattered over a large area.\n\nThe efficiency of fragment collection using the MG-2 product is significantly higher than when using other devices.\n\nThe tool is simple in design and easy to operate.\n\nFor transportation, the product is easily disassembled and packed into a bag, and in its folded state, it can be easily transported by any means of transport.",
    primaryImage: "/rake-1/rake-02.png",
    images: [
      "/rake-1/rake-02.png",
      "/rake-1/rake-main.png",
      "/rake-1/rake-03.png",
      "/rake-1/rake-04.png"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 17
  },
  {
    id: "tool-5",
    route: "/product/tool-5",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Пенали для детонаторів",
    nameEn: "Detonator cases",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/untitled folder/IMG_5355.PNG",
    images: [
      "/untitled folder/IMG_5355.PNG",
      "/untitled folder/IMG_5353.PNG",
      "/untitled folder/IMG_5352.PNG",
      "/untitled folder/IMG_5354.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 18
  },
  {
    id: "tool-6",
    route: "/product/tool-6",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Сапка сапера",
    nameEn: "Sapper Hoe",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/untitled folder/IMG_5356.PNG",
    images: [
      "/untitled folder/IMG_5356.PNG",
      "/untitled folder/IMG_5357.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 19
  },
  {
    id: "tool-7",
    route: "/product/tool-7",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Кішки саперні",
    nameEn: "Sapper Hooks",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Кішки саперні/IMG_5358.PNG",
    images: [
      "/Кішки саперні/IMG_5358.PNG",
      "/Кішки саперні/IMG_5360.PNG",
      "/Кішки саперні/IMG_5361.PNG",
      "/Кішки саперні/IMG_5362.PNG",
      "/Кішки саперні/IMG_5363.PNG",
      "/Кішки саперні/IMG_5364.PNG",
      "/Кішки саперні/IMG_5367.PNG",
      "/Кішки саперні/IMG_5368.PNG",
      "/Кішки саперні/IMG_5370.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 20
  },
  {
    id: "tool-8",
    route: "/product/tool-8",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Чеки",
    nameEn: "Safety Pins",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Чеки./IMG_5374.PNG",
    images: [
      "/Чеки./IMG_5374.PNG",
      "/Чеки./IMG_5375.PNG",
      "/Чеки./IMG_5376.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 21
  },
  {
    id: "tool-9",
    route: "/product/tool-9",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Стрічка попереджувальна",
    nameEn: "Warning Tape",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Стрічка попереджувальна./IMG_5386.PNG",
    images: [
      "/Стрічка попереджувальна./IMG_5386.PNG",
      "/Стрічка попереджувальна./IMG_5387.PNG",
      "/Стрічка попереджувальна./IMG_5388.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 22
  },
  {
    id: "tool-10",
    route: "/product/tool-10",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Гак",
    nameEn: "Hook",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Гак/IMG_5381.PNG",
    images: [
      "/Гак/IMG_5381.PNG",
      "/Гак/IMG_5382.PNG",
      "/Гак/IMG_5383.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 23
  },
  {
    id: "tool-11",
    route: "/product/tool-11",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Ключ",
    nameEn: "Wrench",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Гак/IMG_5366.PNG",
    images: [
      "/Гак/IMG_5366.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 24
  },
  {
    id: "tool-12",
    route: "/product/tool-12",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Ключ",
    nameEn: "Wrench",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Ключ”/IMG_5371.PNG",
    images: [
      "/Ключ”/IMG_5371.PNG",
      "/Ключ”/IMG_5373.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 25
  },
  {
    id: "tool-13",
    route: "/product/tool-13",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Ключ",
    nameEn: "Wrench",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Ключ”/IMG_5393.PNG",
    images: [
      "/Ключ”/IMG_5393.PNG",
      "/Ключ”/IMG_5394.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 26
  },
  {
    id: "tool-14",
    route: "/product/tool-14",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Обтискач сапера «Мультитул»",
    nameEn: "Sapper Crimper «Multitool»",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Мультитул/IMG_5400.PNG",
    images: [
      "/Мультитул/IMG_5400.PNG",
      "/Мультитул/IMG_5399.PNG",
      "/Мультитул/IMG_5401.PNG",
      "/Мультитул/IMG_5402.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 27
  },
  {
    id: "tool-15",
    route: "/product/tool-15",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Кішка саперна",
    nameEn: "Sapper Hook",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Кішка саперна/IMG_5395.PNG",
    images: [
      "/Кішка саперна/IMG_5395.PNG",
      "/Кішка саперна/IMG_5396.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 28
  },
  {
    id: "tool-16",
    route: "/product/tool-16",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Котушка з паракордом",
    nameEn: "Paracord Spool",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Кішка саперна/IMG_5403.PNG",
    images: [
      "/Кішка саперна/IMG_5403.PNG",
      "/Кішка саперна/IMG_5404.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 29
  },
  {
    id: "tool-17",
    route: "/product/tool-17",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Котушка з талькою",
    nameEn: "Spool with Talc",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Кішка саперна/IMG_5380.PNG",
    images: [
      "/Кішка саперна/IMG_5380.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 30
  },
  {
    id: "tool-18",
    route: "/product/tool-18",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Прапорці «Міни»",
    nameEn: "Flags «Mines»",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/Міни/IMG_5377.PNG",
    images: [
      "/Міни/IMG_5377.PNG",
      "/Міни/IMG_5378.PNG",
      "/Міни/IMG_5379.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 31
  },
  {
    id: "tool-19",
    route: "/product/tool-19",
    category: "Саперні пристосування",
    categorySlug: "tools",
    nameUa: "Паракорди різної довжини",
    nameEn: "Paracords of various lengths",
    shortDescriptionUa: "",
    shortDescriptionEn: "",
    descriptionUa: "",
    descriptionEn: "",
    primaryImage: "/paracord-lengths/IMG_5389.PNG",
    images: [
      "/paracord-lengths/IMG_5389.PNG",
      "/paracord-lengths/IMG_5390.PNG",
      "/paracord-lengths/IMG_5391.PNG",
      "/paracord-lengths/IMG_5392.PNG"
    ],
    specifications: [],
    kitContents: [],
    priceMode: "request",
    priceAmount: null,
    published: true,
    sortOrder: 32
  }
];
