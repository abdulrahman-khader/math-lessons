import { useState } from 'react';
import { num } from '../digits';
import { CUBE, CubeTrain } from './Cubes';
import { Cols, Stack } from './Layout';
import { Domino, Sentence, Towers, useRemoteWidget } from './Primary';

/*
 * مستكشفات الصف الثاني (طرق الطرح): يغيّر الطلاب الأعداد على السبورة أو من الجوال، ويرون الجملة تتغير.
 */

/** ضفادع على ورقة اللوتس؛ «الكل» يقفز منها كلها، و«صفر» لا يقفز منها شيء */
export const Frogs = ({ n, k, all }: { n: number; k: number; all?: boolean }) => (
  <CubeTrain parts={[{ n, color: CUBE.green }]} shape="frog" k={k} take={all ? [0] : [1]} size={44} counts={false} />
);

/** مستكشف: عدد الضفادع، ثم «اطرح الكل» أو «اطرح صفرًا» */
export function FrogExplorer() {
  const [n, setN] = useState(5);
  const [mode, setMode] = useState<'none' | 'all' | 'zero'>('none');
  const setCount = (v: number) => {
    setN(Math.max(1, Math.min(9, v)));
    setMode('none');
  };
  const sentence = mode === 'all' ? `${num(n)} − ${num(n)} = ٠` : mode === 'zero' ? `${num(n)} − ٠ = ${num(n)}` : `${num(n)} − ؟`;
  useRemoteWidget(
    () => ({
      title: 'الضفادع',
      info: sentence,
      steppers: [{ key: 'n', label: 'عدد الضفادع', value: n, min: 1, max: 9, color: CUBE.green }],
      buttons: [
        { key: 'all', label: 'تقفز كلها', on: mode === 'all' },
        { key: 'zero', label: 'لا يقفز أيّ ضفدع', on: mode === 'zero' },
        { key: 'reset', label: 'من جديد' },
      ],
    }),
    (k, v) => {
      if (k === 'n' && v !== undefined) setCount(v);
      else if (k === 'all' || k === 'zero') setMode(k);
      else if (k === 'reset') setMode('none');
    },
    [n, mode],
  );
  return (
    <div className="frogx">
      <div className="chart cubebox">
        <CubeTrain parts={[{ n, color: CUBE.green }]} shape="frog" removed={mode === 'all' ? 0 : null} size={52} counts={false} />
      </div>
      <div className="hopx-ctrl">
        <div className="ffstep">
          <span>عدد الضفادع</span>
          <button aria-label="إنقاص الضفادع" disabled={n <= 1} onClick={() => setCount(n - 1)}>
            −
          </button>
          <b>{num(n)}</b>
          <button aria-label="زيادة الضفادع" disabled={n >= 9} onClick={() => setCount(n + 1)}>
            +
          </button>
        </div>
        <button className={'btn' + (mode === 'all' ? ' sel' : '')} onClick={() => setMode('all')}>
          تقفز كلها
        </button>
        <button className={'btn' + (mode === 'zero' ? ' sel' : '')} onClick={() => setMode('zero')}>
          لا يقفز أيّ ضفدع
        </button>
        <span className={'hopx-eq' + (mode !== 'none' ? ' done' : '')}>
          <span className="eq">{sentence}</span>
        </span>
      </div>
    </div>
  );
}

