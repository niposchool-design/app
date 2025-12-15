-- ========================================
-- RELATÓRIO COMPLETO DO BANCO DE DADOS
-- História da Música - Nipo School
-- ========================================
-- NOTA: Execute LIMPAR_E_CORRIGIR_HISTORIA.sql ANTES deste script
-- ========================================

-- ========================================
-- 1. RELATÓRIO DE PERÍODOS
-- ========================================
SELECT '========================================' AS separador;
SELECT 'PERÍODOS HISTÓRICOS' AS secao;
SELECT '========================================' AS separador;

SELECT 
  nome,
  periodo_inicio || ' - ' || periodo_fim AS periodo,
  ordem_cronologica AS ordem,
  (SELECT COUNT(*) FROM historia_compositores WHERE periodo_id = hp.id) AS compositores,
  (SELECT COUNT(*) FROM historia_obras WHERE periodo_id = hp.id) AS obras
FROM historia_periodos hp
WHERE ativo = true
ORDER BY periodo_inicio;

| nome                            | periodo     | ordem | compositores | obras |
| ------------------------------- | ----------- | ----- | ------------ | ----- |
| Medieval                        | 500 - 1400  | 1     | 0            | 0     |
| Período Heian (Japão)           | 794 - 1185  | 13    | 0            | 0     |
| Período Kamakura (Japão)        | 1185 - 1333 | 14    | 0            | 0     |
| Renascimento                    | 1400 - 1600 | 2     | 0            | 0     |
| Brasil Colonial                 | 1500 - 1822 | 19    | 0            | 0     |
| Barroco                         | 1600 - 1750 | 3     | 1            | 6     |
| Período Edo (Japão)             | 1603 - 1868 | 15    | 0            | 0     |
| Clássico                        | 1750 - 1820 | 4     | 3            | 5     |
| Romântico                       | 1820 - 1900 | 5     | 12           | 0     |
| Brasil Imperial                 | 1822 - 1889 | 20    | 2            | 2     |
| Era Meiji (Japão)               | 1868 - 1912 | 16    | 0            | 0     |
| Impressionismo                  | 1890 - 1920 | 6     | 1            | 0     |
| Jazz                            | 1895 - 2024 | 9     | 0            | 0     |
| Modernismo                      | 1900 - 1950 | 7     | 3            | 0     |
| Era do Rádio (Brasil)           | 1930 - 1950 | 21    | 0            | 0     |
| Shōwa Pós-Guerra (Japão)        | 1945 - 1989 | 17    | 0            | 0     |
| Rock e Música Popular           | 1950 - 2024 | 12    | 0            | 0     |
| Contemporâneo                   | 1950 - 2024 | 8     | 0            | 0     |
| Bossa Nova                      | 1958 - 1970 | 11    | 3            | 2     |
| MPB - Música Popular Brasileira | 1960 - 2024 | 10    | 0            | 0     |
| MPB e Tropicália                | 1965 - 1980 | 22    | 3            | 3     |
| Música Brasileira Contemporânea | 1980 - 2025 | 23    | 0            | 0     |
| J-Pop Contemporâneo             | 1990 - 2025 | 18    | 3            | 3     |



-- ========================================
-- 3. COMPOSITORES POR PAÍS
-- ========================================
SELECT '========================================' AS separador;
SELECT 'COMPOSITORES POR PAÍS' AS secao;
SELECT '========================================' AS separador;

SELECT 
  COALESCE(pais_nascimento, 'Desconhecido') AS pais,
  COUNT(*) AS total_compositores,
  STRING_AGG(nome_artistico, ', ' ORDER BY nome_artistico) AS nomes
FROM historia_compositores
WHERE ativo = true
GROUP BY pais_nascimento
ORDER BY COUNT(*) DESC;

