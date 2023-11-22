# DESAFIO2

Bem-vindo à segunda parte do desafio! Antes de nos aprofundarmos, gostaria de salientar que há áreas que poderiam ser refinadas. No entanto, para os propósitos deste desafio, tomei a decisão de evitar terminologia excessivamente técnica e crucial, como criptografar senhas de usuários, impor requisitos de tamanho mínimo para nomes de usuários, validar formatos de números de telefone, entre outras práticas importantes. Acredito que, dentro do escopo do desafio, as implementações atuais são razoáveis. Espero que apreciem.

Além disso, escolhi utilizar TypeScript em vez de JavaScript puro devido à necessidade de tipagem dinâmica na criação das classes. Se estivesse utilizando JavaScript puro, provavelmente optaria por usar o GULP para a builda o projeto, considerando suas capacidades na automação de tarefas e construção de projetos JavaScript.

## Estrutura de Pastas:

- **src**
  - **database:** Faz a conecção com banco de dados utilizado
  - **interface:** Contém algumas das DTOs usadas no projeto e as interfaces globais do projeto.
  - **model:** Conttem a entidades da aplicaçao
  - **server**
    - **controller:** Responsável pela manipulação da regra de negócio
    - **endpoints:** Separa as rotas por responsabilidades
    - **errors:** Armazena todos os erros personalizados da API.
    - **helpers:** Guarda códigos reutilizáveis do projeto.mnl
    - **middleware:** Contém todos os middlewares de erro usados na aplicação. Para mais detalhes, consulte a parte abaixo que fala sobre documentação da API.
    - **respositories:** Responsável por recuperar os valores do banco de dados ou da API do IXC.
    - **usecase:** Responsável por unir o Controller com o Repositório.
    - **index.ts:** Contém todas as configurações do servidor.
    - **router:** Reúne todas as rotas.
    - **swagger:** Contém as configurações para exibir a documentação de rota da API.
  - **type:** Contém os tipos gerais da aplicação.
  - **index:** Responsável por iniciar o projeto.
- **tests:** Contém todos os testes da aplicação

## Instruções de Uso

Antes de tudo, instale as dependências do projeto e adicione o aquivo **.env**:

### Configuração do Arquivo **.env**

O arquivo **.env** está incluído aqui por questões didáticas. Em um projeto normal, ele seria removido.

## Instalação das Dependências

```bash
yarn
```

ou

```bash
npm install
```

### Teste

Para executar os testes:

```bash
yarn test
```

ou

```bash
npm run test
```

### Executando o Projeto com Docker

Antes de tudo, o **.env** está configurado para rodar com Docker. Caso queira executar manualmente, será necessário fazer uma pequena alteração. Na variável **MONGO_URI**, altere de **MONGO_URI=mongodb://mongo:27017** para **MONGO_URI=mongodb://localhost:27017**. No arquivo docker-compose, remova os serviços que executam o Dockerfile. Caso queira executar com Docker, basta rodar o comando abaixo:

```bash
docker-compose up -d
```

### Executando o Projeto em Produção

Siga as etapas abaixo:

1. Gere o build:

```bash
yarn build
```

ou

```bash
npm run build
```

2. Após gerar o build, inicie o projeto com o comando:

```bash
yarn start
```

ou

```bash
npm start
```

### Executando o Projeto em Desenvolvimento

Para executar o projeto em modo de desenvolvimento:

```bash
yarn dev
```

ou

```bash
npm run dev
```

## Utils

### **swagger:**

Se desejar visualizar a documentação de rota, ela estará disponível em sua **localhost:{{sua porta}}/v1/desafio2/documentation**. Lá mostrará todos os possíveis erros e o que é retornado nas rotas.
