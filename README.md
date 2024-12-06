<div align="center">
    <a>
        <img width="380" height="230" src="https://raw.githubusercontent.com/Azure/generator-jhipster-azure-container-apps/main/logo.png">
    </a>
    <h1>JHipster Azure Container Apps</h1>
</div>

---

[![NPM version][npm-image]][npm-url]

# Introduction

JHipster Azure Container Apps enables developers to rapidly create and deploy full-stack Java applications on [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/java-overview) with minimal steps. This integration simplifies the deployment process, allowing seamless scalability and management for both frontend, backend and database services on Azure.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster basic knowledge:

- [JHipster](https://www.jhipster.tech/)

The following prerequisites arer equired to run this application locally. Please ensure that you have them all installed locally.

- [Java 17 or later](https://learn.microsoft.com/en-us/java/openjdk/install) - for API backend
- [Node.js](https://nodejs.org/) - for the Web frontend
- [Maven](https://maven.apache.org/download.cgi) - for local build

The following prerequisites arer equired to deploy this application to Azure.

- Azure Subscription: [Try Azure Container Apps for free](https://azure.microsoft.com/products/container-apps#Pricing). You can start with the free tier: The first 180,000 vCPU per second, 360,000 GiB/s, and 2 million requests each month are free.
- [Docker](https://www.docker.com/)

## 🚀 Get Started

```bash
npm install -g generator-jhipster-azure-container-apps
```

## 🚁 How to run locally

To use JHipster Azure Container Apps, run the below command

```bash
jhipster-azure-container-apps
```

You can look for updated azure-container-apps blueprint specific options by running

```bash
jhipster-azure-container-apps app --help
```

To run locally:

- For back-end, you can build manually under src/api with:

```bash
mvn clean package -DskipTests
java -jar target/{artifactname}-0.0.1-SNAPSHOT.jar
```

- The back-end can be accessed at:

```text
http://localhost:3100/
```

- For front-end, you can build manually under src/web with:

```bash
npm install
npm run dev
```

- The front-end can be accessed at:

```text
http://localhost:3000/
```

## 🎉 How to deploy on Azure with [free grants](<(https://azure.microsoft.com/products/container-apps#Pricing)>)

JHipster Azure Container Apps provides multiple ways to deploy on Azure, you can deploy with the built-in [Terraform](https://www.terraform.io/), [Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview?tabs=bicep), [Azure Developer CLI(AZD)](https://learn.microsoft.com/azure/developer/azure-developer-cli/) or directly from [source code](https://learn.microsoft.com/azure/container-apps/java-get-started?pivots=jar).

### Terraform

1. Make sure you marked `Terraform` when generating the project.
1. Make sure you have [Terraform](https://learn.microsoft.com/azure/developer/terraform/quickstart-configure) installed and configured.
1. Change into the Terraform folder: `cd terraform`
1. Run the following command to initialize Terraform:
   </br> `terraform init`
1. Once finished, privision the necessary resource on Azure with:
   </br> `terraform apply -auto-approve`
1. Now you can deploy the project with:
   - Linux/MacOS: `.\deploy.sh`. You can run the deployment script by adding options `subId`, `region` and `resourceGroupName`.
   - Windows: `.\deploy.ps1`. You will be prompted to provide `subId`, `region`, and `resourceGroupName`.

### Bicep

1. Make sure you marked `Bicep` when generating the project.
1. Make sure you have [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed and configured.
1. Change into the bicep folder: `cd bicep`
1. Setup bicep with:
</br> `az deployment sub create -f ./main.bicep --location=eastus2 --name jhipster-aca --only-show-errors`
</br> Here you can replace the `location` and the `name` parameters with your own choices.
1. Now you can deploy the project with:
   - Linux/MacOS: `.\deploy.sh`. You can run the deployment script by adding options `subId`, `region` and `resourceGroupName`.
   - Windows: `.\deploy.ps1`. You will be prompted to provide `subId`, `region`, and `resourceGroupName`.

### Azure Developer CLI(AZD)

1. Make sure you have [Azure Developer CLI](https://aka.ms/azd-install) installed and configured.
1. Log in to AZD, only required once per-install.
   </br> `azd auth login`
   - If you are on Windows, install [powershell](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-on-windows)
1. Navigate to the generated project directory and run
   </br>`azd up`
   </br> **Make sure your docker is running when executing this.**

After the command is executed, you can see the following log signs that the deployment was successful.

```text
SUCCESS: Your up workflow to provision and deploy to Azure completed in <deployment-time>.
```

### Deploy from artifact, source code, IDE and more

In addition to the options mentioned, Azure Container Apps offers a variety of deployment methods, all simplified by its built-in Java support. Explore how to easily deploy your project by visiting: [Launch your first Java application in Azure Container Apps](https://learn.microsoft.com/azure/container-apps/java-get-started).

The output **Deploying service api** and **Deploying service web** are the endpoints to access the todo application.

## ❤️ Next Steps

Azure Container Apps has built-in Java support to enhance your Java applications with automatic memory fitting, diagnostics and managed spring componnets, [learn more](https://learn.microsoft.com/azure/container-apps/java-overview).
You can easily turn on the Java support feature by clicking on the **manage** of the Development stack and choose **Java** on your overview page.
![Java Stack](./javastack.png).

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-azure-container-apps.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-azure-container-apps
[github-generator-image]: https://github.com/jhipster/generator-jhipster-azure-container-apps/actions/workflows/generator.yml/badge.svg
[github-generator-url]: https://github.com/jhipster/generator-jhipster-azure-container-apps/actions/workflows/generator.yml
[github-samples-image]: https://github.com/jhipster/generator-jhipster-azure-container-apps/actions/workflows/samples.yml/badge.svg
[github-samples-url]: https://github.com/jhipster/generator-jhipster-azure-container-apps/actions/workflows/samples.yml
