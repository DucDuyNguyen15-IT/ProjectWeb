// 01-auth.md
import { state, isString, publicUser, unauthenticated, throwIfInvalid } from '../lib/core.mjs';

function login({ body }) {
  const fields = {};
  const { email, password } = body;
  if (!isString(email) || !email.trim()) fields.email = 'Nhập e-mail.';
  else if (email.length < 3 || email.length > 254 || !email.includes('@')) fields.email = 'E-mail chưa đúng dạng.';
  if (!isString(password) || !password) fields.password = 'Nhập mật khẩu.';
  else if (password.length > 128) fields.password = 'Mật khẩu tối đa 128 ký tự.';
  throwIfInvalid(fields);

  const u = state.users.find((x) => x.password && x.email.toLowerCase() === email.trim().toLowerCase());
  if (!u || u.password !== password) throw unauthenticated('E-mail hoặc mật khẩu không đúng.');
  return { status: 200, body: { token: `token-${u.id}`, user: publicUser(u) } };
}

function me({ user }) {
  if (!user) throw unauthenticated();
  return { status: 200, body: { user: publicUser(user) } };
}

export const routes = [
  ['POST', '/api/auth/login', login],
  ['GET', '/api/auth/me', me],
];
