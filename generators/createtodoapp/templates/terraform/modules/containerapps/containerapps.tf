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
    azapi = {
      source = "Azure/azapi"
      version = "~>1.1.0"
    }
  }
}

data "azurerm_subscription" "current" {}

# ------------------------------------------------------------------------------------------------------
# Deploy Azure Container Apps
# ------------------------------------------------------------------------------------------------------
resource "azapi_resource" "container_apps" {
  type = "Microsoft.App/containerApps@2022-03-01"
  name                = var.name
  location = var.location
  parent_id = "/subscriptions/${data.azurerm_subscription.current.subscription_id}/resourceGroups/${var.rg_name}"
  tags = var.tags

  dynamic "identity" {
    for_each = { for k, v in var.identity : k => v if var.identity != [] }
    content {
      type = identity.value["type"]
    }
  }

  body = jsonencode({
    properties = {
      managedEnvironmentId = var.container_env_id
      configuration = {
        activeRevisionsMode = "Single"
        ingress = {
          external = true
          targetPort = var.target_port
          transport = "auto"
        }
        secrets = [
          {
            name = "registry-password"
            value = var.container_registry_pwd
          }
        ]
        registries = [
          {
            passwordSecretRef = "registry-password"
            server = "${var.container_registry_name}.azurecr.io"
            username = var.container_registry_name
          }
        ]
      }
      template = {
        containers = [
          {
            env = var.env
            image = length(var.image_name) == 0 ? "nginx:latest" : var.image_name
            name = var.name
            resources = {
              cpu = var.cpu
              memory = var.memory
            }
          }
        ]
      }
    }
  })

  response_export_values = ["*"]
}
