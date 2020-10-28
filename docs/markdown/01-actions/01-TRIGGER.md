##==##
<!-- .slide: class#"transition-white sfeir-bg-red" -->

# Yaml \o/

![Yaml \o/](./assets/images/yaml.jpg)

##==##

# Directory

----
.github/workflows/
  container.yaml
  ci.yaml
  e2e.yaml
  ...
----

Notes:
Les fichiers se trouvent dans le répertoire `.github/workflows/`, vous pouvez donc avoir un fichier par workflow.

##==##

# Workflow

[source,yaml]
----
name: Node.js CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [10.x, 12.x]
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
      env:
        CI: true
----

##==##

# Trigger Events

[source,yaml]
----
on:
  push:
----

##==##

# Combine

[source,yaml]
----
on: [push,pull_request,release]
----

##==##

## Events

[source,yaml]
----
on:
  ...
  project:
  milestone:
  issue_comment:
  fork:
  create:
  ...
----

##==##

## Branches

[source,yaml]
----
on:
  # Trigger the workflow on push or pull request,
  # but only for the master branch
  push:
    branches:
      - master
  pull_request:
    branches:
      - feat/*
----

##==##

## Types

[source,yaml]
----
on:
  issues:
    types:
      - opened
      - deleted
----

##==##

## Directory

[source,yaml]
----
on:
  push:
    path:
    - '**.js'
----

##==##

## Scheduler

[source,yaml]
----
on:
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron:  '*/15 * * * *'
----