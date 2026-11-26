// Ảnh minh họa cho imageUrl (/api/files/samples/<id>.svg). Không phải endpoint của contract, chỉ phục vụ ảnh.
import { state, notFound } from '../lib/core.mjs';

const COLORS = ['#8a5a2b', '#5b6b4a', '#3f5a7a', '#7a3f4f', '#6a5a8a'];

// Hình minh họa đơn giản (không có ảnh người thật): nền màu, mũ cử nhân, tiêu đề.
function sampleSvg(sample, i) {
  const bg = COLORS[i % COLORS.length];
  const title = sample.title.replace(/[<&>]/g, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" role="img"><title>${title}</title>`
    + `<rect width="600" height="400" fill="${bg}"/>`
    + `<circle cx="470" cy="110" r="60" fill="#f4e9d8" opacity=".35"/>`
    + `<path d="M180 190 L300 140 L420 190 L300 240 Z" fill="#1f1a17"/>`
    + `<rect x="250" y="215" width="100" height="45" fill="#1f1a17"/>`
    + `<path d="M420 190 L420 260" stroke="#e7c27d" stroke-width="6"/>`
    + `<text x="300" y="340" font-family="Georgia, serif" font-size="28" fill="#fffaf2" text-anchor="middle">${title}</text></svg>`;
}

function sample({ params }) {
  const i = state.catalog.samples.findIndex((s) => `${s.id}.svg` === params.file);
  if (i < 0) throw notFound('Không có ảnh này.');
  return { status: 200, file: { type: 'image/svg+xml', data: sampleSvg(state.catalog.samples[i], i) } };
}

export const routes = [
  ['GET', '/api/files/samples/:file', sample],
];
