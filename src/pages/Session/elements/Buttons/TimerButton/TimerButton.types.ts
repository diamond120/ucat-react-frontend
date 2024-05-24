export type TimerButtonProps = {
  duration: number;
  warning?: number;
  onTimeExpired?: () => void;
  id?: string;
};
