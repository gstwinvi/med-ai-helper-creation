import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Book, Award, FileCheck, Shield, ScrollText } from "lucide-react";

const Documentation = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-shealth-600 to-shealth-800 text-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Документация SHealth</h1>
          
          <p className="text-shealth-50 mb-8">
            Здесь вы найдете всю необходимую документацию по использованию платформы SHealth, 
            включая лицензионные соглашения, инструкции и регламенты.
          </p>
          
          <Tabs defaultValue="licenses" className="w-full">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-8 bg-white/10 p-1">
              <TabsTrigger value="licenses" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-shealth-700">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Лицензии</span>
              </TabsTrigger>
              <TabsTrigger value="agreements" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-shealth-700">
                <FileCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Соглашения</span>
              </TabsTrigger>
              <TabsTrigger value="policy" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-shealth-700">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Политики</span>
              </TabsTrigger>
              <TabsTrigger value="manuals" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-shealth-700">
                <Book className="h-4 w-4" />
                <span className="hidden sm:inline">Инструкции</span>
              </TabsTrigger>
              <TabsTrigger value="regulations" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-shealth-700">
                <ScrollText className="h-4 w-4" />
                <span className="hidden sm:inline">Регламенты</span>
              </TabsTrigger>
              <TabsTrigger value="forms" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-shealth-700">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Формы</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Лицензии */}
            <TabsContent value="licenses">
              <div className="grid gap-6 md:grid-cols-2">
                <DocumentCard 
                  title="Лицензия на медицинскую деятельность"
                  description="Лицензия Министерства здравоохранения РФ №ЛО-77-01-123456 от 01.01.2023"
                  date="Действует до: 01.01.2028"
                  downloadUrl="/documents/license-medical.pdf"
                  icon={<Award className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Лицензия на программное обеспечение"
                  description="Лицензия на использование программного обеспечения SHealth"
                  date="Бессрочная"
                  downloadUrl="/documents/license-software.pdf"
                  icon={<FileCheck className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Сертификат соответствия ФСТЭК"
                  description="Сертификат соответствия требованиям по безопасности информации"
                  date="Действует до: 15.09.2025"
                  downloadUrl="/documents/certificate-fstek.pdf"
                  icon={<Shield className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Свидетельство о регистрации медизделия"
                  description="Регистрационное удостоверение на медицинское изделие №РЗН 2023/12345"
                  date="Выдано: 10.03.2023"
                  downloadUrl="/documents/certificate-registration.pdf"
                  icon={<Award className="h-8 w-8 text-shealth-300" />}
                />
              </div>
            </TabsContent>
            
            {/* Соглашения */}
            <TabsContent value="agreements">
              <div className="grid gap-6 md:grid-cols-2">
                <DocumentCard 
                  title="Пользовательское соглашение"
                  description="Соглашение об использовании сервиса SHealth для пользователей"
                  date="Редакция от: 15.01.2025"
                  downloadUrl="/documents/user-agreement.pdf"
                  icon={<FileText className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Партнерское соглашение"
                  description="Соглашение о сотрудничестве с медицинскими организациями"
                  date="Типовая форма"
                  downloadUrl="/documents/partner-agreement.pdf"
                  icon={<FileText className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Соглашение о конфиденциальности"
                  description="Соглашение о неразглашении конфиденциальной информации"
                  date="Редакция от: 20.02.2025"
                  downloadUrl="/documents/confidentiality-agreement.pdf"
                  icon={<Shield className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Договор оферты"
                  description="Публичный договор-оферта на оказание медицинских услуг"
                  date="Действует с: 01.03.2025"
                  downloadUrl="/documents/offer-agreement.pdf"
                  icon={<FileText className="h-8 w-8 text-shealth-300" />}
                />
              </div>
            </TabsContent>
            
            {/* Политики */}
            <TabsContent value="policy">
              <div className="grid gap-6 md:grid-cols-2">
                <DocumentCard 
                  title="Политика конфиденциальности"
                  description="Политика в отношении обработки персональных данных"
                  date="Редакция от: 05.02.2025"
                  downloadUrl="/documents/privacy-policy.pdf"
                  icon={<Shield className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Политика использования файлов cookie"
                  description="Правила использования файлов cookie на сайте SHealth"
                  date="Редакция от: 10.01.2025"
                  downloadUrl="/documents/cookie-policy.pdf"
                  icon={<Shield className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Политика информационной безопасности"
                  description="Основные принципы обеспечения информационной безопасности"
                  date="Редакция от: 18.03.2025"
                  downloadUrl="/documents/security-policy.pdf"
                  icon={<Shield className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Политика возврата средств"
                  description="Правила и условия возврата денежных средств"
                  date="Действует с: 01.04.2025"
                  downloadUrl="/documents/refund-policy.pdf"
                  icon={<FileText className="h-8 w-8 text-shealth-300" />}
                />
              </div>
            </TabsContent>
            
            {/* Инструкции */}
            <TabsContent value="manuals">
              <div className="grid gap-6 md:grid-cols-2">
                <DocumentCard 
                  title="Руководство пользователя"
                  description="Подробная инструкция по использованию сервиса SHealth"
                  date="Обновлено: 25.03.2025"
                  downloadUrl="/documents/user-manual.pdf"
                  icon={<Book className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Инструкция по установке приложения"
                  description="Руководство по установке и настройке мобильного приложения"
                  date="Версия: 2.5.0"
                  downloadUrl="/documents/app-installation.pdf"
                  icon={<Book className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Руководство по интеграции API"
                  description="Техническая документация по интеграции с API SHealth"
                  date="Версия API: 3.1"
                  downloadUrl="/documents/api-integration.pdf"
                  icon={<Book className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Инструкция для врачей"
                  description="Руководство по использованию профессионального портала"
                  date="Обновлено: 10.04.2025"
                  downloadUrl="/documents/doctors-manual.pdf"
                  icon={<Book className="h-8 w-8 text-shealth-300" />}
                />
              </div>
            </TabsContent>
            
            {/* Регламенты */}
            <TabsContent value="regulations">
              <div className="grid gap-6 md:grid-cols-2">
                <DocumentCard 
                  title="Регламент оказания услуг"
                  description="Порядок и сроки оказания медицинских услуг через SHealth"
                  date="Редакция от: 01.02.2025"
                  downloadUrl="/documents/services-regulations.pdf"
                  icon={<ScrollText className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Регламент работы с обращениями"
                  description="Порядок обработки обращений пользователей"
                  date="Действует с: 15.01.2025"
                  downloadUrl="/documents/feedback-regulations.pdf"
                  icon={<ScrollText className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Регламент проведения телемедицины"
                  description="Правила проведения телемедицинских консультаций"
                  date="Утвержден: 20.03.2025"
                  downloadUrl="/documents/telemedicine-regulations.pdf"
                  icon={<ScrollText className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Регламент технической поддержки"
                  description="Порядок и сроки оказания технической поддержки"
                  date="Версия: 2.1"
                  downloadUrl="/documents/support-regulations.pdf"
                  icon={<ScrollText className="h-8 w-8 text-shealth-300" />}
                />
              </div>
            </TabsContent>
            
            {/* Формы */}
            <TabsContent value="forms">
              <div className="grid gap-6 md:grid-cols-2">
                <DocumentCard 
                  title="Заявление на возврат средств"
                  description="Форма заявления для возврата денежных средств"
                  date="Форма №SH-001"
                  downloadUrl="/documents/refund-form.pdf"
                  icon={<FileText className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Согласие на обработку ПД"
                  description="Форма согласия на обработку персональных данных"
                  date="Форма №SH-002"
                  downloadUrl="/documents/personal-data-consent.pdf"
                  icon={<FileText className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Анкета пользователя"
                  description="Анкета для сбора медицинского анамнеза"
                  date="Форма №SH-003"
                  downloadUrl="/documents/user-questionnaire.pdf"
                  icon={<FileText className="h-8 w-8 text-shealth-300" />}
                />
                <DocumentCard 
                  title="Форма обратной связи"
                  description="Форма для отправки отзывов и предложений"
                  date="Форма №SH-004"
                  downloadUrl="/documents/feedback-form.pdf"
                  icon={<FileText className="h-8 w-8 text-shealth-300" />}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface DocumentCardProps {
  title: string;
  description: string;
  date: string;
  downloadUrl: string;
  icon: React.ReactNode;
}

const DocumentCard = ({ title, description, date, downloadUrl, icon }: DocumentCardProps) => {
  return (
    <Card className="shealth-card shealth-card-hover bg-white/10 backdrop-blur-sm border-none">
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <div>
          <CardTitle className="text-lg font-medium text-white">{title}</CardTitle>
          <CardDescription className="text-xs text-shealth-100">{date}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-shealth-50">{description}</p>
        <a 
          href={downloadUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 text-shealth-200 hover:text-white text-sm font-medium flex items-center transition-colors"
        >
          Открыть документ
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </CardContent>
    </Card>
  );
};

export default Documentation;
