# Quake Log Parser

Parser de logs do game Quake que retorna os resultados das partidas

### Pré-requisitos

```
NodeJS (Versão 11 ou acima)
```

### Instalando

Fazer a clonagem pelo git

```
git clone https://github.com/jjgomez2k/quake-log-parser
```

Uma vez clonado instalar as dependencias

```
npm install
```

Finalizando a instalação, inicie a aplicação executando o seguinte comando no terminal

```
npm start
```

## Testes

A aplicação foi testada usando Jasmine JS e Istanbul para verificar a taxa de coverage para execução da rotina de testes, execute o comando abaixo em seu terminal para realiza-los

```sh
npm test
```

## Rotas

**LISTAR TODAS AS PARTIDAS**

**GET** ```/api/v1/games```

**200** ```OK```

**Exemplo de retorno (JSON)**
```
{
    "game_1": {
        "hostname": "Code Miner Server",
        "version": "ioq3 1.36 linux-x86_64 Apr 12 2009",
        "total_kills": 0,
        "players": [
            "Isgalamido"
        ],
        "kills": {
            "Isgalamido": 0
        }
    },
    
    "game_2": {
        "hostname": "Code Miner Server",
        "version": "ioq3 1.36 linux-x86_64 Apr 12 2009",
        "total_kills": 11,
        "players": [
            "Isgalamido",
            "Mocinha"
        ],
        "kills": {
            "Isgalamido": 4,
            "Mocinha": 0
        }
    }
}
```
TESTE DE RETORNO
```
 0.0.0.0:8080/api/v1/games
```

----------
**BUSCAR UMA PARTIDA ESPECÍFICA**

Retorna uma partida específica a partir do ID. 

**GET** ```/api/v1/games/{id}```

**200** ```OK```

**Exemplo de retorno (JSON)**
```
{
    "hostname": "Code Miner Server",
    "version": "ioq3 1.36 linux-x86_64 Apr 12 2009",
    "total_kills": 14,
    "players": [
        "Zeh",
        "Isgalamido",
        "Zeh",
        "Assasinu Credi"
    ],
    "kills": {
        "Zeh": 0,
        "Isgalamido": 2,
        "Assasinu Credi": 1
    }
}
```

TESTE DE RETORNO
```
 0.0.0.0:8080/api/v1/games/1
```

## Técnologias utilizadas

* [Hapi](https://hapijs.com/) - Framework de NodeJS
* [Jasmine](https://jasmine.github.io/) - Behavior-Driven Javascript
* [Istanbul](https://istanbul.js.org/) - Javascript Coverage
* [Nodemon](https://nodemon.io/) - Utilitário para atualizar automaticamente o webserver

## Feito por

* **Juan Jose Gomez Martinuzzo**
