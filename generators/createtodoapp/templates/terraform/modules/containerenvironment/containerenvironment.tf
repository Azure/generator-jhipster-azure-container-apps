terraform {
  required_providers {
    azurerm = {
      version = "~>3.116.0"
      source  = "hashicorp/azurerm"
    }
    azurecaf = {
      source  = "aztfmod/azurecaf"
      version = "~>1.2.15"
    }
  }
}

# ------------------------------------------------------------------------------------------------------
# Deploy Azure Container Environment
# ------------------------------------------------------------------------------------------------------
resource "azurerm_container_app_environment" "env" {
  name                       = "cae-${var.resource_token}"
  location                   = var.location
  resource_group_name        = var.rg_name
  log_analytics_workspace_id = var.workspace_id
}
