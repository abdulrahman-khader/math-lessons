import type { ReactNode } from 'react';
import { Clip, fade, tw, type ClipTalk, type VoiceLine } from './Clip';

/*
 * شخصيات المقطع الكرتوني الذي يفتح الدرس (أولاد فقط: سالم وخالد) وخلفية الفصل.
 * تُرسم داخل مشهد Clip بإحداثياته (١٤٠٠ × ٥٢٠). الفم يتحرك ما دام صوت الشخصية يُقرأ، والعينان ترمشان.
 */

const SKIN = '#EDBB92';
const SKIN_D = '#D99C70';
const INK = '#2f2a28';
const LINE = '#b98a68';

export type Mood = 'happy' | 'sad' | 'idea' | 'think';

interface KidProps {
  x: number;
  y: number;
  /** ولد (ثوب وطاقية) أو بنت (مريول وضفيرتان) */
  boy?: boolean;
  /** ولد ثانٍ بشكل مختلف: شعر بلا طاقية وثوب أزرق فاتح */
  alt?: boolean;
  mood?: Mood;
  /** يتكلم الآن: الفم يُفتح ويُغلق واليد تتحرك */
  talk?: boolean;
  /** ساعة تتقدم (talk.now من Clip) لحركة الفم والرمش والتمايل */
  now?: number;
  name?: string;
  s?: number;
  op?: number;
  /** ينظر إلى جهة: ١ يمين، −١ يسار */
  look?: 1 | -1;
}

/** ذراع: كمّ سميك بحدّ، ويد في آخره */
function Arm({ from, to, sleeve, edge }: { from: [number, number]; to: [number, number]; sleeve: string; edge: string }) {
  const d = `M${from[0]} ${from[1]} L${to[0]} ${to[1]}`;
  return (
    <g>
      <path d={d} stroke={edge} strokeWidth={30} strokeLinecap="round" />
      <path d={d} stroke={sleeve} strokeWidth={24} strokeLinecap="round" />
      <circle cx={to[0]} cy={to[1]} r={13} fill={SKIN} stroke={LINE} strokeWidth={2.5} />
    </g>
  );
}

