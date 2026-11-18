# Instalar o Intervalo no celular

O app é só estes arquivos. Para virar um app instalável, eles precisam estar publicados em um endereço **https**. Um arquivo aberto direto do celular não pode ser instalado.

## Publicar com GitHub Actions (recomendado, atualiza sozinho)
Já vem pronto em `.github/workflows/pages.yml`.
1. Crie um repositório no GitHub e envie **todos** os arquivos, inclusive a pasta `.github` (que fica oculta em alguns gerenciadores de arquivos).
2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. A branch precisa se chamar `main`. A aba **Actions** mostra a publicação; em cerca de 1 minuto o endereço aparece (`https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`).
4. Abra o endereço no Chrome do celular e instale.
5. Para atualizar, troque o `index.html` e envie de novo. A cada publicação o workflow troca o nome do cache do `sw.js`, e o celular pega a versão nova sozinho (a atualização aparece na segunda abertura do app).

## Alternativa sem GitHub: Netlify Drop (grátis, sem conta técnica)
1. Abra https://app.netlify.com/drop
2. Arraste a **pasta inteira** (index.html, manifest.webmanifest, sw.js e os ícones).
3. Abra o endereço gerado no Chrome do celular.
4. Menu ⋮ → **Instalar app** (ou use o botão "Instalar Intervalo" em Perfil).

## iPhone (Safari)
Compartilhar → **Adicionar à Tela de Início**.

## Importante
- Seus dados ficam no **aparelho** (localStorage do endereço publicado). Mudar de endereço ou de navegador começa do zero: use **Perfil → Exportar backup** antes e **Importar backup** depois.
- Sem o GitHub Actions, para atualizar troque o index.html e mude `CACHE = 'intervalo-v14'` no sw.js (ex.: v15).
- O app continua funcionando só com o index.html, sem instalar.

## Gerar o APK (Android) com GitHub Actions
Já vem pronto em `.github/workflows/android.yml`, usando o Capacitor. O APK leva o app dentro, abre em tela cheia e funciona sem internet.
1. Envie todos os arquivos ao repositório (inclusive `package.json`, `capacitor.config.json` e `intervalo-debug.keystore`).
2. Aba **Actions → Gerar APK → Run workflow**. Leva uns 5 a 10 minutos.
3. Quando terminar, abra **Releases** no repositório (ou o link `.../releases/latest`) e baixe o `Intervalo-1.N.apk`.
4. No celular, abra o APK e permita instalar apps desconhecidos quando o Android pedir.
5. Depois de instalado, o próprio app avisa quando sair versão nova (Perfil → Atualizações) e baixa o APK do release mais recente.
- Cada build recebe um número de versão maior e usa a mesma chave de assinatura, então o APK novo instala por cima do anterior sem perder seus dados.
- É um APK de teste (debug), bom para uso pessoal. Para a Play Store seria preciso um APK assinado com chave própria e secreta.
- Os dados do APK ficam separados dos do site: use **Perfil → Exportar backup** num e **Importar backup** no outro.
