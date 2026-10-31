import type React from 'react';
import { useEffect, useState, type ReactNode } from 'react';
import { AlertDialog } from '@base-ui/react/alert-dialog';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { Menu } from '@base-ui/react/menu';
import { IconFull, IconHome, IconPen, IconPhone, IconReset, IconSound, IconStar, IconTimer, IconWheel } from './icons';
import { clock, num } from '../digits';
import { SECTION_NAMES } from '../sections';
import { sEnd, sTick } from '../sound';
import type { SectionKey } from '../types';
import type { TimerState } from './Timer';

/*
 * التصميم الجديد (meta.design === 'v2'): لا أزرار على السبورة.
 * الرأس شريط فاتح: القسم واسم الدرس، والمؤقت في وسطه، ونقاط الفرق وحالة الجوال وقائمة الأدوات.
 * التقدّم شريط واحد في أسفل الشاشة: لون لكل قسم، خانة لكل شريحة، والشريحة الحالية تنقسم إلى خطواتها.
 */

const IconPhoneV2 = ({ off }: { off: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
    <path d={off ? 'M11 18h2M3 3l18 18' : 'M11 18h2'} />
  </svg>
);

const IconDots = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="12" r="2.2" />
    <circle cx="12" cy="12" r="2.2" />
    <circle cx="19" cy="12" r="2.2" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2M9 2h6" />
  </svg>
);

export const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6zM12 6v14.5" />
  </svg>
);

interface HeaderProps {
  sec: SectionKey;
  title: string;
  teams: { name: string; score: number; color: string }[];
  onScore: (i: number) => void;
  /** null: الجوال غير مفعّل فلا أيقونة */
  phone: 'on' | 'off' | null;
  timer: ReactNode;
  /** أدوات الدرس في قائمة ⋯ */
  menu: ToolsMenuProps;
}

/** ما تحتاجه قائمة الأدوات من الدرس: الأفعال وحالة كل أداة */
export interface ToolsMenuProps {
  home: () => void;
  fullscreen: () => void;
  pen: boolean;
  togglePen: () => void;
  timer: boolean;
  toggleTimer: () => void;
  wheel: () => void;
  stars: () => void;
  muted: boolean;
  toggleMute: () => void;
  phone: boolean;
  openPhone: () => void;
  resetSlide: () => void;
  resetLesson: () => void;
  /** حاوية القائمة: داخل المسرح حتى تكبر وتصغر معه */
  container: React.RefObject<HTMLElement | null>;
}

/** عنصر في القائمة: أيقونة واسم، ونقطة خضراء حين تكون الأداة مفعّلة */
function Tool({ icon, label, on, onClick, hint, danger }: { icon: ReactNode; label: string; on?: boolean; onClick: () => void; hint?: string; danger?: boolean }) {
  return (
    <Menu.Item className={'v2mi' + (danger ? ' danger' : '')} onClick={onClick} label={label}>
      <span className="ico">{icon}</span>
      <span className="lbl">{label}</span>
      {hint && <kbd>{hint}</kbd>}
      {on !== undefined && <span className={'state' + (on ? ' on' : '')} aria-hidden="true" />}
    </Menu.Item>
  );
}

/** قائمة الأدوات (Base UI): قائمة واحدة مرتبة في مجموعات، والإعادة قائمة فرعية، وإعادة الدرس كاملًا تطلب التأكيد */
function ToolsMenu(p: ToolsMenuProps) {
  const [confirm, setConfirm] = useState(false);
  return (
    <DirectionProvider direction="rtl">
      <Menu.Root>
        <Menu.Trigger className="v2dots" aria-label="الأدوات">
          <IconDots />
        </Menu.Trigger>
        <Menu.Portal container={p.container}>
          <Menu.Positioner className="v2mpos" side="bottom" align="end" sideOffset={10} collisionPadding={16}>
            <Menu.Popup className="v2mpop" dir="rtl">
              <Tool icon={<IconHome />} label="الرئيسية" onClick={p.home} />
              <Tool icon={<IconFull />} label="ملء الشاشة" hint="F" onClick={p.fullscreen} />
              <Menu.Separator className="v2msep" />
              <Tool icon={<IconPen />} label="قلم الرسم" on={p.pen} onClick={p.togglePen} />
              <Tool icon={<IconTimer />} label="المؤقت" on={p.timer} onClick={p.toggleTimer} />
              <Tool icon={<IconWheel />} label="عجلة الأسماء" onClick={p.wheel} />
              <Tool icon={<IconStar />} label="نجم الأسبوع" onClick={p.stars} />
              <Menu.Separator className="v2msep" />
              <Tool icon={<IconPhone />} label="التحكم من الجوال" on={p.phone} onClick={p.openPhone} />
              <Tool icon={<IconSound muted={p.muted} />} label={p.muted ? 'تشغيل الصوت' : 'كتم الصوت'} onClick={p.toggleMute} />
              <Menu.Separator className="v2msep" />
              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className="v2mi" label="إعادة">
                  <span className="ico">
                    <IconReset />
                  </span>
                  <span className="lbl">إعادة</span>
                  <span className="more" aria-hidden="true">
                    ‹
                  </span>
                </Menu.SubmenuTrigger>
                <Menu.Portal container={p.container}>
                  <Menu.Positioner className="v2mpos" sideOffset={8} collisionPadding={16}>
                    <Menu.Popup className="v2mpop" dir="rtl">
                      <Tool icon={<IconReset />} label="إعادة هذه الشريحة" hint="R" onClick={p.resetSlide} />
                      <Tool icon={<IconReset />} label="إعادة الدرس كاملًا…" danger onClick={() => setConfirm(true)} />
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      <AlertDialog.Root open={confirm} onOpenChange={setConfirm}>
        <AlertDialog.Portal container={p.container}>
          <AlertDialog.Backdrop className="v2dback" />
          <AlertDialog.Popup className="v2dlg" dir="rtl">
            <AlertDialog.Title className="ttl">إعادة الدرس كاملًا؟</AlertDialog.Title>
            <AlertDialog.Description className="desc">تُمحى كل الإجابات والرسوم ونقاط الفرق، ويعود الدرس إلى البداية.</AlertDialog.Description>
            <div className="acts">
              <AlertDialog.Close className="btn">إلغاء</AlertDialog.Close>
              <button
                type="button"
                className="btn danger"
                onClick={() => {
                  setConfirm(false);
                  p.resetLesson();
                }}
              >
                نعم، أعد الدرس
              </button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </DirectionProvider>
  );
}

