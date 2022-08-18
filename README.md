## Работа с DOCKER

```bash
# создание .env файлв
$ cp .env.example .env

# внутри контейнера происходит вся сборка
$ DOCKER_BUILDKIT=1 docker-compose up -d

# для применения изменений после git pull
$ docker restart APP_NAME
```
