/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ADMIN_PREFIX: string;
  readonly VITE_PORT: string;
  readonly VITE_API_URL: string;
  readonly VITE_PWA: string;
  readonly MODE: string;
  readonly PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
