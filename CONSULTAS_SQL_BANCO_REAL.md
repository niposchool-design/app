# 🔍 CONSULTAS SQL PARA VERIFICAR DADOS REAIS DO BANCO

## 📋 **ESTRUTURA REAL IDENTIFICADA:**

Com base no documento `banco_de_dados_completo.md`, a estrutura correta é:

- **`auth.users`** - usuários com `tipo_usuario` nos metadados
- **`profiles`** - perfis básicos (SEM `tipo_usuario`)
- **`alunos`** - tabela específica para alunos
- **`professores`** - tabela específica para professores

## 🧪 **CONSULTAS SQL PARA EXECUTAR NO SUPABASE:**

### **1. Verificar todos os usuários cadastrados:**
```sql
SELECT 
    id,
    email,
    raw_user_meta_data,
    raw_user_meta_data ->> 'tipo_usuario' as tipo_usuario,
    raw_user_meta_data ->> 'full_name' as full_name,
    raw_user_meta_data ->> 'instrument' as instrument,
    created_at,
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;


| id                                   | email                             | raw_user_meta_data                                                                                                                                                                                                                                                                                                                                        | tipo_usuario | full_name                            | instrument | created_at                    | last_sign_in_at               |
| ------------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------ | ---------- | ----------------------------- | ----------------------------- |
| e64310ba-69bb-41e5-8174-b8d52432f735 | cavalcante.karen@hotmail.com      | {"sub":"e64310ba-69bb-41e5-8174-b8d52432f735","email":"cavalcante.karen@hotmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                        | null         | null                                 | null       | 2025-07-01 16:50:59.550148+00 | 2025-07-01 16:51:19.053424+00 |
| 46e25388-417a-4d84-9f3d-fb59c804304d | rabelodamanivalda@gmail.com       | {"sub":"46e25388-417a-4d84-9f3d-fb59c804304d","email":"rabelodamanivalda@gmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                         | null         | null                                 | null       | 2025-06-21 16:48:50.607924+00 | 2025-06-21 16:49:26.564972+00 |
| ae514bfc-c915-473d-bb40-de3b0323e79e | jomigas30@gmail.com               | {"sub":"ae514bfc-c915-473d-bb40-de3b0323e79e","email":"jomigas30@gmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                                 | null         | null                                 | null       | 2025-06-20 01:21:07.760718+00 | 2025-06-20 01:36:55.643425+00 |
| a5f0b00a-4c68-4c01-b459-ea55d3ab6907 | ph1goleiro@gmail.com              | {"sub":"a5f0b00a-4c68-4c01-b459-ea55d3ab6907","email":"ph1goleiro@gmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                                | null         | null                                 | null       | 2025-06-19 15:18:01.174011+00 | 2025-06-28 19:02:43.179441+00 |
| 9bbcbdbd-b478-43ab-afa5-ddec11d3a63c | malu.apfernandes23@gmail.com      | {"sub":"9bbcbdbd-b478-43ab-afa5-ddec11d3a63c","email":"malu.apfernandes23@gmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                        | null         | null                                 | null       | 2025-06-14 15:32:26.287695+00 | 2025-08-08 00:58:03.216845+00 |
| 550a3a3f-9898-4e9c-b620-dd4b6ebaa8c4 | cavalcante.gustavo@hotmail.com    | {"sub":"550a3a3f-9898-4e9c-b620-dd4b6ebaa8c4","email":"cavalcante.gustavo@hotmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                      | null         | null                                 | null       | 2025-06-11 01:02:14.154476+00 | 2025-06-11 01:08:51.284909+00 |
| 07f4a049-faf4-4852-8512-6ef64f2966ff | larissa.nunesds0505@gmail.com     | {"sub":"07f4a049-faf4-4852-8512-6ef64f2966ff","email":"larissa.nunesds0505@gmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                       | null         | null                                 | null       | 2025-06-11 00:50:26.879006+00 | 2025-06-11 00:59:33.39298+00  |
| 953666c4-4b76-4d52-8332-6be7323c0f55 | gianne.formis@gmail.com           | {"sub":"953666c4-4b76-4d52-8332-6be7323c0f55","email":"gianne.formis@gmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                             | null         | null                                 | null       | 2025-06-09 20:16:03.832046+00 | 2025-06-09 20:17:03.494566+00 |
| 1dc09e87-282c-47a9-b0b8-6f84d79f300c | monicaquagliarelo@gmail.com       | {"sub":"1dc09e87-282c-47a9-b0b8-6f84d79f300c","email":"monicaquagliarelo@gmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                         | null         | null                                 | null       | 2025-06-09 20:11:56.983797+00 | 2025-07-01 16:50:33.470844+00 |
| 491b7c68-00d0-4154-adb7-80fcb73a72e4 | oticastatymello@gmail.com         | {"dob":"1978-09-06","sub":"491b7c68-00d0-4154-adb7-80fcb73a72e4","email":"oticastatymello@gmail.com","full_name":"testes teste","instrument":"euphonium","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":false,"phone_verified":false,"theme_preference":"light","notification_enabled":true}                        | aluno        | testes teste                         | euphonium  | 2025-06-09 19:45:22.301244+00 | null                          |
| 7558a9c8-67c7-4c88-968e-f6a5e193d48c | tgjphotos@gmail.com               | {"sub":"7558a9c8-67c7-4c88-968e-f6a5e193d48c","email":"tgjphotos@gmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                                 | null         | null                                 | null       | 2025-06-09 17:11:05.927293+00 | 2025-09-26 22:27:36.536874+00 |
| 509052e4-5f3a-41df-bf48-f46b6f3cc108 | junior_sax@hotmail.com            | {"sub":"509052e4-5f3a-41df-bf48-f46b6f3cc108","email":"junior_sax@hotmail.com","email_verified":true,"phone_verified":false}                                                                                                                                                                                                                              | null         | null                                 | null       | 2025-06-09 16:00:37.991955+00 | 2025-09-26 22:29:52.31259+00  |
| 41f409ee-1614-4bc6-8cce-a02086601dc9 | nilsondepereira@gmail.com         | {"dob":"1970-07-14","sub":"41f409ee-1614-4bc6-8cce-a02086601dc9","email":"nilsondepereira@gmail.com","full_name":"Nilson Dionisio Pereira","instrument":"saxofone","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}               | aluno        | Nilson Dionisio Pereira              | saxofone   | 2025-05-31 01:41:53.970073+00 | 2025-05-31 01:42:26.86463+00  |
| 5e31da6f-9ce6-4345-a056-efc5719039f0 | priscilasouza.musica@gmail.com    | {"dob":"1981-11-17","sub":"5e31da6f-9ce6-4345-a056-efc5719039f0","email":"priscilasouza.musica@gmail.com","full_name":"Priscila Souza","instrument":"violoncelo","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}                 | aluno        | Priscila Souza                       | violoncelo | 2025-05-30 13:18:25.529455+00 | 2025-05-30 13:43:48.958361+00 |
| 229c0858-c758-4993-abb3-cb7d13b01b76 | silasdiego49@gmail.com            | {"dob":"1991-09-08","sub":"229c0858-c758-4993-abb3-cb7d13b01b76","email":"silasdiego49@gmail.com","full_name":"Silas Diego da Conceição ","instrument":"violino","user_level":"beginner","tipo_usuario":"professor","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}             | professor    | Silas Diego da Conceição             | violino    | 2025-05-29 18:30:33.111767+00 | 2025-05-29 18:31:27.553335+00 |
| 4d0b00fd-dbb6-4941-9093-61ab7d7b1122 | reinaldo23carla@gmail.com         | {"dob":"1985-06-23","sub":"4d0b00fd-dbb6-4941-9093-61ab7d7b1122","email":"reinaldo23carla@gmail.com","full_name":"Reinaldo Barros dos Santos ","instrument":"outro","user_level":"beginner","tipo_usuario":"professor","sound_enabled":true,"email_verified":false,"phone_verified":false,"theme_preference":"light","notification_enabled":true}         | professor    | Reinaldo Barros dos Santos           | outro      | 2025-05-29 15:07:38.528604+00 | null                          |
| 5697f078-c2f5-4da6-bb6c-db9ec9764d41 | jessica.silva23101108@gmail.com   | {"dob":"2013-10-23","sub":"5697f078-c2f5-4da6-bb6c-db9ec9764d41","email":"jessica.silva23101108@gmail.com","full_name":"Maria Luiza Aparecida Fernandes ","instrument":"violino","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true} | aluno        | Maria Luiza Aparecida Fernandes      | violino    | 2025-05-29 14:35:35.382339+00 | 2025-05-29 14:35:54.346477+00 |
| c91f1974-e102-46dd-b1c3-ba3f06c039af | bbacelar05@gmail.com              | {"dob":"2017-02-22","sub":"c91f1974-e102-46dd-b1c3-ba3f06c039af","email":"bbacelar05@gmail.com","full_name":"Millena Bacelar de Souza Quagliarelo","instrument":"flauta","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}         | aluno        | Millena Bacelar de Souza Quagliarelo | flauta     | 2025-05-29 13:26:14.291021+00 | 2025-05-31 13:39:22.347321+00 |
| b37a40d9-ba6c-465f-abfc-c441b47edb4d | mleonoroliver@gmail.com           | {"dob":"1967-10-18","sub":"b37a40d9-ba6c-465f-abfc-c441b47edb4d","email":"mleonoroliver@gmail.com","full_name":"Maria Leonor dos Santos Oliveira ","instrument":"flauta","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":false,"phone_verified":false,"theme_preference":"light","notification_enabled":true}        | aluno        | Maria Leonor dos Santos Oliveira     | flauta     | 2025-05-28 03:45:05.105614+00 | null                          |
| 1f63bfc3-62d7-48cb-b497-6699cb7d2037 | barrosmariana708@gmail.com        | {"dob":"2011-01-14","sub":"1f63bfc3-62d7-48cb-b497-6699cb7d2037","email":"barrosmariana708@gmail.com","full_name":"Mariana Barros dos Santos ","instrument":"flauta","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}             | aluno        | Mariana Barros dos Santos            | flauta     | 2025-05-28 00:36:11.827381+00 | 2025-05-28 00:37:13.043721+00 |
| 8483907a-5521-43b1-b824-5068b02a2872 | mkgomes.r1499@gmail.com           | {"dob":"1993-01-29","sub":"8483907a-5521-43b1-b824-5068b02a2872","email":"mkgomes.r1499@gmail.com","full_name":"Mike Rodrigues Gomes ","instrument":"bateria","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}                    | aluno        | Mike Rodrigues Gomes                 | bateria    | 2025-05-27 22:55:28.358563+00 | 2025-05-27 23:52:46.102441+00 |
| a57eeb22-a246-4243-8e32-98297c6f3bad | nicollymellodecamargo2@gmail.com  | {"dob":"2013-06-07","sub":"a57eeb22-a246-4243-8e32-98297c6f3bad","email":"nicollymellodecamargo2@gmail.com","full_name":"Nicolly Mello de Camargo ","instrument":"teclado","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}       | aluno        | Nicolly Mello de Camargo             | teclado    | 2025-05-27 22:08:47.914966+00 | 2025-06-04 16:01:34.44535+00  |
| 9064ab32-12ce-415a-8c19-51b566608ee5 | giovannamellodecamargo2@gmail.com | {"dob":"2003-12-03","sub":"9064ab32-12ce-415a-8c19-51b566608ee5","email":"giovannamellodecamargo2@gmail.com","full_name":"Giovanna Mello de Camargo","instrument":"violoncelo","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}   | aluno        | Giovanna Mello de Camargo            | violoncelo | 2025-05-27 20:38:51.629168+00 | 2025-06-15 19:17:10.075027+00 |
| 840f99c4-7479-4098-9c2e-474a695178f0 | jcarlos0710@gmail.com             | {"dob":"1972-10-07","sub":"840f99c4-7479-4098-9c2e-474a695178f0","email":"jcarlos0710@gmail.com","full_name":"Jose Carlos Oliveira","instrument":"trompete","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}                      | aluno        | Jose Carlos Oliveira                 | trompete   | 2025-05-27 18:56:17.455489+00 | 2025-05-27 18:56:45.097572+00 |
| 54e79a05-59f7-4cc8-b67f-f522a1b452e4 | taty.mello0607@gmail.com          | {"dob":"1979-07-07","sub":"54e79a05-59f7-4cc8-b67f-f522a1b452e4","email":"taty.mello0607@gmail.com","full_name":"Tatiana mello","instrument":"flauta","user_level":"beginner","tipo_usuario":"aluno","sound_enabled":true,"email_verified":true,"phone_verified":false,"theme_preference":"light","notification_enabled":true}                            | aluno        | Tatiana mello                        | flauta     | 2025-05-27 15:52:58.71251+00  | 2025-06-15 20:05:19.33519+00  |
| 2becf8d3-866a-4948-a4dd-d80395372ce1 | junior.sax@gmail.com              | {"dob":"1978-09-06","sub":"2becf8d3-866a-4948-a4dd-d80395372ce1","email":"junior.sax@gmail.com","full_name":"junior","instrument":"Sax","tipo_usuario":"aluno","email_verified":true,"phone_verified":false}                                                                                                                                              | aluno        | junior                               | Sax        | 2025-05-26 18:44:12.913736+00 | 2025-09-26 22:37:41.499295+00 |
```

