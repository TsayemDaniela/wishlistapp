import Link from 'next/link';

export default function LinkButton({ text, href, styles }) {
  return (
    <Link href={href} passHref>
      <button type="button" className={styles}>{text}</button>
    </Link>
  );
}
