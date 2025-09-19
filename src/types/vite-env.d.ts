/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TZ: string;
  readonly VITE_APP_URL: string;
  readonly HOST_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