### **2. Verificar tabela profiles:**
```sql
SELECT 
    id,
    email,
    full_name,
    dob,
    instrument,
    avatar_url,
    user_level,
    total_points,
    current_streak,
    best_streak,
    lessons_completed,
    modules_completed,
    theme_preference,
    notification_enabled,
    sound_enabled,
    has_voted,
    joined_at,
    last_active,
    city,
    state
FROM profiles
ORDER BY joined_at DESC;


| id                                   | email                             | full_name                            | dob        | instrument | avatar_url | user_level | total_points | current_streak | best_streak | lessons_completed | modules_completed | theme_preference | notification_enabled | sound_enabled | has_voted | joined_at                     | last_active                   | city | state |
| ------------------------------------ | --------------------------------- | ------------------------------------ | ---------- | ---------- | ---------- | ---------- | ------------ | -------------- | ----------- | ----------------- | ----------------- | ---------------- | -------------------- | ------------- | --------- | ----------------------------- | ----------------------------- | ---- | ----- |
| e64310ba-69bb-41e5-8174-b8d52432f735 | cavalcante.karen@hotmail.com      | Karen Cavalcante Pelegrino           | 1995-12-08 | teclado    | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-07-01 16:51:02.41944+00  | 2025-07-01 16:51:02.41944+00  | null | null  |
| 46e25388-417a-4d84-9f3d-fb59c804304d | rabelodamanivalda@gmail.com       | Nivalda rabelo Dama                  | 1958-12-20 | violao     | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-06-21 16:48:53.131711+00 | 2025-06-21 16:49:48.91513+00  | null | null  |
| ae514bfc-c915-473d-bb40-de3b0323e79e | jomigas30@gmail.com               | José Miguel de Oliveira              | 1947-04-30 | teclado    | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-06-20 01:21:10.780943+00 | 2025-06-20 01:21:10.780943+00 | null | null  |
| a5f0b00a-4c68-4c01-b459-ea55d3ab6907 | ph1goleiro@gmail.com              | Pedro Henrique de Camargo Lorena     | 2008-12-27 | fagote     | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-06-19 15:18:03.825834+00 | 2025-06-19 15:18:03.825834+00 | null | null  |
| 9bbcbdbd-b478-43ab-afa5-ddec11d3a63c | malu.apfernandes23@gmail.com      | Maria Luiza                          | 2013-10-23 | violino    | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-06-14 15:32:28.662798+00 | 2025-06-14 16:37:16.48325+00  | null | null  |
| 550a3a3f-9898-4e9c-b620-dd4b6ebaa8c4 | cavalcante.gustavo@hotmail.com    | Gustavo Cavalcante dos Santos        | 2001-11-20 | teclado    | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-06-11 01:02:16.340282+00 | 2025-06-11 01:09:48.212063+00 | null | null  |
| 07f4a049-faf4-4852-8512-6ef64f2966ff | larissa.nunesds0505@gmail.com     | Larissa Nunes                        | 2004-05-05 | violoncelo | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-06-11 00:50:29.254173+00 | 2025-06-11 01:00:01.222324+00 | null | null  |
| 953666c4-4b76-4d52-8332-6be7323c0f55 | gianne.formis@gmail.com           | Kelebe Formis Takeuti                | 2015-02-18 | teclado    | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-06-09 20:16:08.126768+00 | 2025-06-09 20:16:08.126768+00 | null | null  |
| 1dc09e87-282c-47a9-b0b8-6f84d79f300c | monicaquagliarelo@gmail.com       | Monica de Souza Bacelar Quagliarelo  | 1982-07-27 | flauta     | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-06-09 20:11:59.393837+00 | 2025-06-10 21:23:53.746912+00 | null | null  |
| 7558a9c8-67c7-4c88-968e-f6a5e193d48c | tgjphotos@gmail.com               | gilberto junior                      | 1978-09-06 | clarinete  | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-06-09 17:11:08.077555+00 | 2025-06-09 17:12:55.168554+00 | null | null  |
| 509052e4-5f3a-41df-bf48-f46b6f3cc108 | junior_sax@hotmail.com            | Gilberto Junior                      | 1978-09-06 | piano      | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-06-09 16:00:40.395572+00 | 2025-06-09 16:07:25.454873+00 | null | null  |
| 41f409ee-1614-4bc6-8cce-a02086601dc9 | nilsondepereira@gmail.com         | Nilson Dionisio Pereira              | 1970-07-14 | saxofone   | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-05-31 01:41:54.970073+00 | 2025-06-01 19:07:59.81548+00  | null | null  |
| 5e31da6f-9ce6-4345-a056-efc5719039f0 | priscilasouza.musica@gmail.com    | Priscila Souza                       | 1981-11-17 | violoncelo | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-05-30 13:18:26.529455+00 | 2025-06-01 19:37:19.513029+00 | null | null  |
| 229c0858-c758-4993-abb3-cb7d13b01b76 | silasdiego49@gmail.com            | Silas Diego da Conceição             | 1991-09-08 | violino    | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-05-29 18:30:34.111767+00 | 2025-06-01 19:07:59.81548+00  | null | null  |
| 4d0b00fd-dbb6-4941-9093-61ab7d7b1122 | reinaldo23carla@gmail.com         | Reinaldo Barros dos Santos           | 1985-06-23 | outro      | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-05-29 15:07:39.528604+00 | 2025-06-01 19:08:08.556287+00 | null | null  |
| 5697f078-c2f5-4da6-bb6c-db9ec9764d41 | jessica.silva23101108@gmail.com   | Maria Luiza Aparecida Fernandes      | 2013-10-23 | violino    | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-05-29 14:35:36.382339+00 | 2025-06-01 19:07:59.81548+00  | null | null  |
| c91f1974-e102-46dd-b1c3-ba3f06c039af | bbacelar05@gmail.com              | Millena Bacelar de Souza Quagliarelo | 2017-02-22 | flauta     | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-05-29 13:26:15.291021+00 | 2025-06-01 19:07:59.81548+00  | null | null  |
| b37a40d9-ba6c-465f-abfc-c441b47edb4d | mleonoroliver@gmail.com           | Maria Leonor dos Santos Oliveira     | 1967-10-18 | flauta     | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-05-28 03:45:06.105614+00 | 2025-06-01 19:08:08.556287+00 | null | null  |
| 1f63bfc3-62d7-48cb-b497-6699cb7d2037 | barrosmariana708@gmail.com        | Mariana Barros dos Santos            | 2011-01-14 | flauta     | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-05-28 00:36:12.827381+00 | 2025-06-01 19:07:59.81548+00  | null | null  |
| 8483907a-5521-43b1-b824-5068b02a2872 | mkgomes.r1499@gmail.com           | Mike Rodrigues Gomes                 | 1993-01-29 | bateria    | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-05-27 22:55:29.358563+00 | 2025-06-01 19:07:59.81548+00  | null | null  |
| a57eeb22-a246-4243-8e32-98297c6f3bad | nicollymellodecamargo2@gmail.com  | Nicolly Mello de Camargo             | 2013-06-07 | teclado    | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-05-27 22:08:48.914966+00 | 2025-06-04 16:02:04.541869+00 | null | null  |
| 9064ab32-12ce-415a-8c19-51b566608ee5 | giovannamellodecamargo2@gmail.com | Giovanna Mello de Camargo            | 2003-12-03 | violoncelo | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | false     | 2025-05-27 20:38:52.629168+00 | 2025-06-01 19:08:08.556287+00 | null | null  |
| 840f99c4-7479-4098-9c2e-474a695178f0 | jcarlos0710@gmail.com             | Jose Carlos Oliveira                 | 1972-10-07 | trompete   | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-05-27 18:56:18.455489+00 | 2025-06-01 19:07:59.81548+00  | null | null  |
| 54e79a05-59f7-4cc8-b67f-f522a1b452e4 | taty.mello0607@gmail.com          | Tatiana mello                        | 1979-07-07 | flauta     | null       | beginner   | 0            | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-05-27 15:52:59.71251+00  | 2025-06-02 18:42:40.887136+00 | null | null  |
| 2becf8d3-866a-4948-a4dd-d80395372ce1 | junior.sax@gmail.com              | Junior Sax                           | 1978-09-06 | saxofone   | null       | beginner   | 130          | 0              | 0           | 0                 | 0                 | light            | true                 | true          | true      | 2025-05-26 21:27:52.584152+00 | 2025-06-22 15:28:41.561219+00 | null | null  |

```

