// 02-catalog.md — public, chỉ đọc.
import { state, throwIfInvalid } from '../lib/core.mjs';

const ok = (body) => ({ status: 200, body });

function samples({ query }) {
  const id = query.serviceId;
  if (id) {
    throwIfInvalid(state.catalog.services.some((s) => s.id === id) ? {} : { serviceId: 'Không có dịch vụ này.' });
    return ok({ samples: state.catalog.samples.filter((s) => s.serviceId === id) });
  }
  return ok({ samples: state.catalog.samples });
}

export const routes = [
  ['GET', '/api/services', () => ok({ services: state.catalog.services })],
  ['GET', '/api/extras', () => ok({ extras: state.catalog.extras })],
  ['GET', '/api/samples', samples],
  ['GET', '/api/reviews', () => ok({ reviews: [...state.catalog.reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt)) })],
];