| pais                                    | total_compositores | nomes                                                                                                                                                           |
| --------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brasil                                  | 10                 | Caetano Veloso, Carlos Gomes, Chico Buarque, Chiquinha Gonzaga, Gilberto Gil, Milton Nascimento, Pixinguinha, Tom Jobim, Vinicius de Moraes, Vinicius de Moraes |
| Japão                                   | 7                  | Joe Hisaishi, Kanno, Sakamoto, Takemitsu, Taki, Yamada, Yatsuhashi                                                                                              |
| Alemanha                                | 6                  | Beethoven, J.S. Bach, Mendelssohn, Wagner                                                                                                                       |
| Áustria                                 | 3                  | Papa Haydn, Rei da Valsa, W.A. Mozart                                                                                                                           |
| Rússia                                  | 2                  | Rachmaninoff, Tchaikovsky                                                                                                                                       |
| Itália                                  | 2                  | Puccini, Verdi                                                                                                                                                  |
| Hungria                                 | 2                  | Bartók                                                                                                                                                          |
| Rússia/URSS                             | 1                  | Shostakovich                                                                                                                                                    |
| Estados Unidos                          | 1                  | null                                                                                                                                                            |
| França                                  | 1                  | Debussy                                                                                                                                                         |
| Império Austro-Húngaro (atual Tchéquia) | 1                  | null                                                                                                                                                            |
| Polônia                                 | 1                  | Chopin                                                                                                                                                          |



-- ========================================
-- 4. COMPOSITORES SEM PERÍODO
-- ========================================
SELECT '========================================' AS separador;
SELECT 'COMPOSITORES SEM PERÍODO DEFINIDO' AS secao;
SELECT '========================================' AS separador;

SELECT 
  nome_completo,
  nome_artistico,
  pais_nascimento,
  EXTRACT(YEAR FROM data_nascimento) AS ano_nascimento
FROM historia_compositores
WHERE periodo_id IS NULL AND ativo = true
ORDER BY data_nascimento;


| nome_completo                     | nome_artistico    | pais_nascimento | ano_nascimento |
| --------------------------------- | ----------------- | --------------- | -------------- |
| Yatsuhashi Kengyō                 | Yatsuhashi        | Japão           | 1614           |
| Rentarō Taki                      | Taki              | Japão           | 1879           |
| Kōsaku Yamada                     | Yamada            | Japão           | 1886           |
| Alfredo da Rocha Viana Filho      | Pixinguinha       | Brasil          | 1897           |
| Tōru Takemitsu                    | Takemitsu         | Japão           | 1930           |
| Milton Silva Campos do Nascimento | Milton Nascimento | Brasil          | 1942           |



-- ========================================
-- 5. OBRAS SEM COMPOSITOR
-- ========================================
SELECT '========================================' AS separador;
SELECT 'OBRAS SEM COMPOSITOR' AS secao;
SELECT '========================================' AS separador;

SELECT 
  titulo,
  ano_composicao,
  tipo_obra,
  genero
FROM historia_obras
WHERE compositor_id IS NULL AND ativo = true
ORDER BY ano_composicao;


| titulo             | ano_composicao | tipo_obra             | genero               |
| ------------------ | -------------- | --------------------- | -------------------- |
| Canon em Ré maior  | 1680           | Câmara                | Instrumental         |
| As Quatro Estações | 1725           | Concerto para Violino | Barroca Programática |
| Messias            | 1741           | Oratório              | Sacro                |



-- ========================================
-- 6. GÊNEROS POR PERÍODO
-- ========================================
SELECT '========================================' AS separador;
SELECT 'GÊNEROS MUSICAIS' AS secao;
SELECT '========================================' AS separador;

SELECT 
  hg.nome AS genero,
  hp.nome AS periodo_origem,
  hg.pais_origem,
  hg.decada_origem
FROM historia_generos hg
LEFT JOIN historia_periodos hp ON hg.periodo_origem_id = hp.id
WHERE hg.ativo = true
ORDER BY hg.nome;

