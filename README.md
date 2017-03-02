# E-Commerce User Services

## Build the docker image
'''
docker build --tag erp-ecommerce-user-api .
'''

## Run The Services

## Local/Dev
'''
docker run --detach --publish 8000:80 --name erp-ecommerce-user-api-1 -v $(pwd):/usr/src/app --link erp-ecommerce-db-1:erp-ecommerce-db erp-ecommerce-user-api
'''

## Staging or Prod
'''
docker run --detach --publish 8000:80 --name erp-ecommerce-user-api-1 -v $(pwd):/usr/src/app --link erp-ecommerce-db-1:erp-ecommerce-db erp-ecommerce-user-api
'''
