/// <reference lib="es2020" />

interface ImportMetaEnv {
  API_URL: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 