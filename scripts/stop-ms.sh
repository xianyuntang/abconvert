#!/usr/bin/env sh

color="\033[0;35m"
reset="\033[1;37m"
working_dir="$(pwd)/microservices"
cd "$working_dir" || exit

echo "$color>>> Stop and remove containers$reset"
docker compose down