/** طالب كرتوني، مركز الرأس (x, y)، والقدمان عند y + ٢٣٥ تقريبًا */
export function Kid({ x, y, boy, alt, mood = 'happy', talk, now = 0, name, s = 1, op = 1, look = 1 }: KidProps) {
  if (op <= 0.01) return null;
  const seed = boy && !alt ? 0 : 1.7;
  const bob = Math.sin(now * 3.2 + seed) * 2.5;
  const blink = (now + seed) % 4.1 < 0.13;
  const open = talk ? 5 + Math.abs(Math.sin(now * 13)) * 9 : 0;
  const thobe = alt ? '#E3EEF9' : '#fff';
  const sleeve = boy ? thobe : '#ffffff';
  const edge = alt ? '#9fb8d6' : boy ? '#c9ced6' : '#cfc9e8';
  // اليد: تتحرك مع الكلام، وترتفع مع الفكرة، وتلمس الذقن مع التفكير
  const wave = talk ? Math.sin(now * 5) * 10 : 0;
  const armR: [number, number] = mood === 'idea' ? [-78, -40] : mood === 'think' ? [-22, 36] : talk ? [-74, 110 + wave] : [-60, 150];
  const armL: [number, number] = [60, 150];
  const brow = mood === 'sad' ? 1 : mood === 'think' ? 0.5 : 0;
  const ex = look * 3;
  return (
    <g opacity={op} transform={`translate(${x} ${y + bob}) scale(${s})`}>
      {/* الظل والحذاء */}
      <ellipse cx={0} cy={240} rx={74} ry={12} fill="#000" opacity={0.12} />
      <ellipse cx={-22} cy={232} rx={21} ry={9} fill="#5a4632" />
      <ellipse cx={22} cy={232} rx={21} ry={9} fill="#5a4632" />
      {/* شعر البنت الطويل خلف الرأس */}
      {!boy && (
        <g fill="#4a2e1f">
          <path d="M-54 -20 Q-66 60 -40 96 L40 96 Q66 60 54 -20Z" />
          <circle cx={-62} cy={40} r={20} />
          <circle cx={62} cy={40} r={20} />
          <circle cx={-66} cy={72} r={16} />
          <circle cx={66} cy={72} r={16} />
          <circle cx={-58} cy={22} r={10} fill="#E0457B" />
          <circle cx={58} cy={22} r={10} fill="#E0457B" />
        </g>
      )}
      {/* الجسم */}
      {boy ? (
        <g>
          <path d="M-46 52 Q-60 140 -62 228 L62 228 Q60 140 46 52 Q24 42 0 44 Q-24 42 -46 52Z" fill={thobe} stroke={edge} strokeWidth={3} />
          <path d="M22 60 Q40 140 44 226 L62 228 Q60 140 46 52Z" fill={alt ? '#d3e2f2' : '#eef1f5'} />
          <path d="M0 58 L0 128" stroke={edge} strokeWidth={2.5} />
          {[74, 92, 110].map((cy) => (
            <circle key={cy} cx={0} cy={cy} r={2.6} fill={edge} />
          ))}
          <path d="M-16 48 Q0 62 16 48" fill="none" stroke={edge} strokeWidth={3} />
        </g>
      ) : (
        <g>
          <path d="M-42 52 Q-66 150 -70 226 L70 226 Q66 150 42 52 Q22 44 0 46 Q-22 44 -42 52Z" fill="#8B7FD8" stroke="#6C5FC2" strokeWidth={3} />
          <path d="M-30 52 L-24 96 L24 96 L30 52 Q0 44 -30 52Z" fill="#fff" stroke="#cfc9e8" strokeWidth={2.5} />
          <path d="M-18 50 L0 66 L18 50" fill="none" stroke="#cfc9e8" strokeWidth={2.5} />
          <path d="M-60 186 L60 186" stroke="#6C5FC2" strokeWidth={3} opacity={0.5} />
        </g>
      )}
      <Arm from={[-40, 64]} to={armR} sleeve={sleeve} edge={edge} />
      <Arm from={[40, 64]} to={armL} sleeve={sleeve} edge={edge} />
      {/* الرقبة والرأس */}
      <rect x={-12} y={34} width={24} height={20} fill={SKIN_D} />
      <ellipse cx={-50} cy={-2} rx={9} ry={13} fill={SKIN} stroke={LINE} strokeWidth={2} />
      <ellipse cx={50} cy={-2} rx={9} ry={13} fill={SKIN} stroke={LINE} strokeWidth={2} />
      <ellipse cx={0} cy={-6} rx={50} ry={54} fill={SKIN} stroke={LINE} strokeWidth={2.5} />
      {boy && alt ? (
        <path d="M-50 -10 Q-56 -60 -6 -62 Q46 -64 52 -14 Q46 -30 30 -36 Q22 -26 8 -34 Q-6 -24 -20 -34 Q-38 -30 -50 -10Z" fill="#2b211c" />
      ) : boy ? (
        <g>
          <path d="M-48 -14 Q-50 -6 -46 6 L-42 -10Z M48 -14 Q50 -6 46 6 L42 -10Z" fill="#2b211c" />
          <path d="M-51 -18 Q-50 -66 0 -68 Q50 -66 51 -18 Q0 -32 -51 -18Z" fill="#fff" stroke="#c9ced6" strokeWidth={3} />
          {[-30, -15, 0, 15, 30].map((cx) => (
            <circle key={cx} cx={cx} cy={-44 - (cx === 0 ? 4 : Math.abs(cx) < 20 ? 2 : -3)} r={2.2} fill="#d7dbe2" />
          ))}
        </g>
      ) : (
        <path d="M-52 -4 Q-56 -62 0 -64 Q56 -62 52 -4 Q40 -34 14 -36 Q4 -22 -10 -34 Q-40 -34 -52 -4Z" fill="#4a2e1f" />
      )}
      {/* الحاجبان */}
      <path d={`M${-30 + ex} ${-26 + brow * 4} Q${-19 + ex} ${-32 + brow * 6} ${-8 + ex} ${-27 - brow * 4}`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={`M${8 + ex} ${-27 - brow * 4} Q${19 + ex} ${-32 + brow * 6} ${30 + ex} ${-26 + brow * 4}`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* العينان */}
      {blink ? (
        <g stroke={INK} strokeWidth={4} strokeLinecap="round">
          <path d={`M${-27 + ex} -10 L${-11 + ex} -10`} />
          <path d={`M${11 + ex} -10 L${27 + ex} -10`} />
        </g>
      ) : (
        <g>
          <ellipse cx={-19 + ex} cy={-10} rx={10} ry={12} fill="#fff" />
          <ellipse cx={19 + ex} cy={-10} rx={10} ry={12} fill="#fff" />
          <circle cx={-18 + ex * 1.6} cy={-8} r={6.5} fill={INK} />
          <circle cx={20 + ex * 1.6} cy={-8} r={6.5} fill={INK} />
          <circle cx={-16 + ex * 1.6} cy={-11} r={2.2} fill="#fff" />
          <circle cx={22 + ex * 1.6} cy={-11} r={2.2} fill="#fff" />
        </g>
      )}
      <ellipse cx={-31} cy={12} rx={9} ry={6} fill="#F08A8A" opacity={0.45} />
      <ellipse cx={31} cy={12} rx={9} ry={6} fill="#F08A8A" opacity={0.45} />
      <path d={`M${-3 + ex} 2 Q${2 + ex} 8 ${-3 + ex} 10`} stroke={LINE} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      {/* الفم */}
      {talk ? (
        <g>
          <ellipse cx={ex} cy={24} rx={12} ry={open} fill="#7a2e2e" stroke={INK} strokeWidth={2.5} />
          <ellipse cx={ex} cy={24 + open * 0.5} rx={7} ry={Math.max(1, open * 0.35)} fill="#e8787f" />
        </g>
      ) : mood === 'sad' ? (
        <path d={`M${-14 + ex} 30 Q${ex} 18 ${14 + ex} 30`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      ) : mood === 'idea' ? (
        <path d={`M${-16 + ex} 18 Q${ex} 40 ${16 + ex} 18 Z`} fill="#7a2e2e" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      ) : mood === 'think' ? (
        <path d={`M${-10 + ex} 26 Q${ex} 22 ${12 + ex} 24`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      ) : (
        <path d={`M${-16 + ex} 18 Q${ex} 34 ${16 + ex} 18`} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      )}
      {mood === 'sad' && !talk && <path d="M36 -2 q7 13 0 19 q-7 -6 0 -19Z" fill="#7FB2EA" stroke="#4d86c6" strokeWidth={1.5} />}
      {mood === 'idea' && (
        <g transform="translate(-78 -86)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d="M0 -34 L0 -44" stroke="#F2B705" strokeWidth={4} strokeLinecap="round" transform={`rotate(${a})`} />
          ))}
          <circle r={22} fill="#FFDD4A" stroke="#C99A00" strokeWidth={3} />
          <path d="M-6 6 Q0 -8 6 6" stroke="#C99A00" strokeWidth={2.5} fill="none" />
          <rect x={-9} y={20} width={18} height={12} rx={3} fill="#9aa3ad" stroke="#6f7883" strokeWidth={2} />
        </g>
      )}
      {mood === 'think' && (
        <text x={50} y={-62} fontSize={60} fontWeight={800} fill="#534AB7">
          ؟
        </text>
      )}
      {name && (
        <g>
          <rect x={-58} y={252} width={116} height={42} rx={21} fill="#fff" opacity={0.9} />
          <text y={282} fontSize={28} fontWeight={800} textAnchor="middle" direction="rtl" fill={INK}>
            {name}
          </text>
        </g>
      )}
    </g>
  );
}

