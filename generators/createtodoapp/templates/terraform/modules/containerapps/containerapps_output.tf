output "CONTAINER_APP_NAME" {
  value = azapi_resource.container_apps.name
}

output "CONTAINER_APP_URI" {
  value = "https://${jsondecode(azapi_resource.container_apps.output).properties.configuration.ingress.fqdn}"
}

output "CONTAINER_APP_NAME_IDENTITY_PRINCIPAL_ID" {
  value     = length(azapi_resource.container_apps.identity) == 0 ? "" : azapi_resource.container_apps.identity.0.principal_id
  sensitive = true
}

output "CONTAINER_APP_NAME_IMAGE_NAME" {
  value = azapi_resource.container_apps.name
}