| genero             | periodo_origem           | pais_origem                | decada_origem |
| ------------------ | ------------------------ | -------------------------- | ------------- |
| Afrobeat           | null                     | Nigéria                    | 1970          |
| Balada             | Romântico                | null                       | null          |
| Blues              | null                     | Estados Unidos             | 1890          |
| Bossa Nova         | null                     | Brasil                     | 1958          |
| Cantata            | null                     | Alemanha/Itália            | 1650          |
| Choro              | Brasil Imperial          | null                       | null          |
| Concerto           | Barroco                  | null                       | null          |
| Enka               | Shōwa Pós-Guerra (Japão) | null                       | null          |
| Forró              | null                     | Brasil                     | 1940          |
| Fuga               | Barroco                  | null                       | null          |
| Gagaku             | Período Heian (Japão)    | null                       | null          |
| Hip-Hop            | null                     | Estados Unidos             | 1973          |
| Jazz               | null                     | Estados Unidos             | 1890          |
| J-Pop              | J-Pop Contemporâneo      | null                       | null          |
| MPB                | null                     | Brasil                     | 1965          |
| Música de Câmara   | null                     | Áustria                    | 1750          |
| Música Eletrônica  | null                     | Alemanha/EUA               | 1970          |
| Noturno            | Romântico                | null                       | null          |
| Ópera              | Barroco                  | null                       | null          |
| Oratório           | null                     | Itália                     | 1650          |
| Poema Sinfônico    | Romântico                | null                       | null          |
| Pop                | null                     | Estados Unidos/Reino Unido | 1950          |
| Prelúdio           | Barroco                  | null                       | null          |
| Quarteto de Cordas | Clássico                 | null                       | null          |
| Reggae             | null                     | Jamaica                    | 1968          |
| Rock               | null                     | Estados Unidos/Reino Unido | 1950          |
| Samba              | null                     | Brasil                     | 1910          |
| Sinfonia           | Clássico                 | null                       | null          |
| Sinfonia Coral     | Romântico                | null                       | null          |
| Sonata             | Clássico                 | null                       | null          |
| Suíte              | Barroco                  | null                       | null          |
| Tropicália         | MPB e Tropicália         | null                       | null          |



-- ========================================
-- 7. TOP 10 COMPOSITORES MAIS PRODUTIVOS
-- ========================================
SELECT '========================================' AS separador;
SELECT 'TOP 10 COMPOSITORES MAIS PRODUTIVOS' AS secao;
SELECT '========================================' AS separador;

SELECT 
  hc.nome_artistico,
  hc.pais_nascimento,
  hp.nome AS periodo,
  COUNT(ho.id) AS total_obras
FROM historia_compositores hc
LEFT JOIN historia_obras ho ON ho.compositor_id = hc.id
LEFT JOIN historia_periodos hp ON hc.periodo_id = hp.id
WHERE hc.ativo = true
GROUP BY hc.id, hc.nome_artistico, hc.pais_nascimento, hp.nome
HAVING COUNT(ho.id) > 0
ORDER BY COUNT(ho.id) DESC
LIMIT 10;

| nome_artistico | pais_nascimento | periodo             | total_obras |
| -------------- | --------------- | ------------------- | ----------- |
| J.S. Bach      | Alemanha        | Barroco             | 3           |
| Beethoven      | Alemanha        | Clássico            | 2           |
| Tom Jobim      | Brasil          | Bossa Nova          | 2           |
| W.A. Mozart    | Áustria         | Clássico            | 2           |
| Gilberto Gil   | Brasil          | MPB e Tropicália    | 1           |
| Takemitsu      | Japão           | null                | 1           |
| Taki           | Japão           | null                | 1           |
| Joe Hisaishi   | Japão           | J-Pop Contemporâneo | 1           |
| Caetano Veloso | Brasil          | MPB e Tropicália    | 1           |
| Chico Buarque  | Brasil          | MPB e Tropicália    | 1           |



-- ========================================
-- 8. TIMELINE COMPLETA (DATAS)
-- ========================================
SELECT '========================================' AS separador;
SELECT 'TIMELINE CRONOLÓGICA' AS secao;
SELECT '========================================' AS separador;

SELECT 
  ano_composicao AS ano,
  titulo AS evento,
  'Obra' AS tipo,
  (SELECT nome_artistico FROM historia_compositores WHERE id = compositor_id) AS autor
FROM historia_obras
WHERE ano_composicao IS NOT NULL AND ativo = true
UNION ALL
SELECT 
  EXTRACT(YEAR FROM data_nascimento)::INTEGER AS ano,
  'Nascimento de ' || nome_artistico AS evento,
  'Compositor' AS tipo,
  pais_nascimento AS autor