/** فقاعة كلام فوق الشخصية؛ الذيل يشير إلى tailX */
export function Bubble({ x, y, w, h = 76, tailX, op = 1, children, size = 34, raw }: { x: number; y: number; w: number; h?: number; tailX: number; op?: number; children: ReactNode; size?: number; /** المحتوى عناصر SVG جاهزة لا نص (أعداد متفرقة مثلًا) */ raw?: boolean }) {
  if (op <= 0.01) return null;
  const tx = Math.max(x + 34, Math.min(x + w - 34, tailX));
  const pop = 0.92 + 0.08 * Math.min(1, op);
  return (
    <g opacity={op} transform={`translate(${tx} ${y + h}) scale(${pop}) translate(${-tx} ${-(y + h)})`}>
      <rect x={x + 4} y={y + 6} width={w} height={h} rx={h / 2} fill="#000" opacity={0.08} />
      <path d={`M${tx - 18} ${y + h - 4} L${tx + 6} ${y + h + 40} L${tx + 20} ${y + h - 4}Z`} fill="#fff" stroke="#5b5b66" strokeWidth={3} strokeLinejoin="round" />
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#fff" stroke="#5b5b66" strokeWidth={3} />
      <rect x={tx - 16} y={y + h - 8} width={34} height={10} fill="#fff" />
      {raw ? (
        children
      ) : (
        <text x={x + w / 2} y={y + h / 2 + size * 0.36} fontSize={size} fontWeight={800} textAnchor="middle" direction="rtl" fill={INK}>
          {children}
        </text>
      )}
    </g>
  );
}

