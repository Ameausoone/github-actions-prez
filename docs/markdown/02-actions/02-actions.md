# Or ... a Github Action

```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v2
  - name: Install Node.js
    uses: actions/setup-node@v1
```

Notes: Il s'agit de déléguer une étape d'un pipeline a une github action. Qu'est-ce qu'une Github Action ? 

##==##

# What is a Github Action ?

* Unit action
* With Inputs and Outputs
* With documentation !
* Easily interact with Git and Github API 

Notes: C'est une action unitaire, avec des valeurs en entrées, qui a accès au workspace. qui va effectué une tâche, idéalement bien testé, généralement bien documenté. 

##==##

# How to call a Github Action ? 

//TODO add sketchnote

Notes: Pour utiliser une github action, il suffit de référencer le repo, par défaut, ça utilise la branche par défaut, mais on peut spécifier une autre branche, un tag, ou un commitId, on va voir plus loin l'intérêt que ça a. ... Alors Github fourni une série de Github action

##==##

# "Builtin" actions

Github provides a lot of actions
* `actions/checkout`
* `actions/setup-java`
* `actions/setup-node(|python|go|elixir|...)`
* `github/super-linter` 

Notes: Il y a bcp d'actions fournies par Github nativement. Notamment pour installer vos dépendances, pour java, node, python etc. Il y a également un linter. Je vais faire un petit focus sur le fonctionnement des actions "setup-" 

##==##

# Closer look to setup-*

//TODO sketch note

Notes: C'est une convention dans les actions github, une action setup- va installer l'application directement sur le host, avec la version que vous avez choisi, et vous pouvez du coup cumuler facilement différentes versions d'outils.

##==##

# Or more High level

* `actions/upload-artifact` / `actions/download-artifact` 
* `actions/create-release`
* `actions/github-script`

Notes: D'autres exemples de github actions: comme upload artifact, download-artifact. Create release qui comme son nom l'indique qui va créer une release github ou comme github-script. Un petit focus sur github-script. 

##==##

# github-script... an example

```yaml
on:
  issues:
    types: [opened]
jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v3
        with:
          github-token: ${{secrets.GITHUB_TOKEN}}
          script: |
            github.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '👋 Thanks for reporting!'
            })
```

Notes: github-script permets d'intéragir avec l'api Github très simplement. github-script inject un client github authentifié avec Github Token. Par exemple, ici on va réagir à la création d'une nouvelle issue, à laquelle on va rajouter un commentaire. 

##==##

# Or by the community...

You can develop your own Github action !!!

Notes: et donc c'est là où Github Actions devient très intéressant, on peut développer ses propres Github action ! ... 2 possibilités

##==##

# Two ways :

* Javascript action (also Typescript)
* Or Container action
* Github provides templates on [github.com/actions](https://github.com/actions)

Notes: 2 types de github action : javascript action ou une container action. Pour ces 2 types, il existe des templates pour ne pas partir de zéro que vous trouverez sur github.com/actions

##==##

# Javascript action

* Run natively on host
* Perfect for interact with Github API (others API also)
* For High-level action
* Recommended choice
* Template : [actions/javascript-action](https://github.com/actions/javascript-action)

Notes: Une action de type Javascript s'éxécute nativement sur la vm, vous pouvez l'écrire en javascript ou en typescript. C'est plutôt l'action privilégié par Github. Si vous avez besoin d'intéragir avec une API, c'est le choix idéal. ... Il y a d'ailleurs 2 librairies npm disponibles

##==##

# Two (main) npm libraries

* @actions/core => to interact with Github action workflow(inputs,env var, etc)
* @action/github => to interact with Github API

Notes: core qui permets de travailler avec l'api de Github Actions, et github pour intéragir avec l'api Github. Mais évidemment, et c'est tout l'intérêt, vous pouvez importer n'importe quelle librairie npm.

##==##

# Container action

* Based on a docker image + your shell script
* Very easy to start with
* Only compatible with Linux Host
* A fewer longer to start
* Interact with workflow by shell api
* Template : [actions/container-action](https://github.com/actions/container-action)

Notes: il existe également un template pour faire une action basée sur un container, attention compatible actuellement que avec les runners Linux, c'est également un peu plus long à démarrer qu'une action Javascript. 2 exemples de Github action

##==##

# Some examples : Vault-action

[hashicorp/vault-action](https://github.com/hashicorp/vault-action)

> A helper action for easily pulling secrets from HashiCorp Vault™.

```yaml
# ...
- name: Import Secrets
  uses: hashicorp/vault-action@v2.0.1
  with:
    url: https://vault.mycompany.com:8200
    token: ${{ secrets.VaultToken }}
    secrets: |
        secret/data/ci/aws accessKey | AWS_ACCESS_KEY_ID ;
        secret/data/ci/aws secretKey | AWS_SECRET_ACCESS_KEY ;
        secret/data/ci npm_token
# ...
``` 

Notes: que je n'ai pas pris au hasard, puisque j'ai contribué sur ces actions. Par exemple vault-action : développé initialement par [RichiCoder1](https://github.com/richicoder1) puis repris par Hashicorp. Une action simple, bien testé, bien documenté, qui permets de récupérer des secrets sur une instance Vault. Et vous pouvez venir consommer cette action très facilement dans votre pipeline. 

##==##

# Another one : github-slug-action

[rlespinasse/github-slug-action](https://github.com/rlespinasse/github-slug-action)

> This GitHub Action will expose the slug value of all GitHub environment variables inside your GitHub workflow.

```yaml
- name: Inject slug/short variables
  uses: rlespinasse/github-slug-action@v3.x

- name: Print slug/short variables
  run: |
    echo "Slug variables"
    # ...
    echo "   head ref   : ${{ env.GITHUB_HEAD_REF_SLUG }}"
    // print : "   head ref   : feat-ready-to-url"
    # ...
```

Notes: Autre exemple : développer par mon collègue Romain Lespinasse. Cette github action prends en entrée les variables d'environnement de Github, et va les transformer pour les utiliser dans votre pipeline, par exemple pour créer un service qui va prendre le nom d'une branche dans l'url. Alors maintenant que l'on a développé notre Github action ce serait bien de pouvoir la partager. 

##==##

# Marketplace

![marketplace](./assets/images/marketplace.png)

Notes: Vous pouvez ensuite exposer votre Github Action sur la marketplace, une fois votre action créé, vous pouvez la proposer sur la Marketplace de Github. 

##==##

# Security 

> Github Action : the 'S' stands for security.

##==##

# The "left-pad" effect

* What happens if an owner delete his action ?

* A "archived" repo still works
* Use well-known Github action
* Fork it in your org

##==##

# The "event-stream" effect

* What happens if an owner mine bitcoin with his action ?

* Use commitId as reference: 

```yaml
- uses: rlespinasse/github-slug-action@cc560ad
```

* Dependabot will even make PR with most recent commitId

##==##

# Use dependabot

`.github/dependabot.yml`
```yaml
version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "daily"
```