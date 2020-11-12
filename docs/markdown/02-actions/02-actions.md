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

// TODO add sketch note
* Unit action
* With Inputs and Outputs
* Easily interact with Git and Github API 

##==##

# How to call a Github Action ? 

//TODO add sketchnote
actions/repo@

##==##

# "Builtin" actions

Github provides a lot of actions
// TODO add sketch note
* `actions/checkout`
* `actions/setup-java`
* `actions/setup-node(|python|go|elixir|...)`
* `github/super-linter` 
Notes: Il y a bcp d'actions fournies par Github nativement. 

##==##

# Closer look to setup-*

//TODO sketch note
* `actions/setup-*` will install bin in host
* So you can install differents components in the same context|host

##==##

# Or more High level

* `actions/upload-artifact` / `actions/download-artifact` 
* `actions/create-release`
* `actions/github-script`

Notes: D'autres exemples de github actions, comme github-script. Un petit focus sur github-script. 

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

##==##

# Two ways :

* Javascript action (also Typescript)
* Or Container action
* Github provides templates

Notes: Il existe des templates pour ne pas partir de zéro.

##==##

# Javascript action

* Run natively on host
* Perfect for interact with Github API (others API also)
* For High-level action
* Recommended choice
* Template : [actions/javascript-action](https://github.com/actions/javascript-action)

##==##

# Two (main) npm libraries

* @actions/core => to interact with Github action workflow(inputs,env var, etc)
* @action/github => to interact with Github API

##==##

# Container action

* Based on a docker image + your shell script
* Very easy to start with
* Only compatible with Linux Host
* A fewer longer to start
* Interact with workflow by shell api
* Template : [actions/container-action](https://github.com/actions/container-action)

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

Notes: Développé initialement par [RichiCoder1](https://github.com/richicoder1) puis repris par Hashicorp. Une action simple, bien testé, bien documenté.

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

Notes: Autre exemple : cette github action prends en entrée les variables d'environnement de Github, et va les transformer pour les utiliser dans votre pipeline, par exemple pour créer un service qui va prendre le nom d'une branche dans l'url. Alors maintenant que l'on a développé notre Github action ce serait bien de pouvoir la partager. 

##==##

# Marketplace

![marketplace](./assets/images/marketplace.png)

Notes: Vous pouvez ensuite exposer votre Github Action sur la marketplace.

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