/** خلفية المشهد: جدار الفصل ونافذة وسبورة وأرضية خشبية. board: نص يُكتب على السبورة (يظهر بشفافية boardOp) */
export function StoryBackdrop({ board, boardOp = 1 }: { board?: ReactNode; boardOp?: number }) {
  return (
    <>
      <rect width={1400} height={520} fill="#FBF1DF" />
      <rect y={0} width={1400} height={14} fill="#F1DEC0" />
      {/* النافذتان */}
      {[120, 1130].map((wx) => (
        <g key={wx}>
          <rect x={wx} y={40} width={150} height={120} rx={8} fill="#CFE8F7" stroke="#C9A97F" strokeWidth={8} />
          <path d={`M${wx + 75} 40 L${wx + 75} 160 M${wx} 100 L${wx + 150} 100`} stroke="#C9A97F" strokeWidth={6} />
          <ellipse cx={wx + 40} cy={78} rx={24} ry={10} fill="#fff" opacity={0.8} />
        </g>
      ))}
      {/* السبورة */}
      <rect x={455} y={26} width={490} height={180} rx={10} fill="#8B6A45" />
      <rect x={467} y={38} width={466} height={156} rx={6} fill="#2F5D4E" />
      <rect x={560} y={196} width={280} height={10} rx={4} fill="#A88A62" />
      <rect x={590} y={190} width={30} height={7} rx={3} fill="#fff" />
      {board && <g opacity={boardOp}>{board}</g>}
      {/* الأرضية */}
      <rect y={410} width={1400} height={110} fill="#E3C9A1" />
      <rect y={404} width={1400} height={10} fill="#C9A97F" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i} d={`M${i * 230 - 40} 520 L${i * 230 + 60} 414`} stroke="#D2B48A" strokeWidth={3} />
      ))}
    </>
  );
}

/** طاولة خشبية طويلة توضع عليها الأشياء؛ سطحها عند y */
export function Table({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g>
      <rect x={x1 + 30} y={y + 18} width={16} height={110} fill="#A9784B" />
      <rect x={x2 - 46} y={y + 18} width={16} height={110} fill="#A9784B" />
      <rect x={x1} y={y} width={x2 - x1} height={22} rx={6} fill="#C99263" stroke="#9C6B40" strokeWidth={3} />
      <rect x={x1 + 8} y={y + 4} width={x2 - x1 - 16} height={5} rx={2} fill="#DDAE80" />
    </g>
  );
}

/* ---------- أشياء المشهد وقالب القصة ---------- */

export type ItemKind = 'candy' | 'ball' | 'apple' | 'cube' | 'pencil' | 'book' | 'coin';

