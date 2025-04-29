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
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-shealth-gradient py-20 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559000357-f6b52ddfcde3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Забота о здоровье вашего ребенка в одном приложении
              </h1>
              <p className="text-xl text-white/80 mb-8">
                SHealth помогает родителям следить за здоровьем, ростом и развитием детей с помощью современных технологий и экспертных рекомендаций.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-shealth-600 hover:bg-shealth-50"
                >
                  <Link to="/documentation">
                    Подробнее
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
                    Записаться к врачу
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="animate-float rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Здоровье детей" 
                    className="w-full h-auto rounded-2xl" 
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg">
                  <span className="text-shealth-600 font-semibold">SHealth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-shealth-gradient">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Возможности платформы
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Календарь вакцинации"
              description="Индивидуальный календарь прививок с уведомлениями и рекомендациями"
              icon={<Calendar className="h-10 w-10 text-white" />}
              link="/calendar"
            />
            <FeatureCard
              title="Отслеживание роста"
              description="Точные графики роста и веса для контроля физического развития"
              icon={<LineChart className="h-10 w-10 text-white" />}
              link="/growth"
            />
            <FeatureCard
              title="Симптомы и диагностика"
              description="Определение симптомов и первичные рекомендации по состоянию"
              icon={<Thermometer className="h-10 w-10 text-white" />}
              link="/symptoms"
            />
            <FeatureCard
              title="Медицинские рекомендации"
              description="Персонализированные советы от педиатров и специалистов"
              icon={<LightbulbIcon className="h-10 w-10 text-white" />}
              link="/recommendations"
            />
            <FeatureCard
              title="AI-ассистент"
              description="Умный помощник для ответов на вопросы о здоровье 24/7"
              icon={<Brain className="h-10 w-10 text-white" />}
              link="/ai-assistant"
            />
            <FeatureCard
              title="Документация"
              description="Вся необходимая документация, лицензии и сертификаты"
              icon={<BookOpen className="h-10 w-10 text-white" />}
              link="/documentation"
            />
          </div>
        </div>
      </section>

      {/* Parent Tools Section - NEW */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-shealth-800 mb-4">
            Инструменты для родителей
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Специальные функции, разработанные для удобства родителей и заботы о здоровье детей
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ParentTool 
              title="Дневник развития ребенка" 
              description="Отслеживайте все важные этапы развития вашего малыша в одном месте"
              icon={<Baby className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Менеджер лекарств" 
              description="Управляйте приемом лекарств, дозировками и получайте напоминания"
              icon={<Pill className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Медицинская карта" 
              description="Храните всю медицинскую историю ребенка в цифровом формате"
              icon={<Heart className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Онлайн-консультации" 
              description="Консультируйтесь с педиатрами и специалистами через видеосвязь"
              icon={<Video className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Чек-листы здоровья" 
              description="Используйте готовые чек-листы для регулярной проверки здоровья"
              icon={<ClipboardCheck className="h-6 w-6 text-shealth-600" />}
            />
            <ParentTool 
              title="Режим дня" 
              description="Составляйте оптимальный распорядок дня с учетом возраста ребенка"
              icon={<Clock className="h-6 w-6 text-shealth-600" />}
            />
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-shealth-600 hover:bg-shealth-700">
              <Link to="/documentation">
                Подробнее о функциях
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-shealth-50">
        <div className="container">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-shealth-800 mb-4">
                  Нужна консультация врача?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Получите квалифицированную помощь от лучших специалистов онлайн или запишитесь на очный прием в ближайшую клинику.
                </p>
                <Button asChild size="lg" className="bg-shealth-600 hover:bg-shealth-700">
                  <a
                    href="https://sberhealth.ru/doctors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Найти врача
                  </a>
                </Button>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
                  alt="Консультация врача"
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

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

interface ParentToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

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

export default Index;
