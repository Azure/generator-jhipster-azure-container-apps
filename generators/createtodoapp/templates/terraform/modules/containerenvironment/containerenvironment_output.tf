output "CONTAINER_ENV_NAME" {
  value     = azurerm_container_app_environment.env.name
  sensitive = true
}

output "CONTAINER_ENV_ID" {
  value     = azurerm_container_app_environment.env.id
  sensitive = true
}

output "DOMAIN" {
  value     = azurerm_container_app_environment.env.default_domain
}
