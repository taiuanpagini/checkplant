export interface ToastProps {
  title: string;
  description: string;
  showModal: boolean;
  setShowModal: Function;
  action: Function;
}