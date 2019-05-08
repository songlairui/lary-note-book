# 拆分包

想用一下 Travis CI 发现是 mono 项目级的

```
git subtree split --prefix=packages/back -b lary-note-serv
git subtree split --prefix=packages/front -b lary-note-web
git push origin --all
```