### **3. Verificar tabela alunos:**
```sql
SELECT 
    a.*,
    p.full_name,
    p.email,
    p.total_points,
    p.current_streak,
    i.nome as instrumento_nome
FROM alunos a
LEFT JOIN profiles p ON a.id = p.id
LEFT JOIN instrumentos i ON a.instrumento_id = i.id
ORDER BY a.data_ingresso DESC;


| id                                   | instrumento | nivel    | turma | data_ingresso | ativo | criado_em                  | instrumento_id                       | turma_principal_id                   | full_name                            | email                             | total_points | current_streak | instrumento_nome |
| ------------------------------------ | ----------- | -------- | ----- | ------------- | ----- | -------------------------- | ------------------------------------ | ------------------------------------ | ------------------------------------ | --------------------------------- | ------------ | -------------- | ---------------- |
| e64310ba-69bb-41e5-8174-b8d52432f735 | null        | beginner | null  | 2025-07-01    | true  | 2025-07-01 16:51:02.41944  | 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | null                                 | Karen Cavalcante Pelegrino           | cavalcante.karen@hotmail.com      | 0            | 0              | Teclado          |
| 46e25388-417a-4d84-9f3d-fb59c804304d | null        | beginner | null  | 2025-06-21    | true  | 2025-06-21 16:48:53.131711 | 750450cf-e14e-4f02-944e-b3c1bb0f87a4 | null                                 | Nivalda rabelo Dama                  | rabelodamanivalda@gmail.com       | 0            | 0              | Violão           |
| ae514bfc-c915-473d-bb40-de3b0323e79e | null        | beginner | null  | 2025-06-20    | true  | 2025-06-20 01:21:10.780943 | 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | null                                 | José Miguel de Oliveira              | jomigas30@gmail.com               | 0            | 0              | Teclado          |
| a5f0b00a-4c68-4c01-b459-ea55d3ab6907 | null        | beginner | null  | 2025-06-19    | true  | 2025-06-19 15:18:03.825834 | 36b9d36d-f65b-4ba1-89be-4ab3707e874c | null                                 | Pedro Henrique de Camargo Lorena     | ph1goleiro@gmail.com              | 0            | 0              | Fagote           |
| 4d0b00fd-dbb6-4941-9093-61ab7d7b1122 | null        | null     | null  | 2025-06-15    | true  | 2025-06-15 02:42:07.927626 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | null                                 | Reinaldo Barros dos Santos           | reinaldo23carla@gmail.com         | 0            | 0              | Flauta           |
| 9bbcbdbd-b478-43ab-afa5-ddec11d3a63c | null        | beginner | null  | 2025-06-14    | true  | 2025-06-14 15:32:28.662798 | 80436b4f-15c1-452f-9442-34e42b5117e4 | null                                 | Maria Luiza                          | malu.apfernandes23@gmail.com      | 0            | 0              | Violino          |
| 550a3a3f-9898-4e9c-b620-dd4b6ebaa8c4 | null        | beginner | null  | 2025-06-11    | true  | 2025-06-11 01:02:16.340282 | 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | null                                 | Gustavo Cavalcante dos Santos        | cavalcante.gustavo@hotmail.com    | 0            | 0              | Teclado          |
| 07f4a049-faf4-4852-8512-6ef64f2966ff | null        | beginner | null  | 2025-06-11    | true  | 2025-06-11 00:50:29.254173 | 412c40b6-f4fc-4379-9d6f-5ce0ec2d669d | null                                 | Larissa Nunes                        | larissa.nunesds0505@gmail.com     | 0            | 0              | Violoncelo       |
| 7558a9c8-67c7-4c88-968e-f6a5e193d48c | null        | beginner | null  | 2025-06-09    | true  | 2025-06-09 17:11:08.077555 | d7c80fe1-ab43-4920-b2aa-d9b4f3ace166 | null                                 | gilberto junior                      | tgjphotos@gmail.com               | 0            | 0              | Clarinete        |
| 1dc09e87-282c-47a9-b0b8-6f84d79f300c | null        | beginner | null  | 2025-06-09    | true  | 2025-06-09 20:11:59.393837 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | null                                 | Monica de Souza Bacelar Quagliarelo  | monicaquagliarelo@gmail.com       | 0            | 0              | Flauta           |
| 953666c4-4b76-4d52-8332-6be7323c0f55 | null        | beginner | null  | 2025-06-09    | true  | 2025-06-09 20:16:08.126768 | 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | null                                 | Kelebe Formis Takeuti                | gianne.formis@gmail.com           | 0            | 0              | Teclado          |
| 41f409ee-1614-4bc6-8cce-a02086601dc9 | null        | beginner | null  | 2025-05-31    | true  | 2025-05-31 01:41:53.968269 | 26cadf44-6d7b-4f9b-85d6-6b2c40715f45 | null                                 | Nilson Dionisio Pereira              | nilsondepereira@gmail.com         | 0            | 0              | Saxofone         |
| c91f1974-e102-46dd-b1c3-ba3f06c039af | flauta      | beginner | null  | 2025-05-29    | true  | 2025-05-29 13:26:14.287741 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 | Millena Bacelar de Souza Quagliarelo | bbacelar05@gmail.com              | 0            | 0              | Flauta           |
| 5697f078-c2f5-4da6-bb6c-db9ec9764d41 | violino     | beginner | null  | 2025-05-29    | true  | 2025-05-29 14:35:35.381988 | 80436b4f-15c1-452f-9442-34e42b5117e4 | fc0750bd-9ce4-4f1d-8003-3daed93e872a | Maria Luiza Aparecida Fernandes      | jessica.silva23101108@gmail.com   | 0            | 0              | Violino          |
| b37a40d9-ba6c-465f-abfc-c441b47edb4d | flauta      | beginner | null  | 2025-05-28    | true  | 2025-05-28 03:45:05.105179 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 | Maria Leonor dos Santos Oliveira     | mleonoroliver@gmail.com           | 0            | 0              | Flauta           |
| 1f63bfc3-62d7-48cb-b497-6699cb7d2037 | flauta      | beginner | null  | 2025-05-28    | true  | 2025-05-28 00:36:11.827056 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 | Mariana Barros dos Santos            | barrosmariana708@gmail.com        | 0            | 0              | Flauta           |
| 840f99c4-7479-4098-9c2e-474a695178f0 | trompete    | beginner | null  | 2025-05-27    | true  | 2025-05-27 18:56:17.453178 | 509d6a26-159a-4976-aa46-83f914f930aa | null                                 | Jose Carlos Oliveira                 | jcarlos0710@gmail.com             | 0            | 0              | Trompete         |
| 9064ab32-12ce-415a-8c19-51b566608ee5 | violoncelo  | beginner | null  | 2025-05-27    | true  | 2025-05-27 20:38:51.625846 | 412c40b6-f4fc-4379-9d6f-5ce0ec2d669d | null                                 | Giovanna Mello de Camargo            | giovannamellodecamargo2@gmail.com | 0            | 0              | Violoncelo       |
| 8483907a-5521-43b1-b824-5068b02a2872 | null        | beginner | null  | 2025-05-27    | true  | 2025-05-27 22:55:28.357311 | 86f83611-c0db-470c-87e7-31ee81b1a009 | null                                 | Mike Rodrigues Gomes                 | mkgomes.r1499@gmail.com           | 0            | 0              | Bateria          |
| 54e79a05-59f7-4cc8-b67f-f522a1b452e4 | flauta      | beginner | null  | 2025-05-27    | true  | 2025-05-27 15:52:58.712165 | 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | 6b144088-27f3-421a-92be-24a1e4a05661 | Tatiana mello                        | taty.mello0607@gmail.com          | 0            | 0              | Flauta           |
| a57eeb22-a246-4243-8e32-98297c6f3bad | teclado     | beginner | null  | 2025-05-27    | true  | 2025-05-27 22:08:47.91411  | 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | null                                 | Nicolly Mello de Camargo             | nicollymellodecamargo2@gmail.com  | 0            | 0              | Teclado          |
```

