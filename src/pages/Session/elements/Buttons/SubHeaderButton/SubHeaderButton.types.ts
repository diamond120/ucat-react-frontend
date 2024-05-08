export type SubHeaderButtonTypes = 'answer' | 'calculator' | 'flag';

export type SubHeaderButtonProps = {
  type: SubHeaderButtonTypes;
  flagged?: boolean;
  onClick?: () => void;
};
