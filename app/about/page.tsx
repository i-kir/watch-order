import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, LegalSection } from '@/components/LegalPage';
import { hasAffiliate } from '@/lib/affiliate';
import { operator } from '@/lib/operator';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: '運営者情報・お問い合わせ',
  description: '観る順ナビの運営者情報、サイトの方針、お問い合わせ先です。',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const hasContact = operator.contactUrl !== null || operator.contactEmail !== null;

  return (
    <LegalPage title="運営者情報・お問い合わせ" updatedAt="2026年10月25日">
      <LegalSection heading="サイトについて">
        <dl className="divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
          <Row term="サイト名" value="観る順ナビ" />
          <Row term="URL" value={SITE_URL} />
          {operator.name && <Row term="運営者" value={operator.name} />}
          <Row term="運営開始" value={operator.startedAt} />
        </dl>
        <p>
          映画・アニメのシリーズを観る順番を、公開順・時系列順・おすすめ順で比較できるサイトです。
          順番に異説がある箇所や、公式設定に矛盾がある箇所は、出典つきで明記しています。
        </p>
      </LegalSection>

      <LegalSection heading="情報の扱いについて">
        <p>
          各シリーズの順番と解説は、ページ内に記載した出典に基づいて作成しています。
          誤りや古い情報を見つけた場合は、下記のお問い合わせからお知らせください。確認のうえ修正します。
        </p>
        <p>
          作品情報の一部は TMDB の API、配信状況は JustWatch（TMDB API
          経由）のデータを利用しています。配信状況は変わるため、実際に視聴できるかは各サービスでご確認ください。
        </p>
        {hasAffiliate() && (
          <p>
            当サイトは、アフィリエイトプログラムによる収益を得ることがあります。広告を含むリンクには「PR」と表記しています。
            作品の順番や解説の内容は、広告の有無で変えていません。
          </p>
        )}
      </LegalSection>

      {hasContact && (
        <LegalSection heading="お問い合わせ">
          <p>
            当サイトへのご意見、誤りのご指摘、掲載に関するご連絡は、次の窓口で受け付けています。
            内容によっては、お返事できない場合があります。
          </p>
          <dl className="divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-white">
            {operator.contactUrl && (
              <Row
                term="お問い合わせフォーム"
                value={
                  <a
                    href={operator.contactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    フォームを開く
                  </a>
                }
              />
            )}
            {operator.contactEmail && (
              <Row
                term="メール"
                value={
                  <a
                    href={`mailto:${operator.contactEmail}`}
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    {operator.contactEmail}
                  </a>
                }
              />
            )}
          </dl>
          <p>
            いただいた内容の取り扱いは、
            <Link href="/privacy" className="text-[var(--color-accent)] hover:underline">
              プライバシーポリシー
            </Link>
            をご覧ください。
          </p>
        </LegalSection>
      )}
    </LegalPage>
  );
}

function Row({ term, value }: { term: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-4 px-4 py-3 text-sm">
      <dt className="w-32 shrink-0 font-bold text-[var(--color-ink)]">{term}</dt>
      <dd className="min-w-0 flex-1 break-words text-[var(--color-ink-soft)]">{value}</dd>
    </div>
  );
}
