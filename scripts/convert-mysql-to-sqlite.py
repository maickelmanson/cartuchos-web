#!/usr/bin/env python3
"""
Script de Conversão MySQL → SQLite
Converte arquivo SQL do MySQL para formato compatível com SQLite (Cloudflare D1)

Uso:
    python3 convert-mysql-to-sqlite.py --input database-backup-latest.sql --output database-sqlite.sql
"""

import argparse
import re
import sys
from pathlib import Path


class MySQLToSQLiteConverter:
    """Converte SQL MySQL para SQLite"""

    def __init__(self, input_file: str, output_file: str):
        self.input_file = Path(input_file)
        self.output_file = Path(output_file)
        self.stats = {
            "lines_processed": 0,
            "conversions": 0,
            "tables": 0,
        }

    def convert(self) -> bool:
        """Realiza a conversão"""
        try:
            # Ler arquivo de entrada
            print(f"📖 Lendo arquivo: {self.input_file}")
            with open(self.input_file, "r", encoding="utf-8") as f:
                content = f.read()

            print(f"✓ Arquivo lido ({len(content)} bytes)")
            print("")
            print("🔄 Processando conversões...")

            # Aplicar conversões
            converted = self._convert_sql(content)

            # Escrever arquivo de saída
            print(f"📝 Escrevendo arquivo: {self.output_file}")
            with open(self.output_file, "w", encoding="utf-8") as f:
                f.write(converted)

            print(f"✓ Arquivo salvo ({len(converted)} bytes)")
            print("")

            # Exibir estatísticas
            self._print_stats()
            return True

        except Exception as e:
            print(f"❌ Erro: {e}", file=sys.stderr)
            return False

    def _convert_sql(self, content: str) -> str:
        """Aplica conversões SQL"""
        lines = content.split("\n")
        converted_lines = []

        for line in lines:
            self.stats["lines_processed"] += 1
            converted_line = self._convert_line(line)
            converted_lines.append(converted_line)

        return "\n".join(converted_lines)

    def _convert_line(self, line: str) -> str:
        """Converte uma linha SQL"""
        original = line

        # Remover comentários MySQL específicos
        line = re.sub(r"/\*!.*?\*/", "", line)

        # Converter CREATE TABLE
        if "CREATE TABLE" in line:
            self.stats["tables"] += 1
            line = re.sub(r"CREATE TABLE IF NOT EXISTS", "CREATE TABLE IF NOT EXISTS", line)
            line = re.sub(r"ENGINE=.*?;", ";", line)
            line = re.sub(r"DEFAULT CHARSET=.*?;", ";", line)
            line = re.sub(r"COLLATE=.*?;", ";", line)

        # Converter tipos de dados
        conversions = {
            r"\bBIGINT\b": "INTEGER",
            r"\bINT\b": "INTEGER",
            r"\bSMALLINT\b": "INTEGER",
            r"\bTINYINT\b": "INTEGER",
            r"\bDECIMAL\([^)]*\)": "REAL",
            r"\bFLOAT\b": "REAL",
            r"\bDOUBLE\b": "REAL",
            r"\bVARCHAR\([^)]*\)": "TEXT",
            r"\bCHAR\([^)]*\)": "TEXT",
            r"\bTEXT\b": "TEXT",
            r"\bLONGTEXT\b": "TEXT",
            r"\bBLOB\b": "BLOB",
            r"\bDATE\b": "TEXT",
            r"\bTIMESTAMP\b": "TEXT",
            r"\bDATETIME\b": "TEXT",
            r"\bTIME\b": "TEXT",
            r"\bBOOLEAN\b": "INTEGER",
            r"\bBOOL\b": "INTEGER",
            r"\bJSON\b": "TEXT",
            r"\bENUM\([^)]*\)": "TEXT",
        }

        for pattern, replacement in conversions.items():
            if re.search(pattern, line, re.IGNORECASE):
                line = re.sub(pattern, replacement, line, flags=re.IGNORECASE)
                self.stats["conversions"] += 1

        # Remover AUTO_INCREMENT (SQLite usa AUTOINCREMENT)
        if "AUTO_INCREMENT" in line:
            line = re.sub(r"AUTO_INCREMENT", "AUTOINCREMENT", line)

        # Remover UNSIGNED
        line = re.sub(r"\bUNSIGNED\b", "", line)

        # Remover ON UPDATE CURRENT_TIMESTAMP
        line = re.sub(r"ON UPDATE CURRENT_TIMESTAMP", "", line)

        # Converter DEFAULT CURRENT_TIMESTAMP
        line = re.sub(
            r"DEFAULT CURRENT_TIMESTAMP",
            "DEFAULT CURRENT_TIMESTAMP",
            line,
        )

        # Remover COLLATE
        line = re.sub(r"COLLATE [^ ,;]*", "", line)

        # Remover KEY duplicadas em constraints
        line = re.sub(r",\s*KEY\s+`[^`]*`\s*\([^)]*\)", "", line)

        # Remover UNIQUE KEY (manter apenas UNIQUE)
        line = re.sub(r"UNIQUE\s+KEY\s+`[^`]*`", "UNIQUE", line)

        # Limpar espaços múltiplos
        line = re.sub(r"\s+", " ", line).strip()

        return line

    def _print_stats(self) -> str:
        """Exibe estatísticas da conversão"""
        print("📊 Estatísticas da Conversão:")
        print(f"   • Linhas processadas: {self.stats['lines_processed']}")
        print(f"   • Conversões realizadas: {self.stats['conversions']}")
        print(f"   • Tabelas convertidas: {self.stats['tables']}")
        print("")
        print("✅ Conversão concluída com sucesso!")
        print("")
        print("Próximos passos:")
        print("1. Instale wrangler: npm install -g wrangler")
        print("2. Crie banco D1: wrangler d1 create cartuchos-db")
        print("3. Restaure dados: wrangler d1 execute cartuchos-db --file database-sqlite.sql")
        print("4. Faça deploy: wrangler deploy")


def main():
    parser = argparse.ArgumentParser(
        description="Converte SQL MySQL para SQLite (Cloudflare D1)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python3 convert-mysql-to-sqlite.py --input database-backup-latest.sql --output database-sqlite.sql
  python3 convert-mysql-to-sqlite.py -i backup.sql -o sqlite.sql
        """,
    )

    parser.add_argument(
        "-i",
        "--input",
        required=True,
        help="Arquivo SQL de entrada (MySQL)",
    )
    parser.add_argument(
        "-o",
        "--output",
        required=True,
        help="Arquivo SQL de saída (SQLite)",
    )

    args = parser.parse_args()

    print("")
    print("🔄 MySQL → SQLite Converter")
    print("=" * 50)
    print("")

    converter = MySQLToSQLiteConverter(args.input, args.output)
    success = converter.convert()

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
