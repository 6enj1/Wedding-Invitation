import { readFileSync } from 'fs';
import { join } from 'path';

const OG = {
  fr: {
    title: 'Samuel &amp; Dorcas — 26 Décembre 2026 💍',
    description:
      'Vous êtes cordialement invités à une Nuit Royale en Cristal. Rejoignez-nous pour célébrer notre mariage à Avianto, Muldersdrift.',
  },
};

export default function handler(req, res) {
  const lang = req.query.lang;

  // Only rewrite for French; English is the default static HTML
  if (!lang || !OG[lang]) {
    const html = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  }

  const meta = OG[lang];
  let html = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');

  html = html
    .replace(
      /(<meta property="og:title"\s+content=")[^"]*(")/,
      `$1${meta.title}$2`
    )
    .replace(
      /(<meta property="og:description"\s+content=")[^"]*(")/,
      `$1${meta.description}$2`
    )
    .replace(
      /(<meta name="twitter:title"\s+content=")[^"]*(")/,
      `$1${meta.title}$2`
    )
    .replace(
      /(<meta name="twitter:description"\s+content=")[^"]*(")/,
      `$1${meta.description}$2`
    );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.send(html);
}
