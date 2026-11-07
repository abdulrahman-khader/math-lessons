import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: أكياس التمر (مثال غير مثال الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="الْخُطُوَاتُ الأَرْبَعُ" q="٧ أكياس، في كل كيس ٦ تمرات" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>افهم: ٧ أكياس، و٦ في كل كيس</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 13, 99)} color="var(--ink)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>خطط: نجمع ٦ سبع مرات</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 20, 99)} color="var(--ink)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>حل: ٧ × ٦ = ٤٢</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 27, 99)} color="var(--good)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>تحقق: ٦ + ٦ + ٦ + ٦ + ٦ + ٦ + ٦ = ٤٢</text>
        </ClipCard>
      </g>
    </>
  );
}

export const IntroClip = () => (
  <Clip
    voice={voice}
    duration={36}
    scene={scene}
    captions={[
      [0, 'فكرة الدرس'],
      [6, '**افهم**: ما المعطيات والمطلوب؟'],
      [13, '**خطط**: نجمع ٦ سبع مرات'],
      [20, '**حل**: ٧ × ٦ = ٤٢'],
      [27, '**تحقق**: بالجمع المتكرر'],
    ]}
  />
);
