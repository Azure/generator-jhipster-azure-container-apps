output "AZURE_CONTAINER_REGISTRY_ENDPOINT" {
  value = module.acr.CONTAINER_REGISTRY_LOGIN_SERVER
  sensitive = true
}

output "AZURE_CONTAINER_REGISTRY_NAME" {
  value = module.acr.CONTAINER_REGISTRY_NAME
  sensitive = true
}

output "AZURE_CONTAINER_REGISTRY_PWD" {
  value = module.acr.CONTAINER_REGISTRY_PASSWORD
  sensitive = true
}

output "SERVICE_API_IMAGE_NAME" {
  value = module.container_app_api.CONTAINER_APP_NAME_IMAGE_NAME
  sensitive = true
}

output "SERVICE_WEB_IMAGE_NAME" {
  value = module.container_app_web.CONTAINER_APP_NAME_IMAGE_NAME
  sensitive = true
}

output "REACT_APP_API_BASE_URL" {
  value = module.container_app_api.CONTAINER_APP_URI
  sensitive = true
}

output "REACT_APP_WEB_BASE_URL" {
  value = module.container_app_web.CONTAINER_APP_URI
  sensitive = true
}

output "AZURE_CONTAINER_ENVIRONMENT_NAME" {
  value = module.container_env.CONTAINER_ENV_NAME
  sensitive = true
}

output "AZURE_APPLICATION_INSIGHTS_CONNECTION_STRING" {
  value = module.applicationinsights.APPLICATIONINSIGHTS_CONNECTION_STRING
  sensitive = true
}

output "API_CONTAINER_APP_PRINCIPAL_ID" {
  value = module.container_app_api.CONTAINER_APP_NAME_IDENTITY_PRINCIPAL_ID
  sensitive = true
}

output "AZURE_CONTAINER_ENVIRONMENT_ID" {
  value = module.container_env.CONTAINER_ENV_ID
  sensitive = true
}

output "SERVICE_API_NAME" {
  value = module.container_app_api.CONTAINER_APP_NAME
}

output "SERVICE_WEB_NAME" {
  value = module.container_app_web.CONTAINER_APP_NAME
}

output "AZURE_PSQL_URL" {
  value = module.postgresql.AZURE_POSTGRESQL_SPRING_DATASOURCE_URL
}

output "AZURE_PSQL_CUSTOM_USERNAME" {
  value = module.postgresql.AZURE_POSTGRESQL_SPRING_DATASOURCE_URL
}