/** شيء صغير واحد (حبة حلوى، كرة، تفاحة…) مركزه (cx, cy)؛ lit: عُدّ للتو، dim: باهت */
export function Item({ kind, cx, cy, color, r = 7.5, lit, dim }: { kind: ItemKind; cx: number; cy: number; color: string; r?: number; lit?: boolean; dim?: boolean }) {
  const ring = lit ? '#fff' : 'none';
  const op = dim && !lit ? 0.35 : 1;
  if (kind === 'candy')
    return (
      <g opacity={op}>
        <path d={`M${cx - r} ${cy} l${-r * 0.8} ${-r * 0.65} l0 ${r * 1.3}Z M${cx + r} ${cy} l${r * 0.8} ${-r * 0.65} l0 ${r * 1.3}Z`} fill={color} opacity={0.75} />
        <circle cx={cx} cy={cy} r={r} fill={color} stroke={ring} strokeWidth={3} />
        <circle cx={cx - r * 0.33} cy={cy - r * 0.33} r={r * 0.3} fill="#fff" opacity={0.7} />
      </g>
    );
  if (kind === 'apple')
    return (
      <g opacity={op}>
        <path d={`M${cx} ${cy - r * 0.9} q${r * 0.2} ${-r * 0.5} ${r * 0.5} ${-r * 0.7}`} stroke="#6b4a2b" strokeWidth={2} fill="none" />
        <ellipse cx={cx + r * 0.5} cy={cy - r * 1.2} rx={r * 0.45} ry={r * 0.22} fill="#3e9b48" />
        <path d={`M${cx} ${cy - r * 0.7} C${cx - r * 1.4} ${cy - r * 1.4} ${cx - r * 1.3} ${cy + r * 1.2} ${cx} ${cy + r} C${cx + r * 1.3} ${cy + r * 1.2} ${cx + r * 1.4} ${cy - r * 1.4} ${cx} ${cy - r * 0.7}Z`} fill={color} stroke={ring === 'none' ? '#00000022' : ring} strokeWidth={lit ? 3 : 1} />
        <ellipse cx={cx - r * 0.4} cy={cy - r * 0.2} rx={r * 0.22} ry={r * 0.35} fill="#fff" opacity={0.55} />
      </g>
    );
  if (kind === 'cube')
    return (
      <g opacity={op}>
        <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} rx={2} fill={color} stroke={lit ? '#fff' : '#00000033'} strokeWidth={lit ? 3 : 1.5} />
        <rect x={cx - r + 2} y={cy - r + 2} width={r * 0.8} height={r * 0.5} fill="#fff" opacity={0.4} />
      </g>
    );
  if (kind === 'pencil')
    return (
      <g opacity={op} transform={`rotate(-90 ${cx} ${cy})`}>
        <rect x={cx - r * 2} y={cy - r * 0.45} width={r * 3.2} height={r * 0.9} fill={color} stroke={lit ? '#fff' : '#00000033'} strokeWidth={lit ? 2.5 : 1} />
        <path d={`M${cx + r * 1.2} ${cy - r * 0.45} L${cx + r * 2} ${cy} L${cx + r * 1.2} ${cy + r * 0.45}Z`} fill="#F3D7A6" />
        <path d={`M${cx + r * 1.75} ${cy - r * 0.13} L${cx + r * 2} ${cy} L${cx + r * 1.75} ${cy + r * 0.13}Z`} fill="#333" />
        <rect x={cx - r * 2.3} y={cy - r * 0.45} width={r * 0.4} height={r * 0.9} fill="#F08A8A" />
      </g>
    );
  if (kind === 'coin')
    return (
      <g opacity={op}>
        <circle cx={cx} cy={cy} r={r} fill="#F2C94C" stroke={lit ? '#fff' : '#C99A00'} strokeWidth={lit ? 3 : 1.5} />
        <circle cx={cx} cy={cy} r={r * 0.65} fill="none" stroke="#C99A00" strokeWidth={1.2} />
      </g>
    );
  if (kind === 'book')
    return (
      <g opacity={op}>
        <rect x={cx - r} y={cy - r * 1.3} width={r * 2} height={r * 2.6} rx={2} fill={color} stroke={lit ? '#fff' : '#00000033'} strokeWidth={lit ? 3 : 1.2} />
        <rect x={cx - r + 3} y={cy - r * 1.3} width={3} height={r * 2.6} fill="#00000022" />
      </g>
    );
  // كرة
  return (
    <g opacity={op}>
      <circle cx={cx} cy={cy} r={r} fill={color} stroke={ring} strokeWidth={3} />
      <path d={`M${cx - r} ${cy} Q${cx} ${cy - r * 0.6} ${cx + r} ${cy}`} stroke="#fff" strokeWidth={1.5} fill="none" opacity={0.7} />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.35} r={r * 0.28} fill="#fff" opacity={0.6} />
    </g>
  );
}

