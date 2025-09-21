#!/usr/bin/env python3
"""
🎌 NIPO SCHOOL - Análise Real do Banco de Dados
Conecta com Supabase e explora dados reais para implementação
"""

import os
from dotenv import load_dotenv
from supabase import create_client, Client
import pandas as pd
import json

# Carregar variáveis de ambiente
load_dotenv()

# Configuração do Supabase
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_ANON_KEY')

def connect_supabase():
    """Conecta com o banco Supabase"""
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("✅ Conectado ao Supabase com sucesso!")
        return supabase
    except Exception as e:
        print(f"❌ Erro ao conectar: {e}")
        return None

def list_tables(supabase):
    """Lista todas as tabelas do banco"""
    try:
        # Query para listar tabelas
        result = supabase.rpc('get_schema_tables').execute()
        return result.data
    except Exception as e:
        print(f"❌ Erro ao listar tabelas: {e}")
        # Vamos tentar uma abordagem alternativa
        return None

def explore_table_structure(supabase, table_name):
    """Explora estrutura de uma tabela específica"""
    try:
        # Pegar apenas 1 registro para ver a estrutura
        result = supabase.table(table_name).select("*").limit(1).execute()
        
        if result.data:
            print(f"\n🔍 TABELA: {table_name}")
            print(f"📊 Colunas: {list(result.data[0].keys())}")
            print(f"📝 Exemplo de dados:")
            for key, value in result.data[0].items():
                print(f"  • {key}: {value}")
            
            # Contar total de registros
            count_result = supabase.table(table_name).select("*", count='exact').execute()
            print(f"📈 Total de registros: {count_result.count}")
            
        return result.data[0] if result.data else None
        
    except Exception as e:
        print(f"❌ Erro ao explorar tabela {table_name}: {e}")
        return None

def main():
    """Função principal para explorar o banco"""
    print("🎌 NIPO SCHOOL - ANÁLISE REAL DO BANCO DE DADOS")
    print("=" * 50)
    
    # Conectar
    supabase = connect_supabase()
    if not supabase:
        return
    
    # Tabelas conhecidas baseadas na documentação
    known_tables = [
        'usuarios', 'professors', 'students', 'turmas', 'aulas', 
        'instrumentos', 'conquistas', 'modulos', 'devotionals',
        'user_achievements', 'user_progress', 'files'
    ]
    
    print("\n🔍 EXPLORANDO TABELAS CONHECIDAS:")
    print("=" * 40)
    
    tables_found = []
    
    for table in known_tables:
        print(f"\n📋 Verificando tabela: {table}")
        structure = explore_table_structure(supabase, table)
        if structure:
            tables_found.append(table)
        else:
            print(f"❌ Tabela {table} não encontrada ou sem dados")
    
    print(f"\n✅ TABELAS ENCONTRADAS: {tables_found}")
    
    return tables_found

if __name__ == "__main__":
    tables_found = main()