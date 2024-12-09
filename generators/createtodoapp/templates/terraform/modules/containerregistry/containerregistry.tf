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
# Deploy Azure Container Registry
# ------------------------------------------------------------------------------------------------------
resource "azurecaf_name" "registry_name" {
  name          = var.resource_token
  resource_type = "azurerm_container_registry"
  random_length = 0
  clean_input   = true
}

resource "azurerm_container_registry" "acr" {
  name                = azurecaf_name.registry_name.result
  resource_group_name = var.rg_name
  location            = var.location
  sku                 = "Standard"
  admin_enabled       = true
  public_network_access_enabled = true
  data_endpoint_enabled = false
  anonymous_pull_enabled = false
  network_rule_bypass_option = "AzureServices"
  zone_redundancy_enabled = false
}
