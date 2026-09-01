import Image from 'next/image';

type Props = {
  src: string | null;
  alt: string;
  /** 一覧用の小さいサイズか、目立たせる大きめか */
  size?: 'sm' | 'md';
  className?: string;
};

const SIZES = {
  sm: { w: 56, h: 84 },
  md: { w: 92, h: 138 },
} as const;

/** ポスターは TMDb 未取得なら出さない。無いときは静かに詰めて表示する */
export default function Poster({ src, alt, size = 'sm', className = '' }: Props) {
  const { w, h } = SIZES[size];

  if (!src) {
    return (
      <div
        className={`shrink-0 rounded bg-[var(--color-line)] ${className}`}
        style={{ width: w, height: h }}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      className={`shrink-0 rounded object-cover ${className}`}
      sizes={`${w}px`}
    />
  );
}