/** كيس ورقي فيه حتى ١٠ أشياء في صفين، وعليه بطاقة (عدده غالبًا). lit: كم شيئًا عُدّ منه */
export function SBag({ x, y, color, op = 1, n = 10, kind = 'candy', label, lit = 0, dim = false, s = 0.85 }: { x: number; y: number; color: string; op?: number; n?: number; kind?: ItemKind; label?: string; lit?: number; dim?: boolean; s?: number }) {
  if (op <= 0.01) return null;
  return (
    <g transform={`translate(${x} ${y + (1 - op) * -30}) scale(${s})`} opacity={op}>
      <path d="M-50 -4 L50 -4 L56 82 Q0 90 -56 82Z" fill="#F5C4B3" stroke="#D85A30" strokeWidth={3} strokeLinejoin="round" />
      <path d="M-50 -4 L-42 -22 L42 -22 L50 -4Z" fill="#F9D8CB" stroke="#D85A30" strokeWidth={3} strokeLinejoin="round" />
      <path d="M-40 82 L-36 0 M40 82 L36 0" stroke="#D85A30" strokeWidth={1.5} opacity={0.4} />
      {Array.from({ length: n }, (_, i) => (
        <Item key={i} kind={kind} cx={-34 + (i % 5) * 17} cy={i < 5 ? 22 : 52} color={color} lit={i < lit} dim={dim} />
      ))}
      {label && (
        <g>
          <rect x={-26} y={92} width={52} height={30} rx={15} fill="#fff" stroke="#D85A30" strokeWidth={2.5} />
          <text y={115} textAnchor="middle" fontSize={24} fontWeight={800} fill="#D85A30">
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

/** صندوق خشبي مفتوح فيه أشياء في صفوف (حتى ٥ في الصف)، وعليه بطاقة */
export function Crate({ x, y, color, op = 1, n, kind = 'apple', label, lit = 0, dim = false, s = 1 }: { x: number; y: number; color: string; op?: number; n: number; kind?: ItemKind; label?: string; lit?: number; dim?: boolean; s?: number }) {
  if (op <= 0.01) return null;
  // الأشياء فوق حافة الصندوق، صفًّا فوق صف (الأول يرتكز على الحافة)
  const tall = kind === 'pencil' || kind === 'book';
  return (
    <g transform={`translate(${x} ${y + (1 - op) * -30}) scale(${s})`} opacity={op}>
      {Array.from({ length: n }, (_, i) => (
        <Item key={i} kind={kind} cx={-40 + (i % 5) * 20 + (Math.floor(i / 5) % 2) * 6} cy={(tall ? -38 : -32) - Math.floor(i / 5) * (tall ? 14 : 18)} color={color} r={8.5} lit={i < lit} dim={dim} />
      ))}
      <rect x={-58} y={-24} width={116} height={46} rx={5} fill="#C99263" stroke="#9C6B40" strokeWidth={3} />
      <path d="M-58 -2 L58 -2" stroke="#9C6B40" strokeWidth={2} opacity={0.6} />
      {label && (
        <text y={12} textAnchor="middle" fontSize={26} fontWeight={800} fill="#fff" direction="rtl">
          {label}
        </text>
      )}
    </g>
  );
}

/** بطاقة عدد أو كلمة تُرفع في المشهد */
export function STag({ x, y, w = 120, h = 64, op = 1, color = '#534AB7', children, size = 38 }: { x: number; y: number; w?: number; h?: number; op?: number; color?: string; children: ReactNode; size?: number }) {
  if (op <= 0.01) return null;
  return (
    <g opacity={op}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={14} fill="#fff" stroke={color} strokeWidth={4} />
      <text x={x} y={y + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={800} fill={color} direction="rtl">
        {children}
      </text>
    </g>
  );
}

export type Speaker = 'n' | 'boy' | 'boy2';
/** جملة القصة: [بداية بالثواني، من يتكلم، النص الظاهر] */
export type StoryLine = [number, Speaker, string];
export interface StoryTalk extends ClipTalk {
  /** من يتكلم في الجملة الحالية */
  who: Speaker;
}

/**
 * قالب المقطع الكرتوني الذي يفتح الدرس. الجمل بمتكلّميها في lines، والصوت المشكول في story-narration.json
 * (جملة لكل سطر؛ npm run voice يقرأ المتكلم من lines فيختار صوته).
 * scene تأخذ who، فـ «talk={s.talking && s.who === 'boy'}» يحرّك فم المتكلم.
 */
export function Story({ duration, lines, scene, voice }: { duration: number; lines: StoryLine[]; scene: (t: number, s: StoryTalk) => ReactNode; voice?: (VoiceLine | null)[] }) {
  return <Clip duration={duration} voice={voice} captions={lines.map(([t, , c]) => [t, c] as [number, string])} scene={(t, talk) => scene(t, { ...talk, who: lines[talk.line]?.[1] ?? 'n' })} />;
}

/** مزاج الشخصية حسب الزمن: [من الثانية، المزاج]، بالترتيب */
const moodAt = (t: number, tl: [number, Mood][] = []) => tl.reduce<Mood>((m, [at, md]) => (t >= at ? md : m), 'happy');

/**
 * مسرح القصة الجاهز: الفصل والسبورة والطاولة، وسالم (يمين) وخالد (يسار) يدخلان، وفقاعات كلامهما، والسؤال على السبورة.
 * bubbles: [من، إلى، من يقول (boy سالم، boy2 خالد)، النص]. children: أشياء المشهد فوق الطاولة.
 */
export function StoryStage({ t, s, board, boardAt = Infinity, table = true, salem, khalid, bubbles = [], children }: { t: number; s: StoryTalk; board?: ReactNode; boardAt?: number; table?: boolean; salem?: [number, Mood][]; khalid?: [number, Mood][]; bubbles?: [number, number, 'boy' | 'boy2', string][]; children?: ReactNode }) {
  const kin = tw(t, 0, 2);
  return (
    <>
      <StoryBackdrop
        boardOp={tw(t, boardAt, boardAt + 1.2)}
        board={
          typeof board === 'string' ? (
            <text x={700} y={134} textAnchor="middle" fontSize={board.length > 22 ? 40 : 52} fontWeight={800} fill="#fff" direction="rtl">
              {board}
            </text>
          ) : (
            board
          )
        }
      />
      {table && <Table x1={300} x2={1100} y={392} />}
      {children}
      <Kid x={1220 + (1 - kin) * 300} y={225} boy look={-1} mood={moodAt(t, salem)} talk={s.talking && s.who === 'boy'} now={s.now} name="سَالِمٌ" />
      <Kid x={180 - (1 - kin) * 300} y={225} boy alt look={1} mood={moodAt(t, khalid)} talk={s.talking && s.who === 'boy2'} now={s.now} name="خَالِدٌ" />
      {bubbles.map(([a, b, who, text], i) => {
        const size = text.length > 22 ? 28 : 34;
        return who === 'boy' ? (
          <Bubble key={i} x={900} y={22} w={440} tailX={1200} op={fade(t, a, b)} size={size}>
            {text}
          </Bubble>
        ) : (
          <Bubble key={i} x={40} y={16} w={440} tailX={330} op={fade(t, a, b)} size={size}>
            {text}
          </Bubble>
        );
      })}
    </>
  );
}

/** جملة رياضية على السبورة: كل جزء نص وحده، مرتبة من اليمين حول x، فلا يغيّر اتجاه النص ترتيبها في أي متصفح */
export function BoardRow({ parts, x = 700, y = 136, size = 60, color = '#fff', op = 1 }: { parts: string[]; x?: number; y?: number; size?: number; color?: string; op?: number }) {
  if (op <= 0.01) return null;
  const gap = size * 0.35;
  const ws = parts.map((p) => Math.max(1, [...p].length) * size * 0.56);
  const total = ws.reduce((a, b) => a + b, 0) + gap * (parts.length - 1);
  let edge = x + total / 2;
  return (
    <g opacity={op}>
      {parts.map((p, i) => {
        const cx = edge - ws[i] / 2;
        edge -= ws[i] + gap;
        return (
          <text key={i} x={cx} y={y} textAnchor="middle" fontSize={size} fontWeight={800} fill={color}>
            {p}
          </text>
        );
      })}
    </g>
  );
}
