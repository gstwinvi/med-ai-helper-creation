import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Calendar, 
  LineChart, 
  Thermometer, 
  LightbulbIcon, 
  Brain,
  Baby, 
  Pill, 
  Heart, 
  Video,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Clock,
  Shield,
  Star,
  Check,
  Map,
  Users,
  MessageSquare,
  BarChart,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-shealth-gradient py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-shealth-700/20 to-transparent"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Забота о здоровье детей стала проще и надёжнее
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                SHealth — умная платформа для родителей, которая помогает следить за здоровьем, 
                безопасностью и развитием вашего ребёнка в одном удобном приложении.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-shealth-600 hover:bg-shealth-50"
                >
                  <Link to="/documentation">
                    Начать бесплатно
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <a
                    href="https://sberhealth.ru/doctors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Консультация с педиатром
                  </a>
                </Button>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="border-2 border-shealth-500 w-8 h-8">
                      <AvatarImage 
                        src={`https://i.pravatar.cc/100?img=${i+20}`} 
                        alt={`Пользователь ${i}`} 
                      />
                      <AvatarFallback>АБ</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="ml-4 text-white/90">
                  <span className="font-semibold">5000+</span> родителей уже с нами
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="animate-float rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Счастливая семья с ребенком на приеме у врача" 
                    className="w-full h-auto rounded-2xl" 
                  />
                </div>
                <div className="absolute top-0 right-0 bg-shealth-50 p-3 rounded-bl-xl rounded-tr-xl shadow-lg text-shealth-600">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                  <Heart className="text-red-500 animate-pulse-slow" />
                  <div>
                    <div className="text-sm text-gray-500">Пульс</div>
                    <div className="text-shealth-600 font-semibold">98 уд/мин</div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                  <Thermometer className="text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-500">Температура</div>
                    <div className="text-shealth-600 font-semibold">36.6°C</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - NEW */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-shealth-800 mb-4">
              Почему родители выбирают SHealth
            </h2>
            <p className="text-lg text-gray-600">
              Мы объединяем современные технологии и медицинскую экспертизу, чтобы обеспечить 
              родителям спокойствие и детям здоровье.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Shield className="h-8 w-8 text-shealth-600" />}
              title="Безопасность и надежность"
              description="Все данные о здоровье ребенка защищены по самым высоким стандартам. Доступ только для родителей и авторизованных врачей."
            />
            <BenefitCard 
              icon={<Clock className="h-8 w-8 text-shealth-600" />}
              title="Экономия времени и сил"
              description="Больше не нужно вести бумажные записи или искать разрозненную информацию. Вся история здоровья ребенка в одном приложении."
            />
            <BenefitCard 
              icon={<Heart className="h-8 w-8 text-shealth-600" />}
              title="Забота о здоровье 24/7"
              description="Непрерывный мониторинг показателей здоровья и моментальные уведомления о любых отклонениях от нормы."
            />
          </div>
          
          <div className="mt-12 p-8 bg-shealth-50 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-shealth-800 mb-4">
                  ИИ на страже здоровья вашего ребенка
                </h3>
                <p className="text-gray-600 mb-6">
                  Наш умный ассистент анализирует все показатели здоровья вашего ребенка 
                  и предупреждает о возможных рисках до того, как они станут проблемой.
                </p>
                <ul className="space-y-3">
                  {[
                    "Раннее выявление возможных заболеваний",
                    "Персонализированные рекомендации по здоровью",
                    "Мгновенная связь с педиатром при тревожных симптомах"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-shealth-600 mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button asChild className="bg-shealth-600 hover:bg-shealth-700">
                    <Link to="/ai-assistant">
                      Узнать больше об ИИ-ассистенте
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581594549144-e721b7b625ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Умный ассистент здоровья" 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <Brain className="text-shealth-600 h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-shealth-gradient">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Возможности платформы
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              SHealth объединяет все необходимые инструменты для комплексной заботы о здоровье вашего ребенка
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Календарь вакцинации"
              description="Индивидуальный календарь прививок с уведомлениями и рекомендациями врачей по возрасту"
              icon={<Calendar className="h-10 w-10 text-white" />}
              link="/calendar"
            />
            <FeatureCard
              title="Мониторинг роста"
              description="Точные графики роста и веса с сравнительным анализом по возрастным нормам"
              icon={<LineChart className="h-10 w-10 text-white" />}
              link="/growth"
            />
            <FeatureCard
              title="Симптомы и диагностика"
              description="Определение симптомов и первичные рекомендации от квалифицированных педиатров"
              icon={<Thermometer className="h-10 w-10 text-white" />}
              link="/symptoms"
            />
            <FeatureCard
              title="Рекомендации врачей"
              description="Персонализированные советы от педиатров и узких специалистов по результатам анализов"
              icon={<LightbulbIcon className="h-10 w-10 text-white" />}
              link="/recommendations"
            />
            <FeatureCard
              title="AI-ассистент"
              description="Умный помощник для ответов на вопросы о здоровье ребенка в любое время суток"
              icon={<Brain className="h-10 w-10 text-white" />}
              link="/ai-assistant"
            />
            <FeatureCard
              title="Медицинская документация"
              description="Храните все справки, анализы и заключения врачей в едином защищенном хранилище"
              icon={<BookOpen className="h-10 w-10 text-white" />}
              link="/documentation"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section - NEW */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-shealth-800 mb-4">
              Как работает SHealth
            </h2>
            <p className="text-lg text-gray-600">
              Всего три простых шага, чтобы начать заботиться о здоровье вашего ребенка
              по-новому
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="absolute top-16 left-0 right-0 h-1 bg-shealth-100 hidden md:block"></div>
            
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-shealth-500 text-white flex items-center justify-center text-xl font-bold mb-6 z-10">
                1
              </div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Регистрация" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-shealth-800 mb-2">Создайте профиль ребенка</h3>
              <p className="text-gray-600">
                Зарегистрируйтесь и добавьте информацию о вашем ребенке — возраст, вес, рост и особенности здоровья
              </p>
            </div>
            
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-shealth-500 text-white flex items-center justify-center text-xl font-bold mb-6 z-10">
                2
              </div>
              <img 
                src="https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Настройка мониторинга" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-shealth-800 mb-2">Настройте мониторинг</h3>
              <p className="text-gray-600">
                Выберите параметры здоровья, которые хотите отслеживать, и периодичность проверок
              </p>
            </div>
            
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-shealth-500 text-white flex items-center justify-center text-xl font-bold mb-6 z-10">
                3
              </div>
              <img 
                src="https://images.unsplash.com/photo-1576765608866-5b51f5509611?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Получение рекомендаций" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-shealth-800 mb-2">Получайте рекомендации</h3>
              <p className="text-gray-600">
                Система анализирует данные и предоставляет персонализированные советы и напоминания
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-shealth-600 hover:bg-shealth-700">
              <Link to="/documentation">
                Начать сейчас
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Parent Tools Section */}
      <section className="py-16 bg-shealth-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-shealth-800 mb-4">
              Инструменты для современных родителей
            </h2>
            <p className="text-lg text-gray-600">
              Специальные функции, разработанные совместно с педиатрами для эффективной заботы о здоровье детей
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ParentTool 
              title="Дневник развития ребенка" 
              description="Отслеживайте все важные этапы развития вашего малыша и сравнивайте с возрастными нормами"
              icon={<Baby className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Планировщик лекарств" 
              description="Управляйте графиком приема лекарств, дозировками и получайте своевременные напоминания"
              icon={<Pill className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Единая медкарта" 
              description="Храните и систематизируйте всю медицинскую историю ребенка в защищенном цифровом формате"
              icon={<Heart className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Телемедицина 24/7" 
              description="Консультируйтесь с детскими врачами разных специальностей через видеосвязь в любое время"
              icon={<Video className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Чек-листы здоровья" 
              description="Проверяйте здоровье ребенка с помощью готовых чек-листов, разработанных педиатрами"
              icon={<ClipboardCheck className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Оптимальный режим дня" 
              description="Составляйте режим питания, сна и активностей с учетом индивидуальных особенностей ребенка"
              icon={<Clock className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Локация и безопасность" 
              description="Отслеживайте местоположение ребенка и получайте уведомления о выходе из безопасных зон"
              icon={<Map className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Сообщество родителей" 
              description="Общайтесь с другими родителями, делитесь опытом и получайте поддержку в сложных ситуациях"
              icon={<Users className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Мобильное приложение" 
              description="Используйте все функции платформы с вашего смартфона в любое время и в любом месте"
              icon={<Smartphone className="h-6 w-6 text-shealth-600" />}
            />
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-shealth-600 hover:bg-shealth-700">
              <Link to="/documentation">
                Исследовать все функции
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-shealth-800 mb-4">
              Отзывы счастливых родителей
            </h2>
            <p className="text-lg text-gray-600">
              Более 5000 семей уже доверяют SHealth заботу о здоровье своих детей
            </p>
          </div>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-2 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 italic text-lg">"{testimonial.text}"</p>
                        <div className="flex items-center mt-4">
                          <Avatar className="h-12 w-12 border-2 border-shealth-100">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <div className="font-semibold text-shealth-800">{testimonial.name}</div>
                            <div className="text-sm text-gray-500">{testimonial.title}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </Carousel>
          
          <div className="mt-12 bg-shealth-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-shealth-600 mb-2">5000+</div>
                <div className="text-gray-600">Счастливых семей</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-shealth-600 mb-2">98%</div>
                <div className="text-gray-600">Положительных отзывов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-shealth-600 mb-2">24/7</div>
                <div className="text-gray-600">Поддержка пользователей</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-shealth-gradient">
        <div className="container">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-shealth-800 mb-4">
                  Нужна консультация детского врача?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Получите квалифицированную помощь от лучших педиатров онлайн или запишитесь на очный прием в ближайшую детскую клинику.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-shealth-600 hover:bg-shealth-700">
                    <a
                      href="https://sberhealth.ru/doctors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Найти педиатра
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-shealth-600 text-shealth-600 hover:bg-shealth-50">
                    <a
                      href="https://sberhealth.ru/s/detskiy-vrach"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Срочная консультация
                    </a>
                  </Button>
                </div>
                <div className="mt-6 flex items-center text-gray-500 text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Консультации проводятся через защищенный канал связи
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
                  alt="Онлайн-консультация с детским врачом"
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-shealth-800 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-lg text-gray-600">
              Ответы на самые популярные вопросы о платформе SHealth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-shealth-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-shealth-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Остались вопросы? Свяжитесь с нашей службой поддержки</p>
            <Button asChild className="bg-shealth-600 hover:bg-shealth-700">
              <a href="mailto:support@shealth.ru">
                <MessageSquare className="mr-2 h-4 w-4" />
                Написать в поддержку
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Component Props Types
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

interface ParentToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Components
const FeatureCard = ({ title, description, icon, link }: FeatureCardProps) => {
  return (
    <Link to={link} className="feature-card block p-6 text-white">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/80 mb-4">{description}</p>
      <div className="flex items-center text-white/90 font-medium">
        Подробнее
        <ArrowRight className="ml-2 h-4 w-4" />
      </div>
    </Link>
  );
};

const ParentTool = ({ title, description, icon }: ParentToolProps) => {
  return (
    <div className="parent-tools-card p-6">
      <div className="rounded-full bg-shealth-50 p-3 inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-shealth-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="rounded-full bg-shealth-50 p-4 inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-shealth-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Data
const testimonials = [
  {
    name: "Анна Смирнова",
    title: "Мама двоих детей",
    text: "SHealth полностью изменил мой подход к заботе о здоровье детей. Приложение напоминает о прививках, помогает отслеживать рост и вес, а консультация с педиатром доступна в любое время. Теперь я всегда спокойна за здоровье моих малышей!",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "Дмитрий Петров",
    title: "Отец годовалой дочери",
    text: "Как молодому папе, мне было сложно следить за всеми аспектами здоровья дочери. SHealth помогает структурировать информацию и дает понятные рекомендации. ИИ-ассистент однажды помог выявить начинающееся заболевание до появления серьезных симптомов.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Елена Ковалева",
    title: "Мама ребенка с особенностями здоровья",
    text: "У моего сына аллергия и астма. SHealth помогает отслеживать его состояние, записывать приступы и триггеры, а также следить за приемом лекарств. Врачи отмечают, насколько точную информацию я теперь предоставляю на осмотрах.",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

const faqs = [
  {
    question: "Как обеспечивается безопасность данных о моем ребенке?",
    answer: "Все данные хранятся на защищенных серверах с использованием шифрования. Доступ к информации имеете только вы и авторизованные вами врачи. Мы соблюдаем все требования законодательства о защите персональных данных."
  },
  {
    question: "Могу ли я предоставить доступ к данным педиатру нашей поликлиники?",
    answer: "Да, вы можете предоставить временный доступ к данным любому врачу, отправив ему защищенную ссылку. Врач получит доступ только к той информации, которую вы разрешите."
  },
  {
    question: "Подходит ли SHealth для детей разного возраста?",
    answer: "Да, платформа адаптируется под возраст ребенка — от младенчества до подросткового периода. Рекомендации, нормы развития и функции меняются в зависимости от возраста."
  },
  {
    question: "На основе каких данных ИИ-ассистент делает свои рекомендации?",
    answer: "ИИ-ассистент анализирует информацию о здоровье вашего ребенка, сравнивает с медицинскими стандартами и научными данными. Все рекомендации основаны на верифицированных медицинских протоколах и проверяются врачами."
  }
];

export default Index;
