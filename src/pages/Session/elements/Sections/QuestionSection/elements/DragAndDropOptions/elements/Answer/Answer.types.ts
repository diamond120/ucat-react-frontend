import type { DragItem } from '../../DragAndDropOptions.types';

export type AnswerProps = {
  id?: number;
  text: string;
  hidden?: boolean;
  onEnd?: (item: DragItem) => void;
};
