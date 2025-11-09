import fs from 'fs';
import path from 'path';

const TEMP_FILE = 'public/locales/temp.json';
const BASE_DIR = 'public/locales';

// Função para acessar objeto aninhado via string de path
const setNestedValue = (obj, pathStr, value) => {
  const keys = pathStr.split('.');
  let current = obj;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      if (current[key] && typeof current[key] === 'object') {
        current[key] = { ...current[key], ...value };
      } else {
        current[key] = value;
      }
    } else {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  });
};

// Carrega o JSON temporário
const data = JSON.parse(fs.readFileSync(TEMP_FILE, 'utf-8'));

// Extrai namespace e targetPath
const namespace = data.ns || 'common';
const targetPath = data.targetPath || ''; // se não tiver, adiciona no topo
delete data.ns;
delete data.targetPath;

for (const [lang, content] of Object.entries(data)) {
  const langDir = path.join(BASE_DIR, lang);
  const outPath = path.join(langDir, `${namespace}.json`);
  fs.mkdirSync(langDir, { recursive: true });

  let finalContent = {};
  if (fs.existsSync(outPath)) {
    finalContent = JSON.parse(fs.readFileSync(outPath, 'utf-8'));
  }

  if (targetPath) {
    setNestedValue(finalContent, targetPath, content);
  } else {
    // se não tiver targetPath, adiciona diretamente no topo
    finalContent = { ...finalContent, ...content };
  }

  fs.writeFileSync(outPath, JSON.stringify(finalContent, null, 2), 'utf-8');
  console.log(`✅ Gerado/Mesclado: ${outPath}`);
}

console.log('\n✨ Todos os arquivos foram criados/mesclados com sucesso!');
