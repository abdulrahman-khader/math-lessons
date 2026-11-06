import { Clip, ClipCard, ClipTitle, fade } from '@engine';
import voice from './voice';

/* مقطع فكرة الدرس: ٢٦ ريالًا بخمس عملات (مثال غير مثال الكتاب) */


function scene(t: number) {
  return (
    <>
      <ClipTitle t={t} title="خُطَّةُ التَّمْثِيلِ" q="٢٦ ريالًا بخمس عملات" />
      <g opacity={fade(t, 4.5, 99)}>
        <ClipCard x={230} y={30} w={940} h={100} op={fade(t, 6, 99)} color="var(--ink)">
          <text x={700} y={96} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠ + ١٠ + ٥ + ١ : ٤ عملات فقط</text>
        </ClipCard>
        <ClipCard x={230} y={148} w={940} h={100} op={fade(t, 15, 99)} color="var(--bad)">
          <text x={700} y={214} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>نبدّل ورقة ١٠ بورقتين من فئة ٥</text>
        </ClipCard>
        <ClipCard x={230} y={266} w={940} h={100} op={fade(t, 23, 99)} color="var(--good)">
          <text x={700} y={332} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>١٠ + ٥ + ٥ + ٥ + ١ : ٥ عملات</text>
        </ClipCard>
        <ClipCard x={230} y={384} w={940} h={100} op={fade(t, 30, 99)} color="var(--rule)">
          <text x={700} y={450} fontSize={40} textAnchor="middle" direction="rtl" style={{ fontWeight: 800 }}>المجموع ٢٦ ✓</text>
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
      [6, 'نمثّل المبلغ: **٤** عملات فقط'],
      [15, 'نبدّل ورقة ١٠ بورقتين من فئة **٥**'],
      [23, 'صارت **٥** عملات'],
      [30, 'نتحقق: المجموع **٢٦** ريالًا'],
    ]}
  />
);
