<!-- .slide: class="transition-white sfeir-bg-red" -->

# CI History 

##==##

## First Jenkins

![Jenkins Form](./assets/images/jks-create-job.png)

Notes: D'abord on a eu Jenkins avec de l'intégration continue, et c'était déjà cool, puis on s'est dit, c'est cool maintenant on voudrait déployer sur la dév automatiquement. 

##==##

## Then plugins 

![Plugins](./assets/images/jks-rundeck-config.png)

* Rundeck
* Docker Swarm
* Ansible

Notes: OK là aussi c'est cool, mais maintenant on voudrait déployer sur la qa, mais seulement si je suis sur master, et vérifier que sonar est ok et que mes tests passent, et faire ça sur tout mes projets.

##==##

## Then ... Pipeline As Code

* `Jenkinsfile`
* `.travis.yml`
* `.gitlab-ci.yml`

Notes: ok maintenant je peux mettre des conditions, parser des variables d'environnement. 

##==##

## Then ... Shell !

Notes: 
