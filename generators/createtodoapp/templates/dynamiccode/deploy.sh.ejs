#!/bin/bash


if [ $# -eq 3 ];
then
    echo "subscriptionid is $1, region is $2, resourcegroup is $3."
    echo "=========== ACR Login ==========="

    acrName=`az acr list --resource-group $3 --subscription $1 --query '[0].name' -o tsv`
    resourceName=${acrName:2:13}
    loginServer="cr${resourceName}.azurecr.io"
    echo "acr login server is: $loginServer"
    echo "login acr..."
    echo `az acr login --name $loginServer --resource-group $3 --subscription $1`

    echo "=========== Projects build ==========="

    suffix=$(date "+%Y%m%d%H%M%S")

    echo "build api project..."
    `docker build -t ${loginServer}/backend:${suffix} ./src/api/`
    if [ $? -ne 0 ]; then
        echo "build failed"
        exit 1
    fi

    echo "build web project..."
    apiFqdn=`az containerapp show --name ca-api-${resourceName} --resource-group $3 --subscription $1 --query properties.configuration.ingress.fqdn -o tsv`
    connectionString=`az resource show --resource-group $3 --subscription $1 -n appi-${resourceName} --resource-type "microsoft.insights/components" --query properties.ConnectionString -o tsv`
    echo "construct environment variable files for web project"
    `echo VITE_API_BASE_URL=\"https://$apiFqdn\" > ./src/web/.env.local && echo VITE_APPLICATIONINSIGHTS_CONNECTION_STRING=\"$connectionString\" >> ./src/web/.env.local`
    if [ $? -ne 0 ]; then
        echo "construct failed"
        exit 1
    fi

    `docker build -t ${loginServer}/frontend:${suffix} ./src/web/`
    if [ $? -ne 0 ]; then
        echo "build failed"
        exit 1
    fi

    echo "push api project..."
    docker push ${loginServer}/backend:${suffix}
    if [ $? -ne 0 ]; then
        echo "push failed"
        exit 1
    fi
    echo "push web project..."
    docker push ${loginServer}/frontend:${suffix}
    if [ $? -ne 0 ]; then
        echo "push failed"
        exit 1
    fi

    echo "=========== Deploy projects ==========="


    password=`az acr credential show --resource-group $3 --subscription $1 --name cr${resourceName} --query passwords[0].value -o tsv`

    echo "deploy api project..."
    `az containerapp up --name ca-api-${resourceName} --resource-group $3 --location $2 --environment cae-${resourceName} --image ${loginServer}/backend:${suffix} --target-port 3100 --ingress external --registry-username cr${resourceName} --registry-password ${password} --query properties.configuration.ingress.fqdn`
    if [ $? -ne 0 ]; then
        echo "deploy failed"
        exit 1
    fi
    echo "deploy web project..."
    `az containerapp up --name ca-web-${resourceName} --resource-group $3 --location $2 --environment cae-${resourceName} --image ${loginServer}/frontend:${suffix} --target-port 80 --ingress external --registry-username cr${resourceName} --registry-password ${password} --query properties.configuration.ingress.fqdn`
    if [ $? -ne 0 ]; then
        echo "deploy failed"
        exit 1
    fi

    `rm ./src/web/.env.local`

    webFqdn=`az containerapp show --name ca-web-${resourceName} --resource-group $3 --subscription $1 --query properties.configuration.ingress.fqdn -o tsv`

    echo "Deployment is done, please check via: https://$webFqdn"

else
    echo "required 3 parameters, 1st is subscriptionid, 2nd is region and 3th is resourcegroup name."
fi

