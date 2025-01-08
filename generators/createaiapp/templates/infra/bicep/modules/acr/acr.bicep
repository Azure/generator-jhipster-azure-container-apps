import { roleAssignmentType, builtInRoleNames } from 'containerRegistryRolesDef.bicep'

@description('Required. Name of the Azure Container Registry')
param name string

@description('The location where the resources will be created.')
param location string = resourceGroup().location

@description('Optional. Tags of the resource.')
param tags object = {}

module umiAcrPull '../../modules/shared/userAssignedIdentity.bicep' = {
  name: 'umi-acr-pull'
  params: {
    name: 'umi-${name}-acrpull'
  }
}

// Contributor is needed to import ACR
module umiAcrContributor '../../modules/shared/userAssignedIdentity.bicep' = {
  name: 'umi-acr-contributor'
  params: {
    name: 'umi-${name}-contributor'
  }
}

var roleAssignments = [
    {
      principalId: umiAcrPull.outputs.principalId
      roleDefinitionIdOrName: builtInRoleNames.AcrPull
      principalType: 'ServicePrincipal'
    }
    {
      principalId: umiAcrContributor.outputs.principalId
      roleDefinitionIdOrName: builtInRoleNames.Contributor
      principalType: 'ServicePrincipal'
    }
  ]

module acr './containerRegistry.bicep' = {
  name: 'acr-${name}'
  params: {
    name: name
    location: location
    acrAdminUserEnabled: true
    roleAssignments: roleAssignments
    tags: tags
  }
}

output name string = acr.outputs.name
output loginServer string = acr.outputs.loginServer

output umiAcrPullId string = umiAcrPull.outputs.id
output umiAcrPullPrincipalId string = umiAcrPull.outputs.principalId
output umiAcrPullClientId string = umiAcrPull.outputs.clientId

output umiAcrContributorId string = umiAcrContributor.outputs.id
output umiAcrContributorPrincipalId string = umiAcrContributor.outputs.principalId
output umiAcrContributorClientId string = umiAcrContributor.outputs.clientId
