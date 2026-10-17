// كل ما يحتاجه ملف الدرس يُستورد من '@engine'
export { defineLesson, defineChart } from './types';
export type { Lesson, LessonMeta, SlideDef, SectionKey, ChartSpec, HlKey } from './types';
export { digits, num } from './digits';
export { Chart } from './components/Chart';
export { DragChart } from './components/DragChart';
export { TrendExplorer, type Challenge } from './components/TrendExplorer';
export { MCQ } from './components/MCQ';
export { QuestionSlide, type StepDef } from './components/QuestionSlide';
export { Step, Solution, NextButton, HideButton, HintButton, Hint, TimerButton, ThinkPairShare, Ctrls } from './components/Steps';
export { Tag, SlideHead, Cols, Stack, QCol, Card, Mark, Eq, DataTable, MindMap, Winner, IfTeams, GoHomeButton, type Kind } from './components/Layout';
export { CubeTrain, Blank, FactLine, VSum, FactFamily, CUBE, type CubePart } from './components/Cubes';
