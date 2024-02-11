## Tutorial de como criar e utilizar Migrations

### O que são Migrations?

Migrations são arquivos que contém instruções para criar, alterar ou deletar tabelas no banco de dados. Eles são utilizados para manter o banco de dados atualizado com as mudanças no código. As migrações são particularmente úteis quando se trabalha em equipe, pois permitem que todos os membros da equipe mantenham o banco de dados atualizado com as mudanças no código.

### Como utilizar Migrations?

#### Instale o Sequelize e o Sequelize CLI:

```bash
npm install -g sequelize sequelize-cli
```

#### Configure o Sequelize:

```bash
npx sequelize-cli init
```

#### Crie uma nova migração:

```bash
npx sequelize-cli migration:generate --name nome_da_migracao
```

Esse comando irá criar um novo arquivo de migração na pasta `migration` com o nome `nome_da_migracao.js`.

#### Edite o arquivo de migração:

Abra o arquivo de migração criado e adicione as instruções necessárias para criar, alterar ou deletar tabelas no banco de dados. O arquivo de migração deve exportar uma função `up` que contém as instruções para aplicar a migração e uma função `down` que contém as instruções para desfazer uma migração.

#### Alterar o arquivo de configuração do Sequelize:

Altere o arquivo de configuração do Sequelize mudando sua extensão para `.js` e puxe as variáveis de ambiente para o arquivo. Ex.:

```javascript
require('dotenv').config();

module.exports = {
  development: {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  test: {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  }
}

```

#### Criar arquivo `.sequelizerc` na raiz do projeto:

Crie o arquivo `.sequelizerc` na raiz do projeto e adicione o seguinte conteúdo:

```javascript
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('src', 'models'),
  'migrations-path': path.resolve('src', 'database', 'migrations'),
  'seeders-path': path.resolve('src', 'database', 'seeders')
}
```

#### Antes de executar as migrações, crie o banco de dados:

```bash
npx sequelize-cli db:create
```

#### Executar as migrações:
```bash
npx sequelize-cli db:migrate
```

Esse comando irá executar todas as migrações que ainda não foram aplicadas ao banco de dados.

#### Desfazer uma migração:

```bash
npx sequelize-cli db:migrate:undo
```

Esse comando irá desfazer a última migração aplicada ao banco de dados.
