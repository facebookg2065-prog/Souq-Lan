import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center font-headline">
            سياسة الخصوصية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg leading-relaxed">
          <p className="text-muted-foreground text-center">
            آخر تحديث: 15 ديسمبر 2025
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">مقدمة</h2>
            <p>
              في سوق لان (Souq Lan)، نحن ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمعنا لمعلوماتك الشخصية، واستخدامها، وحمايتها عند استخدامك لمنصتنا.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">1. البيانات التي نجمعها</h2>
            <p>
              نقوم بجمع أنواع مختلفة من المعلومات لتقديم وتحسين خدماتنا لك، بما في ذلك:
            </p>
            <ul className="list-disc list-inside space-y-2 pr-4">
              <li>
                <strong>معلومات شخصية:</strong> الاسم، عنوان البريد الإلكتروني، رقم الهاتف، وصورة الملف الشخصي عند التسجيل عبر Google أو Facebook.
              </li>
              <li>
                <strong>بيانات الإعلان:</strong> الصور، الأوصاف، الموقع، والسعر للمنتجات التي تعرضها.
              </li>
              <li>
                <strong>بيانات الاستخدام:</strong> معلومات حول كيفية تفاعلك مع منصتنا، مثل الإعلانات التي تشاهدها أو تحفظها.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">2. كيف نستخدم بياناتك</h2>
            <p>
              نستخدم المعلومات التي نجمعها للأغراض التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 pr-4">
              <li>لإنشاء وإدارة حسابك.</li>
              <li>لعرض إعلاناتك وتسهيل التواصل بين البائعين والمشترين.</li>
              <li>لتخصيص تجربتك وتقديم توصيات ذكية.</li>
              <li>لتحسين أمان وأداء منصتنا.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">3. حماية ومشاركة المعلومات</h2>
            <p>
              نحن نأخذ أمان بياناتك على محمل الجد. نستخدم إجراءات أمنية متقدمة لحماية معلوماتك من الوصول غير المصرح به. لا نشارك بياناتك الشخصية مع أطراف ثالثة إلا للامتثال للقانون أو لتقديم خدماتنا (مثل معالجات الدفع).
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">4. ملفات تعريف الارتباط (Cookies)</h2>
            <p>
             نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم، وتذكر تفضيلاتك، وتوفير جلسات تسجيل دخول آمنة. يمكنك التحكم في استخدام ملفات تعريف الارتباط من خلال إعدادات متصفحك.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">5. حقوق المستخدم</h2>
            <p>
              لديك الحق في الوصول إلى معلوماتك الشخصية، وتصحيحها، أو طلب حذفها. يمكنك إدارة معلومات حسابك مباشرة من لوحة التحكم الخاصة بك.
            </p>
          </div>

           <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">6. تحديثات السياسة</h2>
            <p>
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإعلامك بأي تغييرات جوهرية عن طريق نشر السياسة الجديدة على هذه الصفحة.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
