export interface University {
  id: string
  name: string
  shortName: string
  address: string
  lat: number
  lng: number
}

export interface Hostel {
  id: string
  name: string
  universityId: string
  distanceKm: number
  distanceText: string
  rating: number
  reviewCount: number
  pricePerNight: number
  address: string
  amenities: string[]
  description: string
  lat: number
  lng: number
  photos: string[]
  reviews: {
    author: string
    rating: number
    text: string
    date: string
  }[]
}

export const universities: University[] = [
  {
    id: "kubgu",
    name: "Кубанский государственный университет",
    shortName: "КубГУ",
    address: "ул. Ставропольская, 149",
    lat: 45.0159,
    lng: 38.9739,
  },
  {
    id: "kubgmu",
    name: "Кубанский государственный медицинский университет",
    shortName: "КубГМУ",
    address: "ул. Митрофана Седина, 4",
    lat: 45.0448,
    lng: 38.9717,
  },
  {
    id: "kubgau",
    name: "Кубанский государственный аграрный университет",
    shortName: "КубГАУ",
    address: "ул. Калинина, 13",
    lat: 45.0352,
    lng: 38.9524,
  },
  {
    id: "mvd",
    name: "Краснодарский университет МВД России",
    shortName: "КрУ МВД",
    address: "ул. Ярославская, 128",
    lat: 45.0672,
    lng: 38.9843,
  },
  {
    id: "kgtu",
    name: "Кубанский государственный технологический университет",
    shortName: "КубГТУ",
    address: "ул. Московская, 2",
    lat: 45.0408,
    lng: 38.9831,
  },
]

