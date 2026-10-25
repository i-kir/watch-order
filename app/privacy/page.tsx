import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage, LegalSection } from '@/components/LegalPage';
import { hasAffiliate } from '@/lib/affiliate';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '観る順ナビが取得する情報、Cookie・広告、外部サービスの利用についての方針です。',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="プライバシーポリシー" updatedAt="2026年10月25日">
      <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
        観る順ナビ（以下「当サイト」）は、利用者の情報を次のとおり取り扱います。
      </p>

      <LegalSection heading="取得する情報">
        <p>
          当サイトには、会員登録やログインの仕組みはありません。氏名やメールアドレスなどの個人情報を、
          閲覧するだけで取得することはありません。
        </p>
        <p>
          現時点では、アクセス解析ツール（Google アナリティクスなど）は導入していません。
          導入する場合は、このページに利用目的と無効化の方法を追記します。
        </p>
        <p>
          当サイトは Vercel のサービスで配信しています。配信にあたり、接続元の IP
          アドレスやブラウザの種類などが、サービスの運用上のログとして記録されることがあります。
        </p>
      </LegalSection>

      <LegalSection heading="視聴済みのチェックについて">
        <p>
          シリーズページの「視聴済み」のチェックは、お使いの端末のブラウザ（ローカルストレージ）にだけ保存されます。
          当サイトのサーバーには送信されません。記録を共有カード（画像）にするときも、画像はお使いのブラウザ内で作られ、どこにも送信されません。
          ブラウザのサイトデータを削除すると、記録も消えます。
        </p>
      </LegalSection>

      {hasAffiliate() && (
        <LegalSection heading="広告・アフィリエイトについて">
          <p>
            当サイトは、アフィリエイトプログラム（成果報酬型の広告）に参加しています。広告を含むリンクをクリックすると、
            広告配信事業者が Cookie
            などを使って、クリックや申込みの情報を取得することがあります。これらの情報から、個人を特定することはできません。
          </p>
          <p>
            Cookie の利用は、お使いのブラウザの設定で無効にできます。無効にしても、当サイトの閲覧には影響しません。
            各事業者の取り扱いは、それぞれのプライバシーポリシーをご確認ください。
          </p>
        </LegalSection>
      )}

      <LegalSection heading="お問い合わせいただいた内容">
        <p>
          お問い合わせでいただいたお名前、連絡先、内容は、返信と内容の確認のためにだけ使います。
          法令に基づく場合を除き、本人の同意なく第三者に提供しません。
        </p>
      </LegalSection>

      <LegalSection heading="外部サイトへのリンク">
        <p>
          当サイトには、出典や配信サービスなど、外部サイトへのリンクがあります。リンク先の内容や個人情報の取り扱いについて、
          当サイトは責任を負いません。
        </p>
      </LegalSection>

      <LegalSection heading="掲載情報について">
        <p>
          掲載する順番、配信状況、作品情報は、できる限り正確を期していますが、内容を保証するものではありません。
          配信の開始・終了は随時変わるため、視聴の前に各サービスでご確認ください。
          当サイトの情報を利用して生じた損害について、責任を負いません。
        </p>
      </LegalSection>

      <LegalSection heading="著作権・画像について">
        <p>
          ポスター画像や作品情報の一部は TMDB の API から取得しています。作品の画像・名称などの権利は、
          各権利者に帰属します。権利者の方からの削除のご依頼には、お問い合わせから連絡いただければ対応します。
        </p>
        <p>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </LegalSection>

      <LegalSection heading="改定について">
        <p>
          このポリシーは、必要に応じて見直し、変更することがあります。変更後の内容は、このページに掲載した時点で効力を持ちます。
        </p>
        <p>
          ご不明な点は、
          <Link href="/about" className="text-[var(--color-accent)] hover:underline">
            運営者情報・お問い合わせ
          </Link>
          からご連絡ください。
        </p>
      </LegalSection>
    </LegalPage>
  );
}
