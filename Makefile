.PHONY all:
all:
	docker build -t wogri.azurecr.io/portal .

.PHONY push:
push:
	az acr login -n wogri
	docker push wogri.azurecr.io/portal

.PHONY update:
update: all push
	kubectl rollout restart deployment portal -n bcloud-prod