FROM historia_compositores
WHERE data_nascimento IS NOT NULL AND ativo = true
ORDER BY ano;

| ano  | evento                                      | tipo       | autor                                   |
| ---- | ------------------------------------------- | ---------- | --------------------------------------- |
| 1614 | Nascimento de Yatsuhashi                    | Compositor | Japão                                   |
| 1614 | Rokudan no Shirabe                          | Obra       | Yatsuhashi                              |
| 1680 | Canon em Ré maior                           | Obra       | null                                    |
| 1685 | Nascimento de J.S. Bach                     | Compositor | Alemanha                                |
| 1704 | Toccata e Fuga em Ré menor                  | Obra       | J.S. Bach                               |
| 1721 | Concertos de Brandemburgo                   | Obra       | J.S. Bach                               |
| 1722 | O Cravo Bem Temperado                       | Obra       | J.S. Bach                               |
| 1725 | As Quatro Estações                          | Obra       | null                                    |
| 1732 | Nascimento de Papa Haydn                    | Compositor | Áustria                                 |
| 1741 | Messias                                     | Obra       | null                                    |
| 1756 | Nascimento de W.A. Mozart                   | Compositor | Áustria                                 |
| 1770 | Nascimento de Beethoven                     | Compositor | Alemanha                                |
| 1787 | Pequena Serenata Noturna                    | Obra       | W.A. Mozart                             |
| 1788 | Sinfonia nº 40 em Sol menor                 | Obra       | W.A. Mozart                             |
| 1798 | A Criação                                   | Obra       | Papa Haydn                              |
| 1808 | Sinfonia nº 5 em Dó menor                   | Obra       | Beethoven                               |
| 1809 | Nascimento de Mendelssohn                   | Compositor | Alemanha                                |
| 1810 | null                                        | Compositor | Alemanha                                |
| 1810 | Nascimento de Chopin                        | Compositor | Polônia                                 |
| 1811 | null                                        | Compositor | Hungria                                 |
| 1813 | Nascimento de Wagner                        | Compositor | Alemanha                                |
| 1813 | Nascimento de Verdi                         | Compositor | Itália                                  |
| 1824 | Sinfonia nº 9 em Ré menor (Coral)           | Obra       | Beethoven                               |
| 1825 | Nascimento de Rei da Valsa                  | Compositor | Áustria                                 |
| 1833 | null                                        | Compositor | Alemanha                                |
| 1836 | Nascimento de Carlos Gomes                  | Compositor | Brasil                                  |
| 1840 | Nascimento de Tchaikovsky                   | Compositor | Rússia                                  |
| 1847 | Nascimento de Chiquinha Gonzaga             | Compositor | Brasil                                  |
| 1858 | Nascimento de Puccini                       | Compositor | Itália                                  |
| 1860 | null                                        | Compositor | Império Austro-Húngaro (atual Tchéquia) |
| 1862 | Nascimento de Debussy                       | Compositor | França                                  |
| 1870 | Il Guarany (Ópera)                          | Obra       | Carlos Gomes                            |
| 1873 | Nascimento de Rachmaninoff                  | Compositor | Rússia                                  |
| 1879 | Nascimento de Taki                          | Compositor | Japão                                   |
| 1881 | Nascimento de Bartók                        | Compositor | Hungria                                 |
| 1886 | Nascimento de Yamada                        | Compositor | Japão                                   |
| 1897 | Nascimento de Pixinguinha                   | Compositor | Brasil                                  |
| 1899 | Ó Abre Alas                                 | Obra       | Chiquinha Gonzaga                       |
| 1900 | null                                        | Compositor | Estados Unidos                          |
| 1901 | Kōjō no Tsuki (Lua sobre Castelo em Ruínas) | Obra       | Taki                                    |
| 1906 | Nascimento de Shostakovich                  | Compositor | Rússia/URSS                             |
| 1913 | Nascimento de Vinicius de Moraes            | Compositor | Brasil                                  |
| 1913 | Nascimento de Vinicius de Moraes            | Compositor | Brasil                                  |
| 1917 | Carinhoso                                   | Obra       | Pixinguinha                             |
| 1927 | Nascimento de Tom Jobim                     | Compositor | Brasil                                  |
| 1930 | Nascimento de Takemitsu                     | Compositor | Japão                                   |
| 1942 | Nascimento de Milton Nascimento             | Compositor | Brasil                                  |
| 1942 | Nascimento de Caetano Veloso                | Compositor | Brasil                                  |
| 1942 | Nascimento de Gilberto Gil                  | Compositor | Brasil                                  |
| 1944 | Nascimento de Chico Buarque                 | Compositor | Brasil                                  |
| 1950 | Nascimento de Joe Hisaishi                  | Compositor | Japão                                   |
| 1952 | Nascimento de Sakamoto                      | Compositor | Japão                                   |
| 1962 | Garota de Ipanema (The Girl from Ipanema)   | Obra       | Tom Jobim                               |
| 1963 | Nascimento de Kanno                         | Compositor | Japão                                   |
| 1967 | November Steps                              | Obra       | Takemitsu                               |
| 1967 | Travessia                                   | Obra       | Milton Nascimento                       |
| 1968 | Tropicália                                  | Obra       | Caetano Veloso                          |
| 1969 | Aquele Abraço                               | Obra       | Gilberto Gil                            |
| 1971 | Construção                                  | Obra       | Chico Buarque                           |
| 1972 | Águas de Março                              | Obra       | Tom Jobim                               |
| 1983 | Merry Christmas Mr. Lawrence                | Obra       | Sakamoto                                |
| 1988 | Tonari no Totoro - Tema Principal           | Obra       | Joe Hisaishi                            |
| 1998 | Tank!                                       | Obra       | Kanno                                   |