/** مستكشف: عدد مكعبات كل برج، ثم «أجمع» أو «أطرح» */
export function DoublesExplorer() {
  const [n, setN] = useState(6);
  const [mode, setMode] = useState<'add' | 'sub' | null>(null);
  const set = (v: number) => {
    setN(Math.max(1, Math.min(9, v)));
    setMode(null);
  };
  const info = mode === 'add' ? `${num(n)} + ${num(n)} = ${num(n * 2)}` : mode === 'sub' ? `${num(n * 2)} − ${num(n)} = ${num(n)}` : `${num(n)} و${num(n)}`;
  useRemoteWidget(
    () => ({
      title: 'برجان متساويان',
      info,
      steppers: [{ key: 'n', label: 'مكعبات كل برج', value: n, min: 1, max: 9 }],
      buttons: [
        { key: 'add', label: 'أجمع البرجين', on: mode === 'add' },
        { key: 'sub', label: 'أطرح برجًا', on: mode === 'sub' },
      ],
    }),
    (k, v) => {
      if (k === 'n' && v !== undefined) set(v);
      else if (k === 'add' || k === 'sub') setMode(k);
    },
    [n, mode],
  );
  return (
    <Cols>
      <div className="chart cubebox dbl">
        <Towers a={n} b={n} state={mode} colors={[CUBE.green, CUBE.orange]} />
      </div>
      <Stack>
        <div className="ffstep">
          <span>مكعبات كل برج</span>
          <button aria-label="إنقاص المكعبات" disabled={n <= 1} onClick={() => set(n - 1)}>
            −
          </button>
          <b>{num(n)}</b>
          <button aria-label="زيادة المكعبات" disabled={n >= 9} onClick={() => set(n + 1)}>
            +
          </button>
        </div>
        <div className="hopx-ctrl">
          <button className={'btn' + (mode === 'add' ? ' sel' : '')} onClick={() => setMode('add')}>
            أجمع البرجين
          </button>
          <button className={'btn' + (mode === 'sub' ? ' sel' : '')} onClick={() => setMode('sub')}>
            أطرح برجًا
          </button>
        </div>
        <span className={'hopx-eq' + (mode ? ' done' : '')}>
          <span className="eq">{info}</span>
        </span>
      </Stack>
    </Cols>
  );
}

/** مستكشف: المجموع والعدد المعروف، ثم يظهر النصف المخفي من الدومينو */
export function MissingExplorer() {
  const [total, setTotal] = useState(13);
  const [known, setKnown] = useState(8);
  const [open, setOpen] = useState(false);
  const missing = total - known;
  const setT = (v: number) => {
    const t = Math.max(1, Math.min(18, v));
    setTotal(t);
    // نصف الدومينو يتسع لـ ٩ نقاط على الأكثر
    setKnown((k) => Math.max(t - 9, Math.min(k, t, 9)));
    setOpen(false);
  };
  const setK = (v: number) => {
    setKnown(Math.max(Math.max(0, total - 9), Math.min(9, total, v)));
    setOpen(false);
  };
  useRemoteWidget(
    () => ({
      title: 'الدومينو',
      info: `${num(known)} + ${open ? num(missing) : '□'} = ${num(total)}`,
      steppers: [
        { key: 't', label: 'المجموع', value: total, min: 1, max: 18 },
        { key: 'k', label: 'النقاط الظاهرة', value: known, min: Math.max(0, total - 9), max: Math.min(9, total) },
      ],
      buttons: [{ key: 'open', label: open ? 'أخفِ النصف' : 'أظهر النصف المخفي', on: open }],
    }),
    (k, v) => {
      if (k === 't' && v !== undefined) setT(v);
      else if (k === 'k' && v !== undefined) setK(v);
      else if (k === 'open') setOpen((o) => !o);
    },
    [total, known, open],
  );
  const stepper = (label: string, v: number, set: (v: number) => void, lo: number, hi: number) => (
    <div className="ffstep">
      <span>{label}</span>
      <button aria-label={`إنقاص ${label}`} disabled={v <= lo} onClick={() => set(v - 1)}>
        −
      </button>
      <b>{num(v)}</b>
      <button aria-label={`زيادة ${label}`} disabled={v >= hi} onClick={() => set(v + 1)}>
        +
      </button>
    </div>
  );
  return (
    <Cols>
      <div className="chart cubebox">
        <Domino known={known} missing={missing} show={open} />
      </div>
      <Stack>
        {stepper('المجموع', total, setT, 1, 18)}
        {stepper('النقاط الظاهرة', known, setK, Math.max(0, total - 9), Math.min(9, total))}
        <button className="btn step-btn" onClick={() => setOpen((o) => !o)}>
          {open ? 'أخفِ النصف' : 'أظهر النصف المخفي'}
        </button>
        <div className="flines">
          {open && <Sentence t={[total, '−', known, '=', missing]} big />}
          <span className="hopx-eq done">
            <span className="eq">
              {num(known)} + {open ? num(missing) : '□'} = {num(total)}
            </span>
          </span>
        </div>
      </Stack>
    </Cols>
  );
}
