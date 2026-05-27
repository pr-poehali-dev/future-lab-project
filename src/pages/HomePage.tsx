import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"
import { universities } from "@/lib/hostels-data"

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0
          const step = end / 60
          const interval = setInterval(() => {
            current += step
            if (current >= end) {
              setValue(end)
              clearInterval(interval)
            } else {
              setValue(Math.floor(current))
            }
          }, 16)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="text-5xl font-bold text-[#2563EB]">
      {value}{suffix}
    </div>
  )
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in")
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )
    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observerRef.current?.disconnect()
    }
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 1) {
      const filtered = universities
        .filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.shortName.toLowerCase().includes(query.toLowerCase()))
        .map((u) => u.shortName)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleSelectUniversity = (name: string) => {
    setSearchQuery(name)
    setSuggestions([])
    navigate(`/results?university=${encodeURIComponent(name)}`)
  }

  const handleStartSearch = () => {
    navigate(`/results${searchQuery ? `?university=${encodeURIComponent(searchQuery)}` : ""}`)
  }

  const faqs = [
    {
      q: "Как работает поиск хостелов?",
      a: "Вы выбираете вуз, задаёте фильтры (расстояние, цена, удобства) — и сервис показывает подходящие варианты на карте и в списке.",
    },
    {
      q: "Как происходит бронирование?",
      a: "Выберите хостел, укажите даты и количество гостей. После подтверждения вы получаете QR-код для заселения на email.",
    },
    {
      q: "Можно ли отменить бронирование?",
      a: "Да, бесплатная отмена доступна за 24 часа до заезда. Подробные условия указаны в карточке каждого хостела.",
    },
    {
      q: "Как подключить хостел к платформе?",
      a: "Владельцам хостелов нужно зарегистрироваться как партнёр. Добавляйте объекты, управляйте бронированиями в личном кабинете.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1F2937] overflow-x-hidden font-sans">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={16} className="text-white" />
            </div>
            <span className="font-bold text-[#1F2937] text-lg">СтудХостел</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {["Как работает", "Вузы", "Хостелам", "FAQ"].map((item, i) => (
              <button key={i} className="text-sm text-gray-500 hover:text-[#2563EB] transition-colors">
                {item}
              </button>
            ))}
          </nav>
          <Button
            onClick={handleStartSearch}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl px-5 h-10"
          >
            Найти хостел
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/8 via-transparent to-[#10B981]/8"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-5"
              style={{
                width: `${120 + i * 80}px`,
                height: `${120 + i * 80}px`,
                background: i % 2 === 0 ? "#2563EB" : "#10B981",
                top: `${10 + i * 12}%`,
                left: `${5 + i * 15}%`,
                transform: `translateY(${scrollY * (0.05 + i * 0.02)}px)`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] rounded-full px-4 py-2 text-sm font-medium mb-8 border border-[#10B981]/20">
              <Icon name="GraduationCap" size={16} />
              Сервис бронирования для студентов
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-[#1F2937] leading-tight mb-6">
              Найдите хостел рядом с{" "}
              <span className="text-[#2563EB]">вашим вузом</span>{" "}
              в Краснодаре
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Подберите доступное жильё в шаговой доступности от учёбы. Проверенные хостелы, честные отзывы, мгновенное бронирование.
            </p>

            {/* SEARCH BOX */}
            <div className="relative max-w-2xl mx-auto">
              <div className="flex gap-3 bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
                <div className="relative flex-1">
                  <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStartSearch()}
                    placeholder="Введите название вуза в Краснодаре"
                    className="w-full pl-12 pr-4 h-12 rounded-xl border-0 bg-[#F9FAFB] text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 text-sm"
                  />
                </div>
                <Button
                  onClick={handleStartSearch}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl px-6 h-12 text-sm font-semibold"
                >
                  Начать поиск
                </Button>
              </div>

              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSelectUniversity(s)}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#F9FAFB] text-left text-sm text-[#1F2937] transition-colors"
                    >
                      <Icon name="MapPin" size={14} className="text-[#2563EB]" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* POPULAR UNIVERSITIES */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-gray-400 mr-2">Популярные вузы:</span>
              {universities.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleSelectUniversity(u.shortName)}
                  className="bg-white border border-gray-200 text-[#1F2937] rounded-full px-4 py-1.5 text-sm hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200 shadow-sm"
                >
                  {u.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-gray-300" />
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Вузы и хостелы на карте Краснодара
            </h2>
            <p className="text-gray-500 text-lg">Найдите ближайший хостел к вашему университету</p>
          </div>
          <div className="animate-on-scroll rounded-3xl overflow-hidden shadow-2xl border border-gray-100 h-[480px] bg-[#e8f0fe] relative">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=38.9727%2C45.0355&z=13&l=map&pt=38.9739,45.0159,pm2blm~38.9717,45.0448,pm2blm~38.9524,45.0352,pm2blm~38.9843,45.0672,pm2blm~38.9831,45.0408,pm2blm~38.9758,45.0121,pm2gnm~38.9765,45.0183,pm2gnm~38.9734,45.0421,pm2gnm~38.9558,45.0334,pm2gnm~38.9815,45.041,pm2gnm"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Карта хостелов Краснодара"
              className="w-full h-full"
              allowFullScreen
            />
            <div className="absolute bottom-4 left-4 flex gap-3">
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
                <span className="text-[#1F2937] font-medium">Вузы</span>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-[#1F2937] font-medium">Хостелы</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { end: 18, suffix: "+", label: "Хостелов в базе" },
              { end: 5, suffix: "", label: "Вузов Краснодара" },
              { end: 2400, suffix: "+", label: "Довольных гостей" },
              { end: 4.6, suffix: "★", label: "Средний рейтинг" },
            ].map((m, i) => (
              <div key={i} className="animate-on-scroll text-center">
                <AnimatedCounter end={m.end} suffix={m.suffix} />
                <div className="text-gray-500 text-sm mt-2">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">Как это работает</h2>
            <p className="text-gray-500 text-lg">Бронирование за 3 простых шага</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "Search", title: "Найдите", desc: "Введите название вуза или район. Сервис покажет подходящие хостелы на карте и в списке.", color: "#2563EB" },
              { icon: "Filter", title: "Отфильтруйте", desc: "Укажите расстояние, цену, удобства. Фильтры обновляют результаты мгновенно.", color: "#10B981" },
              { icon: "CalendarCheck", title: "Забронируйте", desc: "Выберите даты, укажите гостей и получите подтверждение с QR-кодом на email.", color: "#2563EB" },
            ].map((step, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  <Icon name={step.icon} fallback="Star" size={26} style={{ color: step.color }} />
                </div>
                <div className="text-3xl font-bold text-gray-100 mb-2">0{i + 1}</div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="animate-on-scroll text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="animate-on-scroll bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[#1F2937]">{faq.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2563EB]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Готовы найти хостел рядом с вузом?
          </h2>
          <p className="text-blue-200 text-lg mb-10">
            Присоединяйтесь к тысячам студентов, которые уже нашли комфортное жильё рядом с учёбой
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleStartSearch}
              className="bg-white text-[#2563EB] hover:bg-blue-50 rounded-xl px-8 h-12 font-semibold text-base"
            >
              <Icon name="Search" size={18} className="mr-2" />
              Начать поиск хостелов
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 h-12 font-semibold text-base bg-transparent"
            >
              <Icon name="Building2" size={18} className="mr-2" />
              Разместить хостел
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1F2937] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={14} className="text-white" />
            </div>
            <span className="font-bold text-white">СтудХостел</span>
            <span className="text-gray-600 ml-2">— Краснодар, 2026</span>
          </div>
          <div className="text-sm text-center">Демонстрационная версия для инвесторов и партнёров</div>
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} className="text-[#10B981]" />
            <span className="text-sm">Безопасное бронирование</span>
          </div>
        </div>
      </footer>
    </div>
  )
}