-- ========================================
-- 9. ESTATÍSTICAS GERAIS
-- ========================================
SELECT '========================================' AS separador;
SELECT 'ESTATÍSTICAS GERAIS' AS secao;
SELECT '========================================' AS separador;

SELECT 
  'Períodos' AS categoria,
  COUNT(*) AS total
FROM historia_periodos
WHERE ativo = true
UNION ALL
SELECT 'Compositores', COUNT(*) FROM historia_compositores WHERE ativo = true
UNION ALL
SELECT 'Obras', COUNT(*) FROM historia_obras WHERE ativo = true
UNION ALL
SELECT 'Gêneros', COUNT(*) FROM historia_generos WHERE ativo = true;

| categoria    | total |
| ------------ | ----- |
| Períodos     | 23    |
| Compositores | 37    |
| Obras        | 26    |
| Gêneros      | 32    |


-- ========================================
-- 10. DADOS INCOMPLETOS (NECESSITAM ATENÇÃO)
-- ========================================
SELECT '========================================' AS separador;
SELECT 'DADOS QUE NECESSITAM CORREÇÃO' AS secao;
SELECT '========================================' AS separador;

SELECT 'Compositores sem período' AS problema, COUNT(*) AS quantidade
FROM historia_compositores WHERE periodo_id IS NULL AND ativo = true
UNION ALL
SELECT 'Obras sem compositor', COUNT(*) FROM historia_obras WHERE compositor_id IS NULL AND ativo = true
UNION ALL
SELECT 'Compositores sem biografia', COUNT(*) FROM historia_compositores WHERE biografia_completa IS NULL AND ativo = true
UNION ALL
SELECT 'Obras sem descrição', COUNT(*) FROM historia_obras WHERE descricao IS NULL AND ativo = true
UNION ALL
SELECT 'Gêneros sem período', COUNT(*) FROM historia_generos WHERE periodo_origem_id IS NULL AND ativo = true;

| problema                   | quantidade |
| -------------------------- | ---------- |
| Compositores sem período   | 6          |
| Obras sem compositor       | 3          |
| Compositores sem biografia | 0          |
| Obras sem descrição        | 0          |
| Gêneros sem período        | 15         |

-- ========================================
-- FIM DO RELATÓRIO
-- ========================================
SELECT '========================================' AS separador;
SELECT 'RELATÓRIO CONCLUÍDO' AS status;
SELECT '========================================' AS separador;
