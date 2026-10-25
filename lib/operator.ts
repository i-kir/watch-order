import operatorFile from '@/content/operator.json';

type OperatorFile = {
  operatorName: string | null;
  contactUrl: string | null;
  contactEmail: string | null;
  startedAt: string;
};

const file = operatorFile as OperatorFile;

function clean(value: string | null): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** 運営者情報ページに出す内容。未設定（null / 空文字）の項目は null で返し、ページ側で出さない */
export const operator = {
  name: clean(file.operatorName),
  contactUrl: clean(file.contactUrl),
  contactEmail: clean(file.contactEmail),
  startedAt: file.startedAt,
};
