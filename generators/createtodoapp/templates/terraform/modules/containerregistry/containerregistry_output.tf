output "CONTAINER_REGISTRY_LOGIN_SERVER" {
  value     = azurerm_container_registry.acr.login_server
  sensitive = true
}

output "CONTAINER_REGISTRY_NAME" {
  value     = azurerm_container_registry.acr.name
  sensitive = true
}

output "CONTAINER_REGISTRY_PASSWORD" {
  value     = azurerm_container_registry.acr.admin_password
  sensitive = true
}
