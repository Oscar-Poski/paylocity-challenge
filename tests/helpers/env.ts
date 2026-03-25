import dotenv from 'dotenv';

dotenv.config();

function normalizeBaseUrl(value: string): string {
  return value.endsWith('/') ? value : `${value}/`;
}

function normalizeAuthToken(value: string): string {
  return value.startsWith('Basic ') ? value : `Basic ${value}`;
}

export function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getApiBaseUrl(): string {
  return normalizeBaseUrl(getRequiredEnv('PAYLOCITY_BASE_URL'));
}

export function getUiUrl(): string {
  return getRequiredEnv('PAYLOCITY_UI_URL');
}

export function buildApiUrl(path: string): string {
  return `${getApiBaseUrl()}${path.replace(/^\//, '')}`;
}

export function getApiAuthHeaders(): Record<string, string> {
  return {
    Authorization: normalizeAuthToken(getRequiredEnv('AUTH_API_PAYLOCITY'))
  };
}

export function getUiCredentials(): { username: string; password: string } {
  return {
    username: getRequiredEnv('PAYLOCITY_USERNAME'),
    password: getRequiredEnv('PAYLOCITY_PASSWORD')
  };
}
