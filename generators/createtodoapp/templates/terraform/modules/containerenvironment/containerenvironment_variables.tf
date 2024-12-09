variable "location" {
  description = "The supported Azure location where the resource deployed"
  type        = string
}

variable "rg_name" {
  description = "The name of the resource group to deploy resources into"
  type        = string
}

variable "tags" {
  description = "A list of tags used for deployed services."
  type        = map(string)
}

variable "resource_token" {
  description = "A suffix string to centrally mitigate resource name collisions."
  type        = string
}

variable "workspace_id" {
  description = "The Workspace (or Customer) ID for the Log Analytics Workspace."
  type        = string
}

variable "workspace_primary_shared_key" {
  description = "The Workspace primary shared key for the Log Analytics Workspace."
  type        = string
}