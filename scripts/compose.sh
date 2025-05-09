#!/bin/sh

export COMPOSE_PROJECT_NAME=web

docker compose -f docker/docker-compose.dev.yaml --env-file .env "$@"
