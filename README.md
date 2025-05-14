# Desafio Ana Gaming - Plataforma de Apostas

Este projeto é uma plataforma de apostas esportivas desenvolvida como parte do desafio Ana Gaming.

## Tecnologias Utilizadas

- **React JS**  
- **TypeScript**
- **Tailwind CSS**  
- **Vite** (para configuração e build)
- **ESLint** e **Prettier** (para padronização e qualidade de código)

## Organização do Projeto

O foco principal foi a organização e separação de pastas e arquivos, visando facilitar a manutenção e escalabilidade da aplicação. Os principais diretórios são:

- `src/pages`: Páginas principais da aplicação (ex: Home, Detalhes da Partida)
- `src/contexts`: Contextos globais para gerenciamento de estado (ex: esportes, partidas)
- `src/components`: Componentes reutilizáveis
- `src/assets`: Imagens e outros arquivos estáticos

## API e Variáveis de Ambiente

A aplicação utiliza uma API gratuita de odds esportivas, cujo acesso é limitado por conta do plano gratuito.  
**Atenção:** Para funcionar corretamente, é necessário configurar um arquivo `.env` com a chave da API.


## Como rodar o projeto

1. Instale as dependências:
   ```
   npm install
   ```
2. Configure o arquivo `.env` com sua chave da API.
3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

## Observações

- Por ser uma API gratuita, pode haver limitação de acessos diários.
- O projeto prioriza a clareza, organização e boas práticas de desenvolvimento.

---

Desenvolvido para o desafio Ana Gaming.