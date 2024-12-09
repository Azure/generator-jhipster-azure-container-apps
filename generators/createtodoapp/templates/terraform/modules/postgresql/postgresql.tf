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
# Deploy PostgreSQL Server
# ------------------------------------------------------------------------------------------------------
resource "azurecaf_name" "psql" {
  name          = var.resource_token
  resource_type = "azurerm_postgresql_flexible_server"
  random_length = 0
  clean_input   = true
}

resource "azurerm_postgresql_flexible_server" "psqlServer" {
  name                            = azurecaf_name.psql.result
  location                        = var.location
  resource_group_name             = var.rg_name
  tags                            = var.tags
  version                         = "12"
  administrator_login             = var.administrator_login
  administrator_password          = var.administrator_password
  zone                            = "1"

  storage_mb                      = 32768

  sku_name                        = "GP_Standard_D4s_v3"
}


resource "azurerm_postgresql_flexible_server_firewall_rule" "firewall_rule" {
  name                            = "AllowAllFireWallRule"
  server_id                       = azurerm_postgresql_flexible_server.psqlServer.id
  start_ip_address                = "0.0.0.0"
  end_ip_address                  = "255.255.255.255"
}

resource "azurerm_postgresql_flexible_server_database" "database" {
  name      = var.database_name
  server_id = azurerm_postgresql_flexible_server.psqlServer.id
  collation = "en_US.utf8"
  charset   = "utf8"
}

resource "azurerm_postgresql_flexible_server_configuration" "configurations" {
  name      = "azure.extensions"
  server_id = azurerm_postgresql_flexible_server.psqlServer.id
  value     = "UUID-OSSP"
}