export function V2Header({ sec, title, teams, onScore, phone, timer, menu }: HeaderProps) {
  return (
    <>
      <span className="v2sec" data-sec={sec}>
        {SECTION_NAMES[sec]}
      </span>
      <span className="v2title">{title}</span>
      <span className="sp" />
      {timer}
      <div id="teams">
        {teams.map((t, i) => (
          <div key={i} className="team" style={{ '--tc': t.color } as React.CSSProperties}>
            <button aria-label="إضافة نقطة" title={`نقطة لـ${t.name}`} onClick={() => onScore(i)}>
              <span className="tn">
                <b>{num(t.score)}</b>
                {t.name}
              </span>
            </button>
          </div>
        ))}
      </div>
      {phone && (
        <span className={'v2phone' + (phone === 'off' ? ' off' : '')} role="img" aria-label={phone === 'off' ? 'الجوال غير متصل' : 'الجوال متصل'}>
          <IconPhoneV2 off={phone === 'off'} />
        </span>
      )}
      <span className="v2menu">
        <ToolsMenu {...menu} />
      </span>
    </>
  );
}

/** شريط التقدّم: الأقسام بألوانها (باهتة حتى تنتهي)، خانة لكل شريحة، والشريحة الحالية مقسومة إلى خطواتها */
export function V2Progress({ sections, cur, steps, goto }: { sections: { k: SectionKey; first: number; last: number }[]; cur: number; steps: { shown: number; total: number }; goto: (i: number) => void }) {
  return (
    <nav id="v2prog" aria-label="تقدّم الحصة">
      {sections.flatMap((s) =>
        Array.from({ length: s.last - s.first + 1 }, (_, j) => {
          const i = s.first + j;
          if (i !== cur)
            return <button key={i} data-sec={s.k} className={i < cur ? 'done' : ''} aria-label={`${SECTION_NAMES[s.k]}: الشريحة ${num(i + 1)}`} onClick={() => goto(i)} />;
          const n = Math.max(1, steps.total);
          const filled = steps.total ? steps.shown : 1;
          return (
            <span key={i} className="now" data-sec={s.k} aria-current="step" aria-label={`الشريحة ${num(i + 1)}، الخطوة ${num(steps.shown)} من ${num(steps.total)}`}>
              {Array.from({ length: n }, (_, k) => (
                <i key={k} className={k < filled ? 'done' : ''} />
              ))}
            </span>
          );
        }),
      )}
    </nav>
  );
}

/** المؤقت في وسط الرأس: لا يغطي المحتوى. يعدّ تنازليًا، ويطقطق في آخر ٥ ثوانٍ، ويومض عند الانتهاء. الضغط عليه يوقفه أو يكمله. */
export function TimerPill({ t, set }: { t: TimerState; set: (f: (t: TimerState) => TimerState) => void }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!t.run) return;
    setDone(false);
    const id = setInterval(() => set((s) => (s.run ? { ...s, left: Math.max(0, s.left - 1), run: s.left - 1 > 0 } : s)), 1000);
    return () => clearInterval(id);
  }, [t.run, t.gen, set]);
  useEffect(() => {
    if (!t.show) return;
    if (t.left === 0) {
      sEnd();
      setDone(true);
    } else if (t.run && t.left <= 5) sTick();
  }, [t.left, t.show]);
  if (!t.show) return null;
  return (
    <button
      id="v2timer"
      className={(done ? 'done' : '') + (t.run ? '' : ' paused')}
      role="timer"
      aria-label={t.run ? 'إيقاف المؤقت' : 'تشغيل المؤقت'}
      onClick={() => set((x) => (x.left > 0 ? { ...x, run: !x.run } : { ...x, show: false }))}
    >
      <IconClock />
      <span>{clock(t.left)}</span>
    </button>
  );
}
