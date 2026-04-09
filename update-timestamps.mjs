#!/usr/bin/env node

/**
 * Script para atualizar automaticamente data e hora em arquivos de documentação
 * Uso: node update-timestamps.mjs
 * 
 * Atualiza:
 * - README.md
 * - próximas melhorias para upgrade premium black.txt
 * - todo.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Função para formatar data/hora no padrão d/m/a - hh:mm
function getCurrentDateTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

// Função para atualizar arquivo
function updateFileTimestamp(filePath, searchPattern, replacePattern) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const timestamp = getCurrentDateTime();
    
    // Substituir usando regex
    const updatedContent = content.replace(searchPattern, (match) => {
      return replacePattern(match, timestamp);
    });
    
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`✅ Atualizado: ${path.basename(filePath)} - ${timestamp}`);
      return true;
    } else {
      console.log(`⚠️ Nenhuma mudança: ${path.basename(filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erro ao atualizar ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

// Atualizar README.md
const readmeFile = path.join(__dirname, 'README.md');
updateFileTimestamp(
  readmeFile,
  /\*\*Última Atualização:\*\* \d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}/g,
  (match, timestamp) => `**Última Atualização:** ${timestamp}`
);

// Atualizar próximas melhorias
const improvementsFile = path.join(__dirname, 'próximas melhorias para upgrade premium black.txt');
updateFileTimestamp(
  improvementsFile,
  /Status: \d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}/g,
  (match, timestamp) => `Status: ${timestamp}`
);

// Atualizar todo.md
const todoFile = path.join(__dirname, 'todo.md');
updateFileTimestamp(
  todoFile,
  /\*\*Última Atualização:\*\* \d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}/g,
  (match, timestamp) => `**Última Atualização:** ${timestamp}`
);

console.log('\n✨ Atualização de timestamps concluída!');
