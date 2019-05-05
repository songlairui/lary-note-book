# 环境变量处理

## prisma

prisma init、deploy 等依赖 prisma.yml 中 endpoint
graphql get-schema 等依赖 .graphqlconfig.yml 中 endpoint

代码运行时, 依赖 prismaService 中的 endpoint

build 过程不需要处理 endpoint, 运行时,取预期的 endpoint 即可
