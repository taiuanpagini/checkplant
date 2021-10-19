export interface ActionButtonProps {
  title: string;
  color: string;
  background: string;
  border: string;
  icon?: string;
  action: Function;
  selected?: boolean;
}