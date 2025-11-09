import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Medal = {
  type: 'gold' | 'silver' | 'bronze';
  name: string;
  description: string;
};

type Student = {
  id: number;
  name: string;
  class: string;
  points: number;
  medals: Medal[];
  rank: number;
  subject?: string;
};

type Olympiad = {
  id: number;
  title: string;
  subject: string;
  date: string;
  participants: number;
  status: 'active' | 'upcoming' | 'completed';
};

const topStudents: Student[] = [
  { id: 1, name: 'Анна Смирнова', class: '9А', points: 2450, rank: 1, medals: [
    { type: 'gold', name: 'Математика 2024', description: '1 место' },
    { type: 'gold', name: 'Физика 2024', description: '1 место' },
    { type: 'silver', name: 'Информатика', description: '2 место' }
  ]},
  { id: 2, name: 'Дмитрий Петров', class: '10Б', points: 2380, rank: 2, medals: [
    { type: 'gold', name: 'Русский язык', description: '1 место' },
    { type: 'silver', name: 'Литература', description: '2 место' },
    { type: 'bronze', name: 'История', description: '3 место' }
  ]},
  { id: 3, name: 'Мария Иванова', class: '8В', points: 2250, rank: 3, medals: [
    { type: 'gold', name: 'Биология', description: '1 место' },
    { type: 'silver', name: 'Химия', description: '2 место' }
  ]},
  { id: 4, name: 'Алексей Козлов', class: '11А', points: 2180, rank: 4, medals: [
    { type: 'silver', name: 'Математика', description: '2 место' },
    { type: 'silver', name: 'Физика', description: '2 место' },
    { type: 'bronze', name: 'Программирование', description: '3 место' }
  ]},
  { id: 5, name: 'София Новикова', class: '9Б', points: 2100, rank: 5, medals: [
    { type: 'gold', name: 'Английский язык', description: '1 место' },
    { type: 'bronze', name: 'География', description: '3 место' }
  ]},
  { id: 6, name: 'Максим Волков', class: '10А', points: 2050, rank: 6, medals: [
    { type: 'silver', name: 'История', description: '2 место' },
    { type: 'bronze', name: 'Обществознание', description: '3 место' }
  ]},
  { id: 7, name: 'Екатерина Лебедева', class: '8А', points: 1980, rank: 7, medals: [
    { type: 'bronze', name: 'Математика', description: '3 место' },
    { type: 'bronze', name: 'Физика', description: '3 место' },
    { type: 'bronze', name: 'Информатика', description: '3 место' }
  ]},
  { id: 8, name: 'Артём Соколов', class: '11Б', points: 1920, rank: 8, medals: [
    { type: 'silver', name: 'Химия', description: '2 место' },
    { type: 'bronze', name: 'Биология', description: '3 место' }
  ]},
  { id: 9, name: 'Полина Морозова', class: '9В', points: 1850, rank: 9, medals: [
    { type: 'gold', name: 'Литература', description: '1 место' }
  ]},
  { id: 10, name: 'Илья Павлов', class: '10В', points: 1800, rank: 10, medals: [
    { type: 'bronze', name: 'Русский язык', description: '3 место' },
    { type: 'bronze', name: 'История', description: '3 место' }
  ]}
];

const olympiads: Olympiad[] = [
  { id: 1, title: 'Всероссийская олимпиада по математике', subject: 'Математика', date: '15 ноября 2025', participants: 1240, status: 'upcoming' },
  { id: 2, title: 'Физика для всех', subject: 'Физика', date: '20 ноября 2025', participants: 890, status: 'upcoming' },
  { id: 3, title: 'Русский язык: мастерство слова', subject: 'Русский язык', date: '25 ноября 2025', participants: 1560, status: 'upcoming' },
  { id: 4, title: 'Программирование и алгоритмы', subject: 'Информатика', date: '12 ноября 2025', participants: 450, status: 'active' }
];

const allStudents: Student[] = [
  ...topStudents,
  { id: 11, name: 'Владимир Кузнецов', class: '8Б', points: 1750, rank: 11, subject: 'Математика', medals: [{ type: 'bronze', name: 'Математика', description: '3 место' }]},
  { id: 12, name: 'Анастасия Белова', class: '9А', points: 1680, rank: 12, subject: 'Биология', medals: [{ type: 'silver', name: 'Биология', description: '2 место' }]},
  { id: 13, name: 'Николай Федоров', class: '11В', points: 1620, rank: 13, subject: 'История', medals: [{ type: 'bronze', name: 'История', description: '3 место' }]},
  { id: 14, name: 'Виктория Медведева', class: '10А', points: 1580, rank: 14, subject: 'Химия', medals: [{ type: 'silver', name: 'Химия', description: '2 место' }]},
  { id: 15, name: 'Кирилл Орлов', class: '9Б', points: 1520, rank: 15, subject: 'Физика', medals: [{ type: 'bronze', name: 'Физика', description: '3 место' }]}
];

const getMedalColor = (type: 'gold' | 'silver' | 'bronze') => {
  switch (type) {
    case 'gold': return 'text-gold';
    case 'silver': return 'text-silver';
    case 'bronze': return 'text-bronze';
  }
};

const getMedalIcon = (type: 'gold' | 'silver' | 'bronze') => {
  return 'Medal';
};

