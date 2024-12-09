param (
    [Parameter(
        Mandatory,
        Position = 0
    )]
    [string]$subscriptionId,
    [Parameter(
        Mandatory,
        Position = 1
    )]
    [string]$region,
    [Parameter(
        Mandatory,
        Position = 2
    )]
    [string]$resourceGroup
)

Write-Host "subscriptionid is $subscriptionId, region is $region, resourcegroup is $resourceGroup."
Write-Host "=========== ACR Login ==========="

$acrName = az acr list --resource-group $resourceGroup --subscription $subscriptionId --query '[0].name' -o tsv
$resourceName = $acrName.Substring(2, 13)
$loginServer = "cr$resourceName.azurecr.io"
Write-Host "acr login server is: $loginServer"
Write-Host "login acr..."
az acr login --name $loginServer --resource-group $resourceGroup --subscription $subscriptionId

Write-Host "=========== Projects build ==========="

$suffix = Get-Date -Format "yyyyMMddHHmmss"

Write-Host "build api project..."
docker build -t "$loginServer/backend:$suffix" ./src/api/
if ($LASTEXITCODE -ne 0) {
    Write-Host "build failed"
    exit 1
}

Write-Host "build web project..."
$apiFqdn = az containerapp show --name "ca-api-$resourceName" --resource-group $resourceGroup --subscription $subscriptionId --query properties.configuration.ingress.fqdn -o tsv
$connectionString = az resource show --resource-group $resourceGroup --subscription $subscriptionId -n "appi-$resourceName" --resource-type "microsoft.insights/components" --query properties.ConnectionString -o tsv

Write-Host "construct environment variable files for web project"
$envFilePath = "./src/web/.env.local"
"VITE_API_BASE_URL=`"https://$apiFqdn`"" | Out-File -FilePath $envFilePath -Encoding utf8
"VITE_APPLICATIONINSIGHTS_CONNECTION_STRING=`"$connectionString`"" | Add-Content -Path $envFilePath -Encoding utf8

if ($LASTEXITCODE -ne 0) {
    Write-Host "construct failed"
    exit 1
}

docker build -t "$loginServer/frontend:$suffix" ./src/web/
if ($LASTEXITCODE -ne 0) {
    Write-Host "build failed"
    exit 1
}

Write-Host "push api project..."
docker push "$loginServer/backend:$suffix"
if ($LASTEXITCODE -ne 0) {
    Write-Host "push failed"
    exit 1
}

Write-Host "push web project..."
docker push "$loginServer/frontend:$suffix"
if ($LASTEXITCODE -ne 0) {
    Write-Host "push failed"
    exit 1
}

Write-Host "=========== Deploy projects ==========="

$password = az acr credential show --resource-group $resourceGroup --subscription $subscriptionId --name "cr$resourceName" --query "passwords[0].value" -o tsv

Write-Host "deploy api project..."
$deployResult = az containerapp up --name "ca-api-$resourceName" --resource-group $resourceGroup --location $region --environment "cae-$resourceName" --image "$loginServer/backend:$suffix" --target-port 3100 --ingress external --registry-username "cr$resourceName" --registry-password $password --query "properties.configuration.ingress.fqdn"
if ($LASTEXITCODE -ne 0) {
    Write-Host "deploy failed"
    exit 1
}

Write-Host "deploy web project..."
$deployResult = az containerapp up --name "ca-web-$resourceName" --resource-group $resourceGroup --location $region --environment "cae-$resourceName" --image "$loginServer/frontend:$suffix" --target-port 80 --ingress external --registry-username "cr$resourceName" --registry-password $password --query "properties.configuration.ingress.fqdn"
if ($LASTEXITCODE -ne 0) {
    Write-Host "deploy failed"
    exit 1
}

Remove-Item -Path "./src/web/.env.local" -Force

$webFqdn = az containerapp show --name "ca-web-$resourceName" --resource-group $resourceGroup --subscription $subscriptionId --query properties.configuration.ingress.fqdn -o tsv

Write-Host "Deployment is done, please check via: https://$webFqdn"
