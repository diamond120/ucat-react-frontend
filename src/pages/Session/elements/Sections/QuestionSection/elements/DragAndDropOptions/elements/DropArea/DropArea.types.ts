import type { DragItem } from '../../DragAndDropOptions.types';

export type DropAreaProps = {
  id: number;
  onDrop: (item: DragItem, id: number) => void;
  clearAnswer?: () => void;
  children?: React.ReactNode;
};
