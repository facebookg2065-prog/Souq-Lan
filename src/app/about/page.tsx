import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">
            حول سوق لان
          </CardTitle>
          <p className="text-muted-foreground text-lg pt-2">
            منصتك الأولى للإعلانات المبوبة في المنطقة
          </p>
        </CardHeader>
        <CardContent className="space-y-8 text-lg leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline flex items-center gap-2">
              <Target className="text-primary w-6 h-6" />
              <span>ما هو هدفنا؟</span>
            </h2>
            <p>
              في "سوق لان"، نهدف إلى إنشاء منصة إعلانات مبوبة سهلة، سريعة، وموثوقة تجمع بين البائعين والمشترين في بيئة آمنة. نسعى لتمكين الأفراد والشركات من عرض منتجاتهم وخدماتهم والوصول إلى أوسع شريحة ممكنة من العملاء.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline flex items-center gap-2">
              <Zap className="text-primary w-6 h-6" />
              <span>ماذا نقدم؟</span>
            </h2>
            <p>
              نقدم مجموعة متكاملة من الخدمات التي تجعل تجربة البيع والشراء عبر الإنترنت أكثر كفاءة:
            </p>
            <ul className="list-disc list-inside space-y-2 pr-4">
              <li>نظام إعلانات متقدم يدعم الصور والفئات المتعددة.</li>
              <li>لوحة تحكم احترافية للبائعين لإدارة إعلاناتهم وأدائهم.</li>
              <li>نظام توصيات ذكي يعتمد على الذكاء الاصطناعي.</li>
              <li>أدوات تواصل مباشرة وآمنة بين المستخدمين.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline flex items-center gap-2">
              <Users className="text-primary w-6 h-6" />
              <span>من نستهدف؟</span>
            </h2>
            <p>
              منصتنا مصممة لخدمة الجميع، من الأفراد الذين يرغبون في بيع أغراضهم الشخصية، إلى أصحاب المتاجر الصغيرة والمتوسطة الذين يسعون لتوسيع نطاق أعمالهم والوصول إلى عملاء جدد عبر الإنترنت.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