### **4. Verificar tabela professores:**
```sql
SELECT 
    prof.*,
    p.full_name,
    p.email,
    p.last_active
FROM professores prof
LEFT JOIN profiles p ON prof.id = p.id
ORDER BY prof.criado_em DESC;


| id                                   | formacao         | biografia            | especialidades      | ativo | criado_em                  | full_name                 | email                          | last_active                   |
| ------------------------------------ | ---------------- | -------------------- | ------------------- | ----- | -------------------------- | ------------------------- | ------------------------------ | ----------------------------- |
| 5e31da6f-9ce6-4345-a056-efc5719039f0 | Educação Musical | Professora de música | ["música","ensino"] | true  | 2025-07-21 01:56:04.691582 | Priscila Souza            | priscilasouza.musica@gmail.com | 2025-06-01 19:37:19.513029+00 |
| 509052e4-5f3a-41df-bf48-f46b6f3cc108 | null             |                      | null                | true  | 2025-06-09 16:00:40.395572 | Gilberto Junior           | junior_sax@hotmail.com         | 2025-06-09 16:07:25.454873+00 |
| 229c0858-c758-4993-abb3-cb7d13b01b76 | null             | null                 | ["violino"]         | true  | 2025-05-29 18:30:33.11142  | Silas Diego da Conceição  | silasdiego49@gmail.com         | 2025-06-01 19:07:59.81548+00  |
| 8483907a-5521-43b1-b824-5068b02a2872 | null             | null                 | ["bateria"]         | true  | 2025-05-27 22:55:28.357311 | Mike Rodrigues Gomes      | mkgomes.r1499@gmail.com        | 2025-06-01 19:07:59.81548+00  |
```

