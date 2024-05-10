import type { DragItem } from '../../DragAndDropOptions.types';

export type AnswerProps = {
  id?: number;
  text: string;
  onEnd?: (item: DragItem) => void;
};