const Index = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  const filteredStudents = allStudents.filter(student => {
    const subjectMatch = selectedSubject === 'all' || student.medals.some(m => m.name.toLowerCase().includes(selectedSubject.toLowerCase()));
    const classMatch = selectedClass === 'all' || student.class === selectedClass;
    return subjectMatch && classMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="GraduationCap" className="text-primary" size={32} />
              <span className="text-2xl font-bold text-primary">EduOlympiad</span>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
              <a href="#olympiads" className="text-sm font-medium hover:text-primary transition-colors">Олимпиады</a>
              <a href="#rating" className="text-sm font-medium hover:text-primary transition-colors">Рейтинг</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Для учителей</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Для родителей</a>
            </div>
            <Button className="hidden md:inline-flex">Личный кабинет</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </nav>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Побеждай в олимпиадах,<br />собирай медали!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Развивай свои способности, участвуй в олимпиадах и получай награды за достижения
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="text-lg px-8">
                <Icon name="Trophy" className="mr-2" size={20} />
                Участвовать
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="ChartBar" className="mr-2" size={20} />
                Мой рейтинг
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white" id="top10">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Топ-10 учеников месяца</h2>
            <p className="text-muted-foreground">Лучшие участники по итогам ноября 2025</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {topStudents.slice(0, 3).map((student, index) => (
              <Card key={student.id} className={`animate-scale-in transition-all hover:shadow-xl hover:-translate-y-1 ${index === 0 ? 'md:col-span-2 lg:col-span-3' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`text-4xl font-bold ${index === 0 ? 'text-gold' : index === 1 ? 'text-silver' : 'text-bronze'}`}>
                        #{student.rank}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{student.name}</CardTitle>
                        <CardDescription>{student.class} класс</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-lg font-bold">
                      {student.points} баллов
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {student.medals.map((medal, idx) => (
                      <div key={idx} className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted">
                        <Icon name={getMedalIcon(medal.type)} className={getMedalColor(medal.type)} size={16} />
                        <span className="text-sm">{medal.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mt-6">
            {topStudents.slice(3, 10).map((student, index) => (
              <Card key={student.id} className="animate-scale-in hover:shadow-lg transition-all" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-muted-foreground">#{student.rank}</span>
                    <div>
                      <CardTitle className="text-base">{student.name}</CardTitle>
                      <CardDescription className="text-sm">{student.class}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">{student.points} баллов</span>
                  </div>
                  <div className="flex gap-1">
                    {student.medals.map((medal, idx) => (
                      <Icon key={idx} name={getMedalIcon(medal.type)} className={getMedalColor(medal.type)} size={18} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-primary/5" id="olympiads">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ближайшие олимпиады</h2>
            <p className="text-muted-foreground">Участвуй и получай медали за достижения</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {olympiads.map((olympiad, index) => (
              <Card key={olympiad.id} className="animate-fade-in hover:shadow-xl transition-all" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={olympiad.status === 'active' ? 'default' : 'secondary'}>
                      {olympiad.status === 'active' ? 'Идёт сейчас' : 'Скоро'}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Users" size={16} />
                      <span className="text-sm">{olympiad.participants}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{olympiad.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Icon name="BookOpen" size={16} />
                    {olympiad.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span className="text-sm">{olympiad.date}</span>
                    </div>
                    <Button size="sm" variant={olympiad.status === 'active' ? 'default' : 'outline'}>
                      {olympiad.status === 'active' ? 'Участвовать' : 'Записаться'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white" id="rating">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Рейтинг учеников</h2>
            <p className="text-muted-foreground">Отслеживай свой прогресс и соревнуйся с другими</p>
          </div>

          <Card>
            <CardHeader>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                  <TabsTrigger value="all" onClick={() => setSelectedSubject('all')}>Общий</TabsTrigger>
                  <TabsTrigger value="math" onClick={() => setSelectedSubject('математика')}>Математика</TabsTrigger>
                  <TabsTrigger value="physics" onClick={() => setSelectedSubject('физика')}>Физика</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex gap-2 mt-4 flex-wrap">
                <Button 
                  variant={selectedClass === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setSelectedClass('all')}
                >
                  Все классы
                </Button>
                {['8А', '9А', '10А', '11А'].map(cls => (
                  <Button 
                    key={cls}
                    variant={selectedClass === cls ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSelectedClass(cls)}
                  >
                    {cls}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.slice(0, 15).map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4 flex-1">
                      <span className={`text-2xl font-bold min-w-[3rem] ${student.rank <= 3 ? student.rank === 1 ? 'text-gold' : student.rank === 2 ? 'text-silver' : 'text-bronze' : 'text-muted-foreground'}`}>
                        #{student.rank}
                      </span>
                      <div className="flex-1">
                        <div className="font-semibold">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.class} класс</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex gap-1">
                        {student.medals.slice(0, 3).map((medal, idx) => (
                          <Icon key={idx} name={getMedalIcon(medal.type)} className={getMedalColor(medal.type)} size={20} />
                        ))}
                        {student.medals.length > 3 && (
                          <span className="text-sm text-muted-foreground">+{student.medals.length - 3}</span>
                        )}
                      </div>
                      <Badge className="text-base font-bold min-w-[5rem] justify-center">
                        {student.points}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Начни побеждать сегодня!</h2>
          <p className="text-xl mb-8 opacity-90">
            Регистрируйся, участвуй в олимпиадах и получай медали за свои достижения
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            <Icon name="Rocket" className="mr-2" size={20} />
            Создать аккаунт
          </Button>
        </div>
      </section>

      <footer className="py-8 px-4 bg-gray-900 text-gray-300">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="GraduationCap" className="text-primary" size={28} />
                <span className="text-xl font-bold text-white">EduOlympiad</span>
              </div>
              <p className="text-sm">Образовательная платформа с системой геймификации</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Ученикам</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Олимпиады</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Курсы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Рейтинг</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Педагогам</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Для учителей</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Для родителей</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Магазин наград</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li>info@eduolympiad.ru</li>
                <li>+7 (800) 123-45-67</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm">
            <p>© 2025 EduOlympiad. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
