output "LOGANALYTICS_WORKSPACE_ID" {
  value = azurerm_log_analytics_workspace.workspace.id
}

output "LOGANALYTICS_WORKSPACE_CUSTOMER_ID" {
  value = azurerm_log_analytics_workspace.workspace.workspace_id
}

output "LOGANALYTICS_PRIMARY_ID" {
  value = azurerm_log_analytics_workspace.workspace.primary_shared_key
}