### **5. Verificar instrumentos disponíveis:**
```sql
SELECT 
    id,
    nome,
    categoria,
    ativo,
    created_at retirei da consulta
FROM instrumentos
WHERE ativo = true
ORDER BY categoria, nome;

| id                                   | nome                 | categoria | ativo |
| ------------------------------------ | -------------------- | --------- | ----- |
| 35aff373-706c-47d8-8004-d8edcddb1e0c | Baixo                | corda     | true  |
| b73f1d80-3d73-487e-89b8-ab35274a8dd4 | Contrabaixo Acústico | corda     | true  |
| df49fd27-9bcd-4462-a0f8-b36f0ff9f97f | Guitarra             | corda     | true  |
| 9edff4db-9ef5-43fc-970a-7d2086de223b | Viola Clássica       | corda     | true  |
| 750450cf-e14e-4f02-944e-b3c1bb0f87a4 | Violão               | corda     | true  |
| 80436b4f-15c1-452f-9442-34e42b5117e4 | Violino              | corda     | true  |
| 412c40b6-f4fc-4379-9d6f-5ce0ec2d669d | Violoncelo           | corda     | true  |
| 64b94e98-6ad2-4e7f-9aa0-b57f6bb58df1 | Outro                | outros    | true  |
| 86f83611-c0db-470c-87e7-31ee81b1a009 | Bateria              | percussao | true  |
| 9a5e0eac-114e-4173-90af-32b55c870675 | Percussão Erudita    | percussao | true  |
| d7c80fe1-ab43-4920-b2aa-d9b4f3ace166 | Clarinete            | sopro     | true  |
| 8fbba87d-39e1-4542-b8bb-7c815fdc2b9a | Eufônio              | sopro     | true  |
| 36b9d36d-f65b-4ba1-89be-4ab3707e874c | Fagote               | sopro     | true  |
| 794f42a6-619a-4ca3-8f1b-c3ac7a9e7a08 | Flauta               | sopro     | true  |
| 9b42a23b-ac7f-42e1-8a04-bde4c525fbde | Oboé                 | sopro     | true  |
| 26cadf44-6d7b-4f9b-85d6-6b2c40715f45 | Saxofone             | sopro     | true  |
| 850c53c4-2ed6-4a12-a4ff-3fbaecd6bf73 | Trombone             | sopro     | true  |
| 509d6a26-159a-4976-aa46-83f914f930aa | Trompete             | sopro     | true  |
| 174f6ed4-3c21-444a-acfa-5149f53f2ca0 | Tuba                 | sopro     | true  |
| ab9720a5-1973-484e-9a44-d4aa62594336 | Piano                | teclado   | true  |
| 8bd473f1-7b35-4b9e-869a-17fb73c6e047 | Teclado              | teclado   | true  |
| cca87ab1-8ad4-4876-a8d8-190f85927952 | Teoria Musical       | teoria    | true  |
| 87ee66bf-bb70-4e70-9aa3-4bff514ced4e | Canto                | vocal     | true  |

```

