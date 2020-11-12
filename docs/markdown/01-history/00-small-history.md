<!-- .slide: class="transition-white sfeir-bg-red" -->

# a Small Pipeline History 

##==##

# First Jenkins

![Jenkins Form](./assets/images/jks-create-job.png)

Notes: D'abord on a eu Jenkins avec de l'intégration continue, et c'était déjà cool : on lance le build, on lance les test unitaires. Puis on s'est dit, c'est cool maintenant on voudrait déployer sur la dév automatiquement. 

<!-- .slide: class="with-code" -->
##==##
# Then ... Shell !

//TODO

```shell script
git ...
```
Notes: 

##==##

# Then plugins 

![Plugins](./assets/images/jks-rundeck-config.png)

* Rundeck
* Docker Swarm
* Ansible

Notes: OK là aussi c'est cool, mais maintenant on voudrait déployer sur la qa, mais seulement si je suis sur master, et vérifier que sonar est ok et que mes tests passent, et faire ça sur tout mes projets.

##==##

# And... Pipeline As Code

* `Jenkinsfile`
* `.travis.yml`
* `.gitlab-ci.yml`

Notes: Ok maintenant je peux mettre des conditions, parser des variables d'environnement. Ajouter des conditions complexes, mais maintenant j'ai des pipelines complexes, et partager entre les projets et je commence à galérer à maintenir tout ça entre mes projets.

##==##

# So.. shared libraries and pipelines 

```yaml
[...]
include
[...]
```

Notes: Pratique : on peut partager les librairies.

##==##

# But we need isolation !

mmmm Docker !

##==##

# And finally developers get this ... 

.gitlab-ci.yml
``` 
include:
  - project: 'my-shared-libraries'
    ref: master
    file: 'complexe-pipeline.yml'
``` 

Notes: et donc ça devient complexe pour les développeurs, c'est difficile de rentrer dans les pipelines, 