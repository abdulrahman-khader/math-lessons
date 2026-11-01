import type { ReactNode } from 'react';
import { Card } from './Layout';
import { MCQ } from './MCQ';

/*
 * رسوم صغيرة لاتجاه البيانات في التمثيل بالخطوط: صعود، هبوط، ثبات.
 * بطاقات في صف واحد، والدرس يعطي الأرقام فقط.
 */

const dot = (cx: number, cy: number) => <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#13213b" strokeWidth={3} />;

/** بطاقة اتجاه: خط بين نقطتين، والاسم بلونه، ووصف قصير */
export function TrendCard({ y1, y2, color, title, text }: { y1: number; y2: number; color: string; title: string; text: string }) {
  return (
    <Card kind="ex" className="trendcard">
      <svg viewBox="0 0 100 60">
        <line x1={10} y1={y1} x2={90} y2={y2} stroke={color} strokeWidth={7} strokeLinecap="round" />
        {dot(10, y1)}
        {dot(90, y2)}
      </svg>
      <h3 style={{ color }}>{title}</h3>
      <span className="trendtext">{text}</span>
    </Card>
  );
}

/** خط صغير بنقاط كثيرة وتحته ما يمثّله (أمثلة من الحياة) */
export function TrendMini({ points, color, children }: { points: string; color: string; children: string }) {
  return (
    <div className="mini">
      <svg viewBox="0 0 120 60">
        <polyline points={points} fill="none" stroke={color} strokeWidth={5} strokeLinejoin="round" />
      </svg>
      <b>{children}</b>
    </div>
  );
}

/** سؤال سريع: خط بين نقطتين، والطالب يختار اتجاهه */
export function TrendQuiz({ y1, y2, answer }: { y1: number; y2: number; answer: 'صعود' | 'هبوط' | 'ثبات' }) {
  return (
    <div className="mini">
      <svg viewBox="0 0 120 70">
        <line x1={10} y1={62} x2={114} y2={62} stroke="#13213b" strokeWidth={2} />
        <polyline points={`20,${y1} 100,${y2}`} fill="none" stroke="#e8590c" strokeWidth={6} />
        {dot(20, y1)}
        {dot(100, y2)}
      </svg>
      <MCQ options={['صعود', 'هبوط', 'ثبات']} answer={answer} />
    </div>
  );
}

/** صف من ثلاث بطاقات صغيرة متساوية */
export const MiniRow = ({ children }: { children: ReactNode }) => <div className="minis">{children}</div>;

/** صف بطاقات الاتجاه الثلاث */
export const TrendRow = ({ children }: { children: ReactNode }) => <div className="trend3">{children}</div>;
