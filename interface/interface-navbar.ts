export interface SVGProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  className?: string;
  onOpenModal?: () => void;
  onRedirect?: () => void;
}