export const hostels: Hostel[] = [
  {
    id: "h1",
    name: "Хостел «Студенческий»",
    universityId: "kubgu",
    distanceKm: 0.4,
    distanceText: "400 м от КубГУ",
    rating: 4.7,
    reviewCount: 134,
    pricePerNight: 750,
    address: "ул. Ставропольская, 112",
    amenities: ["Wi-Fi", "Кухня", "Стиральная машина", "Холодильник", "24/7"],
    description:
      "Уютный хостел в двух шагах от КубГУ. Идеально подходит для студентов, абитуриентов и гостей города. В шаговой доступности — магазины, кафе и остановки общественного транспорта.",
    lat: 45.0121,
    lng: 38.9758,
    photos: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    ],
    reviews: [
      { author: "Алексей К.", rating: 5, text: "Отличное место! Персонал очень дружелюбный, всё чисто. Рядом с университетом — удобно.", date: "15 апреля 2025" },
      { author: "Мария Д.", rating: 4, text: "Хорошее соотношение цена/качество. Wi-Fi работает стабильно, кухня оснащена всем необходимым.", date: "3 марта 2025" },
      { author: "Игорь С.", rating: 5, text: "Приезжаю уже третий раз — всегда доволен. Очень близко к КубГУ, за 5 минут пешком.", date: "20 января 2025" },
    ],
  },
  {
    id: "h2",
    name: "Smart Hostel Krasnodar",
    universityId: "kubgu",
    distanceKm: 0.85,
    distanceText: "850 м от КубГУ",
    rating: 4.5,
    reviewCount: 89,
    pricePerNight: 900,
    address: "ул. Рашпилевская, 67",
    amenities: ["Wi-Fi", "Кухня", "Парковка", "Кондиционер"],
    description:
      "Современный хостел с продуманной инфраструктурой. Просторные комнаты, быстрый интернет и удобная локация делают его идеальным для учёбы и отдыха.",
    lat: 45.0183,
    lng: 38.9765,
    photos: [
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    reviews: [
      { author: "Татьяна В.", rating: 5, text: "Чисто, тихо, удобно. Отличный Wi-Fi — работала с ноутбуком без проблем.", date: "8 мая 2025" },
      { author: "Денис М.", rating: 4, text: "Хороший хостел, но немного шумновато по вечерам. В целом рекомендую.", date: "22 апреля 2025" },
    ],
  },
  {
    id: "h3",
    name: "Хостел «Центральный»",
    universityId: "kubgmu",
    distanceKm: 0.3,
    distanceText: "300 м от КубГМУ",
    rating: 4.8,
    reviewCount: 212,
    pricePerNight: 850,
    address: "ул. Красная, 88",
    amenities: ["Wi-Fi", "Кухня", "Завтрак", "Сейф", "24/7"],
    description:
      "Хостел в центре Краснодара рядом с медицинским университетом. Популярен среди студентов КубГМУ и медиков со всего края. Завтрак включён в стоимость.",
    lat: 45.0421,
    lng: 38.9734,
    photos: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80",
    ],
    reviews: [
      { author: "Ольга Н.", rating: 5, text: "Лучший хостел в Краснодаре! Всё на высоте — и сервис, и расположение.", date: "1 мая 2025" },
      { author: "Пётр Ф.", rating: 5, text: "Приехал на конференцию в КубГМУ — очень удобно. Завтрак вкусный!", date: "14 марта 2025" },
      { author: "Светлана К.", rating: 4, text: "Хорошее место, персонал отзывчивый. Немного тесновато, но цена оправдывает.", date: "5 февраля 2025" },
    ],
  },
  {
    id: "h4",
    name: "GreenHome Hostel",
    universityId: "kubgau",
    distanceKm: 0.6,
    distanceText: "600 м от КубГАУ",
    rating: 4.3,
    reviewCount: 67,
    pricePerNight: 650,
    address: "ул. Калинина, 45",
    amenities: ["Wi-Fi", "Кухня", "Велопарковка", "Сад"],
    description:
      "Экологичный хостел с уютным садом рядом с аграрным университетом. Идеальное место для студентов КубГАУ — тихое, зелёное, недорогое.",
    lat: 45.0334,
    lng: 38.9558,
    photos: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    reviews: [
      { author: "Андрей Л.", rating: 4, text: "Тихое место, красивый двор. Далековато от центра, зато рядом с вузом.", date: "20 апреля 2025" },
      { author: "Наталья Р.", rating: 5, text: "Супер! Очень уютно, как дома. Хозяева очень приветливые.", date: "7 марта 2025" },
    ],
  },
  {
    id: "h5",
    name: "Хостел «Академия»",
    universityId: "kgtu",
    distanceKm: 0.2,
    distanceText: "200 м от КубГТУ",
    rating: 4.6,
    reviewCount: 156,
    pricePerNight: 700,
    address: "ул. Московская, 15",
    amenities: ["Wi-Fi", "Кухня", "Стиральная машина", "Лаундж", "24/7"],
    description:
      "Хостел прямо у ворот КубГТУ — удобнее не найти. Большой лаунж-зал для работы и отдыха, скоростной интернет, круглосуточная стойка регистрации.",
    lat: 45.041,
    lng: 38.9815,
    photos: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80",
    ],
    reviews: [
      { author: "Сергей Б.", rating: 5, text: "Отличный хостел! До КубГТУ пешком 3 минуты. Всё чисто и удобно.", date: "12 мая 2025" },
      { author: "Юлия М.", rating: 4, text: "Хорошее место для учёбы. Wi-Fi отличный, есть место за столом.", date: "30 марта 2025" },
      { author: "Николай В.", rating: 5, text: "Приятный персонал, всё сделано для комфортного пребывания.", date: "15 февраля 2025" },
    ],
  },
  {
    id: "h6",
    name: "City Stay Hostel",
    universityId: "kubgu",
    distanceKm: 1.2,
    distanceText: "1,2 км от КубГУ",
    rating: 4.1,
    reviewCount: 44,
    pricePerNight: 580,
    address: "ул. Гимназическая, 78",
    amenities: ["Wi-Fi", "Кухня", "Телевизор"],
    description: "Бюджетный хостел с удобным расположением. Подходит для тех, кто ищет доступное жильё рядом с КубГУ.",
    lat: 45.0205,
    lng: 38.9801,
    photos: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
    ],
    reviews: [
      { author: "Виктор Е.", rating: 4, text: "Бюджетно и достаточно комфортно. Для нескольких ночей — хороший вариант.", date: "25 апреля 2025" },
    ],
  },
  {
    id: "h7",
    name: "Хостел «Берег»",
    universityId: "kubgmu",
    distanceKm: 1.0,
    distanceText: "1 км от КубГМУ",
    rating: 4.4,
    reviewCount: 93,
    pricePerNight: 800,
    address: "ул. Северная, 211",
    amenities: ["Wi-Fi", "Кухня", "Парковка", "Кондиционер", "Сейф"],
    description: "Спокойный хостел с хорошей звукоизоляцией и просторными комнатами. Популярен среди студентов-медиков и интернов.",
    lat: 45.0461,
    lng: 38.977,
    photos: [
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    ],
    reviews: [
      { author: "Екатерина З.", rating: 4, text: "Тихо и комфортно. Хорошая кухня, есть всё для готовки.", date: "2 мая 2025" },
      { author: "Роман Т.", rating: 5, text: "Прекрасный хостел! Обязательно вернусь.", date: "18 апреля 2025" },
    ],
  },
  {
    id: "h8",
    name: "Hostel ONE Krasnodar",
    universityId: "mvd",
    distanceKm: 0.7,
    distanceText: "700 м от КрУ МВД",
    rating: 4.5,
    reviewCount: 78,
    pricePerNight: 950,
    address: "ул. Ярославская, 200",
    amenities: ["Wi-Fi", "Кухня", "Тренажёрный зал", "24/7", "Кондиционер"],
    description: "Современный хостел с тренажёрным залом. Пользуется популярностью у курсантов и сотрудников силовых структур.",
    lat: 45.0695,
    lng: 38.9876,
    photos: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    ],
    reviews: [
      { author: "Дмитрий П.", rating: 5, text: "Отлично! Тренажёрный зал — большой плюс. Рядом с МВД-университетом.", date: "10 мая 2025" },
      { author: "Анна К.", rating: 4, text: "Хорошее место, чисто и удобно. Персонал профессиональный.", date: "28 марта 2025" },
    ],
  },
]

export const amenityIcons: Record<string, string> = {
  "Wi-Fi": "Wifi",
  "Кухня": "ChefHat",
  "Стиральная машина": "Shirt",
  "Холодильник": "Refrigerator",
  "24/7": "Clock",
  "Парковка": "Car",
  "Кондиционер": "Wind",
  "Завтрак": "Coffee",
  "Сейф": "Shield",
  "Велопарковка": "Bike",
  "Сад": "Leaf",
  "Лаундж": "Sofa",
  "Телевизор": "Tv",
  "Тренажёрный зал": "Dumbbell",
}
