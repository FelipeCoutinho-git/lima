# Exercícios Práticos de XML – Identificação e Correção de Erros

Este repositório contém uma série de exercícios práticos focados na identificação e correção de erros de sintaxe em documentos **XML** (eXtensible Markup Language).

---

## 🎯 Objetivo

Desenvolver e aprimorar a habilidade de identificar falhas de sintaxe, regras de nomenclatura, aninhamento, uso de entidades e formatação de atributos em arquivos XML.

---

## 📝 Resolução dos Exercícios

### Exercício 1: Cadastro de Livro
* **Erros identificados:**
  * A tag `<titulo>` não possui a tag de fechamento correspondente (`</titulo>`).
* **Código Corrigido:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<livro>
  <titulo>Banco de Dados</titulo>
  <autor>Maria Oliveira</autor>
  <ano>2025</ano>
</livro>
```

---

### Exercício 2: Cadastro de Aluno
* **Erros identificados:**
  * O atributo `matricula=202501` não está entre aspas.
  * A tag `<idade=20></idade>` possui atribuição de valor no próprio nome da tag em vez de usar o conteúdo do elemento.
* **Código Corrigido:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<aluno matricula="202501" curso="Informática">
  <nome>João Silva</nome>
  <idade>20</idade>
</aluno>
```

---

### Exercício 3: Empresa
* **Erros identificados:**
  * A declaração XML está sem aspas no atributo `version` e falta a interrogação de fechamento `?>`.
  * O caractere `&` (e comercial) no texto `Tech & Sistemas` deve ser escapado como entidade `&amp;`.
* **Código Corrigido:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<empresa>
  <nome>Tech &amp; Sistemas</nome>
  <cidade>Curitiba</cidade>
</empresa>
```

---

### Exercício 4: Pedido de Venda
* **Erros identificados:**
  * Aninhamento incorreto de elementos: a tag `<itens>` foi aberta dentro de `<cliente>`, mas fechada fora dele.
* **Código Corrigido:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<pedido>
  <cliente>
    <nome>Maria</nome>
  </cliente>
  <itens>
    <item>Notebook</item>
    <item>Mouse</item>
  </itens>
</pedido>
```

---

### Exercício 5: Cadastro de Produtos
* **Erros identificados:**
  * Nomes de tags não podem conter espaços (`<nome produto>`).
  * Nomes de tags não podem iniciar com números (`<1preco>`).
* **Código Corrigido:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<produtos>
  <nome_produto>Notebook</nome_produto>
  <preco>4500</preco>
</produtos>
```

---

### Exercício 6: Sistema Escolar (Desafio)
* **Erros identificados:**
  * Mismatch de aspas na declaração XML (`version='1.0"`).
  * Atributo `curso` sem aspas e aspas incompatíveis no atributo `matricula`.
  * Caractere especial `&` sem escapamento (`&amp;`).
  * Tag `<disciplina>` não foi fechada para o item "Banco de Dados".
* **Código Corrigido:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<escola>
  <aluno matricula="202501" curso="Informática">
    <nome>Lucas &amp; Ana</nome>
    <disciplinas>
      <disciplina>Banco de Dados</disciplina>
      <disciplina>Lógica de Programação</disciplina>
    </disciplinas>
  </aluno>
</escola>
```

---

## 💡 Principais Regras do XML Revisitadas

1. **Tag Raiz Única:** Todo documento XML deve conter exatamente um elemento raiz.
2. **Fechamento Obrigatorio:** Toda tag aberta precisa ser fechada (`<tag>...</tag>`).
3. **Sensível a Maiúsculas/Minúsculas (Case Sensitive):** `<Nome>` é diferente de `<nome>`.
4. **Aninhamento Correto:** As tags devem ser fechadas na ordem inversa em que foram abertas.
5. **Atributos entre Aspas:** Todos os valores de atributos devem estar entre aspas duplas (`"..."`) ou simples (`'...'`).
6. **Nomes de Tags Válidos:** Não podem conter espaços nem começar com números ou caracteres especiais.
7. **Entidades Especiais:** Utilizar `&amp;` para `&`, `&lt;` para `<`, `&gt;` para `>`, etc.