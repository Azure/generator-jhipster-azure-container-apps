variable "location" {
  description = "The supported Azure location where the resource deployed"
  type        = string
}

variable "environment_name" {
  description = "The name of resource group"
  type        = string
}

variable "web_image_name" {
  description = "Web App Image name"
  type        = string
  default     = "nginx:latest"
}

variable "api_image_name" {
  description = "API App Image name"
  type        = string
  default     = "nginx:latest"
}
