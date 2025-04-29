import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FileText, 
  Shield, 
  Award, 
  CheckCircle, 
  Download, 
  ArrowRight, 
  Users,
  BookOpen,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Фильтрация документов по поисковому запросу
  const filteredLicenses = licenses.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredAgreements = agreements.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCertificates = certificates.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredUserDocs = userDocs.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-shealth-gradient py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              Документация SHealth
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Здесь вы найдете все необходимые документы, включая лицензии, сертификаты, 
              соглашения и руководства по использованию сервиса
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск документов..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Document Tabs Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <Tabs defaultValue="user-docs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="user-docs" className="text-sm md:text-base">
                <Users className="h-4 w-4 mr-2" />
                Для пользователей
              </TabsTrigger>
              <TabsTrigger value="licenses" className="text-sm md:text-base">
                <Award className="h-4 w-4 mr-2" />
                Лицензии
              </TabsTrigger>
              <TabsTrigger value="certificates" className="text-sm md:text-base">
                <CheckCircle className="h-4 w-4 mr-2" />
                Сертификаты
              </TabsTrigger>
              <TabsTrigger value="agreements" className="text-sm md:text-base">
                <FileText className="h-4 w-4 mr-2" />
                Соглашения
              </TabsTrigger>
            </TabsList>
            
            {/* Документы для пользователей */}
            <TabsContent value="user-docs">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-shealth-800 mb-2">Документация для пользователей</h2>
                <p className="text-gray-600">Руководства и инструкции по использованию платформы SHealth</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUserDocs.length > 0 ? (
                  filteredUserDocs.map((doc, index) => (
                    <DocumentCard 
                      key={index}
                      title={doc.title}
                      description={doc.description}
                      icon={doc.icon}
                      date={doc.date}
                      link={doc.link}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">По вашему запросу ничего не найдено</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Лицензии */}
            <TabsContent value="licenses">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-shealth-800 mb-2">Лицензии</h2>
                <p className="text-gray-600">Официальные лицензии и разрешения на осуществление деятельности</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLicenses.length > 0 ? (
                  filteredLicenses.map((doc, index) => (
                    <DocumentCard 
                      key={index}
                      title={doc.title}
                      description={doc.description}
                      icon={doc.icon}
                      date={doc.date}
                      link={doc.link}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">По вашему запросу ничего не найдено</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Сертификаты */}
            <TabsContent value="certificates">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-shealth-800 mb-2">Сертификаты</h2>
                <p className="text-gray-600">Сертификаты соответствия и качества предоставляемых услуг</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.length > 0 ? (
                  filteredCertificates.map((doc, index) => (
                    <DocumentCard 
                      key={index}
                      title={doc.title}
                      description={doc.description}
                      icon={doc.icon}
                      date={doc.date}
                      link={doc.link}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">По вашему запросу ничего не найдено</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Соглашения */}
            <TabsContent value="agreements">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-shealth-800 mb-2">Соглашения</h2>
                <p className="text-gray-600">Пользовательские соглашения и правовые документы</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgreements.length > 0 ? (
                  filteredAgreements.map((doc, index) => (
                    <DocumentCard 
                      key={index}
                      title={doc.title}
                      description={doc.description}
                      icon={doc.icon}
                      date={doc.date}
                      link={doc.link}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">По вашему запросу ничего не найдено</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Legal Information Section */}
      <section className="py-12 bg-shealth-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-shealth-800 mb-6 text-center">
              Правовая информация
            </h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-shealth-800 mb-2">О компании</h3>
                    <p className="text-gray-600">ООО «SHealth» является официально зарегистрированной организацией на территории Российской Федерации.</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">ИНН:</p>
                        <p className="font-medium">7724451789</p>
                      </div>
                      <div>
                        <p className="text-gray-500">ОГРН:</p>
                        <p className="font-medium">1197746702358</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Юридический адрес:</p>
                        <p className="font-medium">119021, г. Москва, ул. Тимура Фрунзе, д. 11, стр. 2</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Дата регистрации:</p>
                        <p className="font-medium">15.05.2019</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium text-shealth-800 mb-2">Защита персональных данных</h3>
                    <p className="text-gray-600 mb-3">
                      SHealth обрабатывает персональные данные в соответствии с Федеральным законом "О персональных данных" от 27.07.2006 N 152-ФЗ и Политикой конфиденциальности компании.
                    </p>
                    <p className="text-gray-600 mb-3">
                      Мы применяем современные методы защиты информации, включая шифрование при передаче данных, многофакторную аутентификацию и строгий контроль доступа.
                    </p>
                    <div className="flex items-center mt-4">
                      <Shield className="h-5 w-5 text-shealth-600 mr-2" />
                      <p className="text-sm text-gray-600">
                        Сертификат соответствия требованиям безопасности персональных данных
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium text-shealth-800 mb-2">Медицинская деятельность</h3>
                    <p className="text-gray-600 mb-3">
                      Компания имеет лицензию на осуществление медицинской деятельности №ЛО-77-01-020371 от 10.09.2020, выданную Департаментом здравоохранения города Москвы.
                    </p>
                    <p className="text-gray-600">
                      Все медицинские консультации проводятся квалифицированными специалистами с действующими сертификатами и аккредитацией.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Если вы не нашли нужный документ или у вас остались вопросы, свяжитесь с нами:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-shealth-600 hover:bg-shealth-700">
                  <a href="mailto:legal@shealth.ru">
                    Написать в юридический отдел
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-shealth-600 text-shealth-600 hover:bg-shealth-50">
                  <a href="tel:+74951234567">
                    +7 (495) 123-45-67
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-shealth-800 mb-6 text-center">
              Часто задаваемые вопросы о документации
            </h2>
            
            <div className="space-y-6">
              {docFaqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

interface DocumentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  link: string;
}

const DocumentCard = ({ title, description, icon, date, link }: DocumentCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="bg-shealth-50 py-4 flex flex-row items-center">
        <div className="mr-4 rounded-full bg-shealth-100 p-2">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <CardDescription className="text-gray-600 min-h-[60px]">{description}</CardDescription>
        <div className="text-sm text-gray-500 mt-4 mb-2">
          Обновлено: {date}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between items-center">
        <span className="text-sm text-gray-500">PDF, 2.3 MB</span>
        <Button asChild variant="ghost" size="sm" className="text-shealth-600 hover:text-shealth-700 hover:bg-shealth-50">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <Download className="h-4 w-4 mr-1" />
            Скачать
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Данные о документах
const licenses = [
  {
    title: "Лицензия на медицинскую деятельность",
    description: "Лицензия на осуществление медицинской деятельности №ЛО-77-01-020371",
    icon: <Award className="h-5 w-5 text-shealth-600" />,
    date: "10.09.2020",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Лицензия на работу с персональными данными",
    description: "Разрешение на обработку персональных данных пользователей №77-19/264",
    icon: <Shield className="h-5 w-5 text-shealth-600" />,
    date: "15.03.2021",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Лицензия на программное обеспечение",
    description: "Свидетельство о государственной регистрации программы для ЭВМ №2021619647",
    icon: <FileText className="h-5 w-5 text-shealth-600" />,
    date: "25.05.2021",
    link: "https://sberhealth.ru/about/legal-info"
  }
];

const certificates = [
  {
    title: "Сертификат соответствия ГОСТ Р",
    description: "Сертификат соответствия требованиям ГОСТ Р ИСО 9001-2015 системы менеджмента качества",
    icon: <CheckCircle className="h-5 w-5 text-shealth-600" />,
    date: "17.07.2021",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Сертификат защиты информации",
    description: "Сертификат соответствия требованиям по защите информации ФСТЭК России",
    icon: <Shield className="h-5 w-5 text-shealth-600" />,
    date: "03.04.2022",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Сертификат качества медицинских услуг",
    description: "Сертификат соответствия медицинских услуг стандартам качества Минздрава РФ",
    icon: <Award className="h-5 w-5 text-shealth-600" />,
    date: "22.11.2021",
    link: "https://sberhealth.ru/about/legal-info"
  }
];

const agreements = [
  {
    title: "Пользовательское соглашение",
    description: "Соглашение об условиях использования платформы SHealth и предоставляемых услуг",
    icon: <FileText className="h-5 w-5 text-shealth-600" />,
    date: "01.02.2023",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Политика конфиденциальности",
    description: "Политика в отношении обработки и защиты персональных данных пользователей",
    icon: <Shield className="h-5 w-5 text-shealth-600" />,
    date: "01.02.2023",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Договор оказания медицинских услуг",
    description: "Публичная оферта на оказание дистанционных медицинских консультаций",
    icon: <FileText className="h-5 w-5 text-shealth-600" />,
    date: "01.02.2023",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Согласие на обработку медицинских данных",
    description: "Форма согласия на обработку данных о здоровье и медицинской информации",
    icon: <FileText className="h-5 w-5 text-shealth-600" />,
    date: "01.02.2023",
    link: "https://sberhealth.ru/about/legal-info"
  }
];

const userDocs = [
  {
    title: "Руководство пользователя SHealth",
    description: "Подробное руководство по использованию всех функций платформы SHealth",
    icon: <BookOpen className="h-5 w-5 text-shealth-600" />,
    date: "15.03.2023",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Инструкция по мониторингу здоровья",
    description: "Как правильно отслеживать показатели здоровья ребенка с помощью платформы",
    icon: <FileText className="h-5 w-5 text-shealth-600" />,
    date: "10.04.2023",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Руководство по телемедицинским консультациям",
    description: "Как подготовиться и провести онлайн-консультацию с врачом через SHealth",
    icon: <FileText className="h-5 w-5 text-shealth-600" />,
    date: "05.05.2023",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Справочник по нормам развития ребенка",
    description: "Медицинские нормы роста, веса и развития детей разных возрастов",
    icon: <BookOpen className="h-5 w-5 text-shealth-600" />,
    date: "22.06.2023",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Памятка по экстренным ситуациям",
    description: "Как действовать в экстренных ситуациях и когда немедленно обращаться к врачу",
    icon: <FileText className="h-5 w-5 text-shealth-600" />,
    date: "30.07.2023",
    link: "https://sberhealth.ru/about/legal-info"
  },
  {
    title: "Руководство по ИИ-ассистенту",
    description: "Как использовать искусственный интеллект для мониторинга здоровья ребенка",
    icon: <BookOpen className="h-5 w-5 text-shealth-600" />,
    date: "12.08.2023",
    link: "https://sberhealth.ru/about/legal-info"
  }
];

const docFaqs = [
  {
    question: "Как проверить подлинность лицензии SHealth?",
    answer: "Подлинность лицензии на медицинскую деятельность можно проверить на официальном сайте Росздравнадзора в разделе «Единый реестр лицензий», введя номер лицензии ЛО-77-01-020371 или наименование организации ООО «SHealth»."
  },
  {
    question: "Нужно ли распечатывать согласие на обработку данных?",
    answer: "Нет, согласие на обработку персональных данных и медицинской информации предоставляется в электронной форме через интерфейс приложения. Для этого необходимо поставить соответствующие отметки при регистрации или в разделе настроек конфиденциальности."
  },
  {
    question: "Как получить официальное заключение врача через платформу?",
    answer: "После проведения телемедицинской консультации врач может оформить медицинское заключение, которое будет доступно в разделе «Документы» в вашем личном кабинете. Заключение подписывается электронной подписью врача и имеет юридическую силу."
  },
  {
    question: "Могу ли я отозвать свое согласие на обработку данных?",
    answer: "Да, вы можете отозвать согласие на обработку персональных данных в любое время, направив письменное заявление на электронную почту privacy@shealth.ru или через раздел «Настройки» → «Конфиденциальность» в вашем личном кабинете."
  }
];

export default Documentation;