### **6. Contagem geral por tipo:**
```sql
-- Contagem de usuários por tipo (nos metadados)
SELECT 
    raw_user_meta_data ->> 'tipo_usuario' as tipo_usuario,
    COUNT(*) as quantidade
FROM auth.users 
WHERE raw_user_meta_data ->> 'tipo_usuario' IS NOT NULL
GROUP BY raw_user_meta_data ->> 'tipo_usuario';

| tipo_usuario | quantidade |
| ------------ | ---------- |
| professor    | 2          |
| aluno        | 13         |
```

### **7. JOIN completo - todos os dados:**
```sql
SELECT 
    u.id,
    u.email,
    u.raw_user_meta_data ->> 'tipo_usuario' as tipo_usuario,
    u.raw_user_meta_data ->> 'full_name' as nome_auth,
    p.full_name,
    p.instrument,
    p.total_points,
    p.current_streak,
    p.lessons_completed,
    p.modules_completed,
    p.city,
    p.state,
    p.last_active,
    u.created_at as auth_created,
    p.joined_at as profile_joined,
    CASE 
        WHEN a.id IS NOT NULL THEN 'tem_registro_aluno'
        WHEN prof.id IS NOT NULL THEN 'tem_registro_professor' 
        ELSE 'sem_registro_especifico'
    END as status_tabelas_especificas
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
LEFT JOIN alunos a ON u.id = a.id
LEFT JOIN professores prof ON u.id = prof.id
ORDER BY u.created_at DESC;


| id                                   | email                             | tipo_usuario | nome_auth                            | full_name                            | instrument | total_points | current_streak | lessons_completed | modules_completed | city | state | last_active                   | auth_created                  | profile_joined                | status_tabelas_especificas |
| ------------------------------------ | --------------------------------- | ------------ | ------------------------------------ | ------------------------------------ | ---------- | ------------ | -------------- | ----------------- | ----------------- | ---- | ----- | ----------------------------- | ----------------------------- | ----------------------------- | -------------------------- |
| e64310ba-69bb-41e5-8174-b8d52432f735 | cavalcante.karen@hotmail.com      | null         | null                                 | Karen Cavalcante Pelegrino           | teclado    | 0            | 0              | 0                 | 0                 | null | null  | 2025-07-01 16:51:02.41944+00  | 2025-07-01 16:50:59.550148+00 | 2025-07-01 16:51:02.41944+00  | tem_registro_aluno         |
| 46e25388-417a-4d84-9f3d-fb59c804304d | rabelodamanivalda@gmail.com       | null         | null                                 | Nivalda rabelo Dama                  | violao     | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-21 16:49:48.91513+00  | 2025-06-21 16:48:50.607924+00 | 2025-06-21 16:48:53.131711+00 | tem_registro_aluno         |
| ae514bfc-c915-473d-bb40-de3b0323e79e | jomigas30@gmail.com               | null         | null                                 | José Miguel de Oliveira              | teclado    | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-20 01:21:10.780943+00 | 2025-06-20 01:21:07.760718+00 | 2025-06-20 01:21:10.780943+00 | tem_registro_aluno         |
| a5f0b00a-4c68-4c01-b459-ea55d3ab6907 | ph1goleiro@gmail.com              | null         | null                                 | Pedro Henrique de Camargo Lorena     | fagote     | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-19 15:18:03.825834+00 | 2025-06-19 15:18:01.174011+00 | 2025-06-19 15:18:03.825834+00 | tem_registro_aluno         |
| 9bbcbdbd-b478-43ab-afa5-ddec11d3a63c | malu.apfernandes23@gmail.com      | null         | null                                 | Maria Luiza                          | violino    | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-14 16:37:16.48325+00  | 2025-06-14 15:32:26.287695+00 | 2025-06-14 15:32:28.662798+00 | tem_registro_aluno         |
| 550a3a3f-9898-4e9c-b620-dd4b6ebaa8c4 | cavalcante.gustavo@hotmail.com    | null         | null                                 | Gustavo Cavalcante dos Santos        | teclado    | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-11 01:09:48.212063+00 | 2025-06-11 01:02:14.154476+00 | 2025-06-11 01:02:16.340282+00 | tem_registro_aluno         |
| 07f4a049-faf4-4852-8512-6ef64f2966ff | larissa.nunesds0505@gmail.com     | null         | null                                 | Larissa Nunes                        | violoncelo | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-11 01:00:01.222324+00 | 2025-06-11 00:50:26.879006+00 | 2025-06-11 00:50:29.254173+00 | tem_registro_aluno         |
| 953666c4-4b76-4d52-8332-6be7323c0f55 | gianne.formis@gmail.com           | null         | null                                 | Kelebe Formis Takeuti                | teclado    | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-09 20:16:08.126768+00 | 2025-06-09 20:16:03.832046+00 | 2025-06-09 20:16:08.126768+00 | tem_registro_aluno         |
| 1dc09e87-282c-47a9-b0b8-6f84d79f300c | monicaquagliarelo@gmail.com       | null         | null                                 | Monica de Souza Bacelar Quagliarelo  | flauta     | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-10 21:23:53.746912+00 | 2025-06-09 20:11:56.983797+00 | 2025-06-09 20:11:59.393837+00 | tem_registro_aluno         |
| 491b7c68-00d0-4154-adb7-80fcb73a72e4 | oticastatymello@gmail.com         | aluno        | testes teste                         | null                                 | null       | null         | null           | null              | null              | null | null  | null                          | 2025-06-09 19:45:22.301244+00 | null                          | sem_registro_especifico    |
| 7558a9c8-67c7-4c88-968e-f6a5e193d48c | tgjphotos@gmail.com               | null         | null                                 | gilberto junior                      | clarinete  | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-09 17:12:55.168554+00 | 2025-06-09 17:11:05.927293+00 | 2025-06-09 17:11:08.077555+00 | tem_registro_aluno         |
| 509052e4-5f3a-41df-bf48-f46b6f3cc108 | junior_sax@hotmail.com            | null         | null                                 | Gilberto Junior                      | piano      | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-09 16:07:25.454873+00 | 2025-06-09 16:00:37.991955+00 | 2025-06-09 16:00:40.395572+00 | tem_registro_professor     |
| 41f409ee-1614-4bc6-8cce-a02086601dc9 | nilsondepereira@gmail.com         | aluno        | Nilson Dionisio Pereira              | Nilson Dionisio Pereira              | saxofone   | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:07:59.81548+00  | 2025-05-31 01:41:53.970073+00 | 2025-05-31 01:41:54.970073+00 | tem_registro_aluno         |
| 5e31da6f-9ce6-4345-a056-efc5719039f0 | priscilasouza.musica@gmail.com    | aluno        | Priscila Souza                       | Priscila Souza                       | violoncelo | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:37:19.513029+00 | 2025-05-30 13:18:25.529455+00 | 2025-05-30 13:18:26.529455+00 | tem_registro_professor     |
| 229c0858-c758-4993-abb3-cb7d13b01b76 | silasdiego49@gmail.com            | professor    | Silas Diego da Conceição             | Silas Diego da Conceição             | violino    | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:07:59.81548+00  | 2025-05-29 18:30:33.111767+00 | 2025-05-29 18:30:34.111767+00 | tem_registro_professor     |
| 4d0b00fd-dbb6-4941-9093-61ab7d7b1122 | reinaldo23carla@gmail.com         | professor    | Reinaldo Barros dos Santos           | Reinaldo Barros dos Santos           | outro      | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:08:08.556287+00 | 2025-05-29 15:07:38.528604+00 | 2025-05-29 15:07:39.528604+00 | tem_registro_aluno         |
| 5697f078-c2f5-4da6-bb6c-db9ec9764d41 | jessica.silva23101108@gmail.com   | aluno        | Maria Luiza Aparecida Fernandes      | Maria Luiza Aparecida Fernandes      | violino    | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:07:59.81548+00  | 2025-05-29 14:35:35.382339+00 | 2025-05-29 14:35:36.382339+00 | tem_registro_aluno         |
| c91f1974-e102-46dd-b1c3-ba3f06c039af | bbacelar05@gmail.com              | aluno        | Millena Bacelar de Souza Quagliarelo | Millena Bacelar de Souza Quagliarelo | flauta     | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:07:59.81548+00  | 2025-05-29 13:26:14.291021+00 | 2025-05-29 13:26:15.291021+00 | tem_registro_aluno         |
| b37a40d9-ba6c-465f-abfc-c441b47edb4d | mleonoroliver@gmail.com           | aluno        | Maria Leonor dos Santos Oliveira     | Maria Leonor dos Santos Oliveira     | flauta     | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:08:08.556287+00 | 2025-05-28 03:45:05.105614+00 | 2025-05-28 03:45:06.105614+00 | tem_registro_aluno         |
| 1f63bfc3-62d7-48cb-b497-6699cb7d2037 | barrosmariana708@gmail.com        | aluno        | Mariana Barros dos Santos            | Mariana Barros dos Santos            | flauta     | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:07:59.81548+00  | 2025-05-28 00:36:11.827381+00 | 2025-05-28 00:36:12.827381+00 | tem_registro_aluno         |
| 8483907a-5521-43b1-b824-5068b02a2872 | mkgomes.r1499@gmail.com           | aluno        | Mike Rodrigues Gomes                 | Mike Rodrigues Gomes                 | bateria    | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:07:59.81548+00  | 2025-05-27 22:55:28.358563+00 | 2025-05-27 22:55:29.358563+00 | tem_registro_aluno         |
| a57eeb22-a246-4243-8e32-98297c6f3bad | nicollymellodecamargo2@gmail.com  | aluno        | Nicolly Mello de Camargo             | Nicolly Mello de Camargo             | teclado    | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-04 16:02:04.541869+00 | 2025-05-27 22:08:47.914966+00 | 2025-05-27 22:08:48.914966+00 | tem_registro_aluno         |
| 9064ab32-12ce-415a-8c19-51b566608ee5 | giovannamellodecamargo2@gmail.com | aluno        | Giovanna Mello de Camargo            | Giovanna Mello de Camargo            | violoncelo | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:08:08.556287+00 | 2025-05-27 20:38:51.629168+00 | 2025-05-27 20:38:52.629168+00 | tem_registro_aluno         |
| 840f99c4-7479-4098-9c2e-474a695178f0 | jcarlos0710@gmail.com             | aluno        | Jose Carlos Oliveira                 | Jose Carlos Oliveira                 | trompete   | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-01 19:07:59.81548+00  | 2025-05-27 18:56:17.455489+00 | 2025-05-27 18:56:18.455489+00 | tem_registro_aluno         |
| 54e79a05-59f7-4cc8-b67f-f522a1b452e4 | taty.mello0607@gmail.com          | aluno        | Tatiana mello                        | Tatiana mello                        | flauta     | 0            | 0              | 0                 | 0                 | null | null  | 2025-06-02 18:42:40.887136+00 | 2025-05-27 15:52:58.71251+00  | 2025-05-27 15:52:59.71251+00  | tem_registro_aluno         |
| 2becf8d3-866a-4948-a4dd-d80395372ce1 | junior.sax@gmail.com              | aluno        | junior                               | Junior Sax                           | saxofone   | 130          | 0              | 0                 | 0                 | null | null  | 2025-06-22 15:28:41.561219+00 | 2025-05-26 18:44:12.913736+00 | 2025-05-26 21:27:52.584152+00 | sem_registro_especifico    |
```

## 🎯 **COMO EXECUTAR:**

1. **Acesse o Supabase Dashboard** do seu projeto
2. **Vá na aba "SQL Editor"**
3. **Cole uma consulta de cada vez** e execute
4. **Copie os resultados** e me envie

## 📊 **RESULTADOS ESPERADOS:**

- **Consulta 1**: Lista usuários do auth.users com metadados
- **Consulta 2**: Lista perfis da tabela profiles
- **Consulta 3**: Lista alunos com dados relacionados
- **Consulta 4**: Lista professores com dados relacionados
- **Consulta 5**: Lista instrumentos ativos
- **Consulta 6**: Contagem por tipo de usuário
- **Consulta 7**: JOIN completo mostrando toda a estrutura

## 🔧 **PRÓXIMO PASSO:**

Depois que você executar essas consultas e me enviar os resultados, vou:

1. **Corrigir nossa estrutura mockada** para match com a real
2. **Ajustar as consultas** do cliente híbrido
3. **Garantir que as páginas admin** funcionem com a estrutura correta

**Execute as consultas e me envie os resultados!** 🚀