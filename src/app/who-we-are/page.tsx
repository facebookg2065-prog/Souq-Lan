import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Eye, Handshake } from 'lucide-react';

export default function WhoWeArePage() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">
            من نحن
          </CardTitle>
          <p className="text-muted-foreground text-lg pt-2">
            الفريق وراء سوق لان
          </p>
        </CardHeader>
        <CardContent className="space-y-8 text-lg leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">قصتنا</h2>
            <p>
              تأسست "سوق لان" من رحم الحاجة إلى وجود سوق إلكتروني عربي يجمع بين الحداثة وسهولة الاستخدام. لاحظنا فجوة في السوق المحلي لمنصة توفر تجربة مستخدم سلسة وأدوات قوية للبائعين. من هنا، انطلقنا في رحلة لبناء "سوق لان" ليكون الوجهة المفضلة للإعلانات المبوبة.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline flex items-center gap-2">
                <Rocket className="text-primary w-6 h-6" />
                <span>رؤيتنا ورسالتنا</span>
            </h2>
            <p>
              <strong>رؤيتنا:</strong> أن نكون المنصة الرائدة للإعلانات المبوبة في الشرق الأوسط، وأن نساهم في تمكين الاقتصاد الرقمي المحلي.
            </p>
            <p>
              <strong>رسالتنا:</strong> توفير بيئة تجارية إلكترونية موثوقة ومبتكرة، تربط البائعين بالمشترين بكفاءة وسهولة.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">قيمنا الأساسية</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary">
                <Handshake className="text-primary w-10 h-10" />
                <h3 className="text-xl font-semibold">الثقة</h3>
                <p className="text-muted-foreground">نبني علاقاتنا على أساس الثقة المتبادلة مع مستخدمينا.</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary">
                 <Eye className="text-primary w-10 h-10" />
                <h3 className="text-xl font-semibold">الشفافية</h3>
                <p className="text-muted-foreground">نلتزم بالوضوح والشفافية في جميع تعاملاتنا.</p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary">
                <Zap className="text-primary w-10 h-10" />
                <h3 className="text-xl font-semibold">السهولة</h3>
                <p className="text-muted-foreground">نسعى لجعل تجربة البيع والشراء بسيطة وممتعة للجميع.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
