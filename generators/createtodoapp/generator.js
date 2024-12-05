import _ from 'lodash';
import chalk from 'chalk';
import BaseGenerator from 'generator-jhipster/generators/base';

export default class extends BaseGenerator {
  constructor(args, opts, features) {
    super(args, opts, features);
  }
  get [BaseGenerator.PROMPTING]() {
    return {
      ...super.prompting,
      async promptingTemplateTask() {
        const prompts = [
          {
            type: 'input',
            name: 'baseName',
            message: 'What is your application name?',
            default: 'azure-container-apps-todo',
          },
          {
            type: 'input',
            name: 'serverPort',
            message: 'On which port would you like your server to run?',
            default: 8080,
          },
          {
            type: 'input',
            name: 'packageName',
            message: 'What is your default java package name?',
            default: 'com.mycompany.myapp',
          },
          {
            type: 'list',
            name: 'prodDatabaseType',
            message: 'Which database would you like to use?',
            choices: ['postgresql', 'mongodb'],
            default: 'postgresql',
          },
        ];

        const props = await this.prompt(prompts, this.config);

        const baseName = this.jhipsterConfigWithDefaults.baseName;
        props.humanizedBaseName = baseName.toLowerCase() === 'jhipster' ? 'JHipster' : _.startCase(baseName);
        props.dasherizedBaseName = _.kebabCase(baseName);
        props.packageFolder = this.jhipsterConfigWithDefaults.packageFolder;

        this.todoAppProps = props;
      },
    };
  }

