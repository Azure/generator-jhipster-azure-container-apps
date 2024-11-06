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

variable "identity" {
  description = "A list of application identity"
  type        = list(any)
  default     = []
}

variable "name" {
  description = "Name of Container App"
  type        = string
}

variable "container_env_id" {
  description = "Identity of Container Environment"
  type        = string
}

variable "container_registry_pwd" {
  description = "Container Environment password"
  type        = string
}

variable "target_port" {
  description = "Exposed port of Container App"
  type        = number
}

variable "container_registry_name" {
  description = "Container Environment name"
  type        = string
}

variable "image_name" {
  description = "Image name apply to Container App"
  type        = string
  default = "nginx:latest"
}

variable "env" {
  description = "Environment variables of Container App"
  type        = list(any)
  default = []
}

variable "cpu" {
  description = "CPU of Container App"
  type        = number
  default = 0.5
}

variable "memory" {
  description = "Memory of Container App"
  type        = string
  default = "1.0Gi"
}
