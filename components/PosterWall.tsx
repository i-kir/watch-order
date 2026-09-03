import Image from 'next/image';

type Props = {
  posters: string[];
  /** 2列に分けて逆方向に流す */
  rows?: 1 | 2;
};

/**
 * トップの背景に流すポスターの壁。装飾なので aria-hidden。
 * 同じ列を2回並べて -50% まで動かすことで、継ぎ目なくループする。
 */
export default function PosterWall({ posters, rows = 2 }: Props) {
  if (posters.length === 0) return null;

  const half = Math.ceil(posters.length / 2);
  const lists = rows === 2 ? [posters.slice(0, half), posters.slice(half)] : [posters];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="flex h-full flex-col justify-center gap-3">
        {lists.map((list, i) => (
          <div key={i} className="flex w-max shrink-0">
            <div className={`flex gap-3 pr-3 ${i % 2 === 0 ? 'wall-row' : 'wall-row-rev'}`}>
              {[...list, ...list].map((url, j) => (
                <Image
                  key={`${url}-${j}`}
                  src={url}
                  alt=""
                  width={92}
                  height={138}
                  sizes="92px"
                  // 背景なので最初の数枚以外は遅延読み込みでよい
                  loading={j < 6 ? 'eager' : 'lazy'}
                  className="h-[104px] w-auto shrink-0 rounded-md object-cover sm:h-[132px]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