  get [BaseGenerator.WRITING]() {
    return {
      ...super.writing,
      async writingTemplateTask() {
        this.fs.copy(this.templatePath('src/web'), this.destinationPath('src/web/'));
        this.fs.copy(this.templatePath('src/web/.dockerignore'), this.destinationPath('src/web/.dockerignore'));
        this.fs.copy(this.templatePath('src/web/.eslintrc.cjs'), this.destinationPath('src/web/.eslintrc.cjs'));
        this.fs.copy(this.templatePath('src/api'), this.destinationPath('src/api/'));
        this.fs.copy(this.templatePath('src/api/.mvn'), this.destinationPath('src/api/.mvn'));
        this.fs.copy(this.templatePath('src/api/.openapi-generator'), this.destinationPath('src/api/.openapi-generator'));
        this.fs.copy(this.templatePath('infra/'), this.destinationPath('infra/'));

        const packageFolder = this.todoAppProps.packageFolder;

        var apiFiles = [
          {
            templates: [
              {
                file: 'dynamiccode/.vscode/launch.json',
                renameTo: () => `.vscode/launch.json`,
              },
              {
                file: 'dynamiccode/api/.openapi-generator/FILES',
                renameTo: () => `src/api/.openapi-generator/FILES`,
              },
              {
                file: 'dynamiccode/api/Dockerfile',
                renameTo: () => `src/api/Dockerfile`,
              },
              {
                file: 'dynamiccode/api/src/api/ApiUtil.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/api/ApiUtil.java`,
              },
              {
                file: 'dynamiccode/api/src/api/ItemsApi.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/api/ItemsApi.java`,
              },
              {
                file: 'dynamiccode/api/src/api/ListsApi.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/api/ListsApi.java`,
              },
              {
                file: 'dynamiccode/api/src/configuration/RFC3339DateFormat.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/configuration/RFC3339DateFormat.java`,
              },
              {
                file: 'dynamiccode/api/src/configuration/StringToTodoStateConverter.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/configuration/StringToTodoStateConverter.java`,
              },
              {
                file: 'dynamiccode/api/src/configuration/WebConfiguration.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/configuration/WebConfiguration.java`,
              },
              {
                file: 'dynamiccode/api/src/model/TodoState.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/model/TodoState.java`,
              },
              {
                file: 'dynamiccode/api/src/SimpleTodoApplication.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/SimpleTodoApplication.java`,
              },
              {
                file: 'dynamiccode/api/src/test/SimpleTodoApplicationTests.java',
                renameTo: () => `src/api/src/test/java/${packageFolder}/SimpleTodoApplicationTests.java`,
              },
              {
                file: 'dynamiccode/api/src/resources/application.properties',
                renameTo: () => `src/api/src/main/resources/application.properties`,
              },
              {
                file: 'dynamiccode/api/src/resources/application-cloud.properties',
                renameTo: () => `src/api/src/main/resources/application-cloud.properties`,
              },
              {
                file: 'dynamiccode/api/src/resources/application-local.properties',
                renameTo: () => `src/api/src/main/resources/application-local.properties`,
              },
              {
                file: 'dynamiccode/api/pom.xml',
                renameTo: () => `src/api/pom.xml`,
              },
              {
                file: 'dynamiccode/api/src/controller/TodoItemsController.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/controller/TodoItemsController.java`,
              },
              {
                file: 'dynamiccode/api/src/controller/TodoListsController.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/controller/TodoListsController.java`,
              },
              {
                file: 'dynamiccode/api/src/model/TodoItem.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/model/TodoItem.java`,
              },
              {
                file: 'dynamiccode/api/src/model/TodoList.java',
                renameTo: () => `src/api/src/main/java/${packageFolder}/model/TodoList.java`,
              },
              {
                file: 'dynamiccode/infra/db.bicep',
                renameTo: () => `infra/app/db.bicep`,
              },
              {
                file: 'dynamiccode/infra/main.bicep',
                renameTo: () => `infra/main.bicep`,
              },
            ],
          },
        ];

        if (this.todoAppProps.prodDatabaseType == 'mongodb') {
          apiFiles[0].templates.push({
            file: 'dynamiccode/api/src/configuration/MongoDBConfiguration.java',
            renameTo: () => `src/api/src/main/java/${packageFolder}/configuration/MongoDBConfiguration.java`,
          });
          apiFiles[0].templates.push(
            {
              file: 'dynamiccode/api/src/repository/mongodb/TodoItemRepository.java',
              renameTo: () => `src/api/src/main/java/${packageFolder}/repository/TodoItemRepository.java`,
            },
            {
              file: 'dynamiccode/api/src/repository/mongodb/TodoListRepository.java',
              renameTo: () => `src/api/src/main/java/${packageFolder}/repository/TodoListRepository.java`,
            },
          );
        } else if (this.todoAppProps.prodDatabaseType == 'postgresql') {
          apiFiles[0].templates.push(
            {
              file: 'dynamiccode/api/src/repository/psql/TodoItemRepository.java',
              renameTo: () => `src/api/src/main/java/${packageFolder}/repository/TodoItemRepository.java`,
            },
            {
              file: 'dynamiccode/api/src/repository/psql/TodoListRepository.java',
              renameTo: () => `src/api/src/main/java/${packageFolder}/repository/TodoListRepository.java`,
            },
          );
        }

        await this.writeFiles({
          sections: {
            base: [
              {
                templates: [
                  { file: 'azure.yaml', noEjs: true },
                  { file: '.gitattributes', noEjs: true },
                  { file: '.gitignore', noEjs: false },
                  { file: 'LICENSE', noEjs: true },
                  { file: 'README.md', noEjs: true },
                  { file: '.devcontainer/devcontainer.json', noEjs: true },
                  { file: '.github/workflows/azure-dev.yml', noEjs: true },
                  { file: '.github/workflows/terraform/azure-dev.yml', noEjs: true },
                  { file: 'assets/web.png', noEjs: true },
                  { file: 'assets/resources.png', noEjs: true },
                  { file: 'assets/resources-with-apim.png', noEjs: true },
                  { file: 'assets/urls.png', noEjs: true },
                  { file: '.vscode/extensions.json', noEjs: true },
                  { file: '.vscode/tasks.json', noEjs: true },
                  { file: 'OPTIONAL_FEATURES.md', noEjs: true },
                ],
              },
            ],
            api: apiFiles,
          },
          context: this.todoAppProps,
        });
      },
    };
  }

  get [BaseGenerator.END]() {
    return {
      ...super.end,
      afterRunHook() {
        const artifactName = this.todoAppProps.dasherizedBaseName + '-web';
        this.log(`
          ${chalk.greenBright('The TODO template has been created successfully! 🎉')}

          ${chalk.magentaBright(`Run locally:`)}
          ${chalk.cyan(`    You can build manually under src/api with:`)}
          ${chalk.cyan(`    mvn clean package -DskipTests`)}
          ${chalk.cyan(`    java -jar target/{artifactname}-0.0.1-SNAPSHOT.jar`)}
          ${chalk.whiteBright(`    Back-end url: http://localhost:3100/`)}

          ${chalk.cyan(`    You can build manually under src/web with:`)}
          ${chalk.cyan(`    npm install`)}
          ${chalk.cyan(`    npm run dev`)}
          ${chalk.whiteBright(`    Front-end url: http://localhost:3000/`)}

          ${chalk.magentaBright(`Deploy on Azure Container Apps with:`)}
          ${chalk.cyan(`    azd up`)}

          ${chalk.magentaBright(`Do you know that Azure Container Apps has built-in support for Java?`)}
          ${chalk.whiteBright(`    https://learn.microsoft.com/azure/container-apps/java-overview`)}
        `);
      },
    };
  }
}
