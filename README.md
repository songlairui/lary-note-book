# lary-note-front

[![Build Status](https://travis-ci.org/songlairui/lary-note-book.svg?branch=lary-note-web)](https://travis-ci.org/songlairui/lary-note-book)

> lary-note 前端, via @vue/cli

## push

```
tar czf - -C ./dist . | ssh $USER@$HOST -p $PORT "tar zxf - -C ~/ary-gateway/note/www"
```

```
rsync -e "ssh -p ${PORT}"  -a ./dist/ ${USER}@${HOST}:~/ary-gateway/note/www
```

## CIRCLECI

备份 yarn.lock 文件到 tmp 目录

通过 `yarn sync:lock` 可下载 tmp 目录下 yarn.lock 文件.

因为本机的 lock 文件全都指向了 本机 registry, 不得不这样做.
