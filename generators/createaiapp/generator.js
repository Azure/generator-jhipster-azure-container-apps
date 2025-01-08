import _ from 'lodash';
import chalk from 'chalk';
import BaseGenerator from 'generator-jhipster/generators/base';

export default class extends BaseGenerator {
  constructor(args, opts, features) {
    super(args, opts, features);
  }

  get [BaseGenerator.CONFIGURING]() {
    return this.asConfiguringTaskGroup({
      async configuringTemplateTask() {
        this.jhipsterConfig.azureApplicationType = "AI";
      },
    });
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
            default: 'azure-container-apps-ai',
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
        ];

        const props = await this.prompt(prompts, this.config);

        const baseName = this.jhipsterConfigWithDefaults.baseName;
        props.humanizedBaseName = baseName.toLowerCase() === 'jhipster' ? 'JHipster' : _.startCase(baseName);
        props.dasherizedBaseName = _.kebabCase(baseName);
        props.packageFolder = this.jhipsterConfigWithDefaults.packageFolder;

        this.todoAIProps = props;
      },
    };
  }

  get [BaseGenerator.WRITING]() {
    return {
      ...super.writing,
      async writingTemplateTask() {
        this.fs.copy(this.templatePath('src/main/resources/'), this.destinationPath('src/main/resources/'));
        this.fs.copy(this.templatePath('infra/'), this.destinationPath('infra/'));
        this.fs.copy(this.templatePath('gradle/'), this.destinationPath('gradle/'));
        this.fs.copy(this.templatePath('.github/'), this.destinationPath('.github/'));
        this.fs.copy(this.templatePath('.mvn/'), this.destinationPath('.mvn/'));
        this.fs.copy(this.templatePath('docs/'), this.destinationPath('docs/'));
        this.fs.copy(this.templatePath('src/checkstyle/'), this.destinationPath('src/checkstyle/'));
        this.fs.copy(this.templatePath('src/main/scss/'), this.destinationPath('src/main/scss/'));

        const packageFolder = this.todoAIProps.packageFolder;

        var apiFiles = [
          {
            templates: [
              {
                file: 'dynamiccode/Dockerfile',
                renameTo: () => `Dockerfile`,
              },
              {
                file: 'dynamiccode/pom.xml',
                renameTo: () => `pom.xml`,
              },
              {
                file: 'dynamiccode/readme.md',
                renameTo: () => `readme.md`,
              },
              {
                file: 'dynamiccode/src/main/resources/application.properties',
                renameTo: () => `src/main/resources/application.properties`,
              },
              {
                file: 'dynamiccode/infra/main.bicep',
                renameTo: () => `infra/bicep/main.bicep`,
              },
              {
                file: 'dynamiccode/infra/petclinic.bicep',
                renameTo: () => `infra/bicep/modules/app/petclinic.bicep`,
              },
              {
                file: 'dynamiccode/infra/containerapp.bicep',
                renameTo: () => `infra/bicep/modules/containerapps/containerapp.bicep`,
              },
              {
                file: 'dynamiccode/src/main/java/conditions/ConditionalOnPropertyNotEmpty.java',
                renameTo: () => `src/main/java/${packageFolder}/conditions/ConditionalOnPropertyNotEmpty.java`,
              },
              {
                file: 'dynamiccode/src/main/java/conditions/PropertySpecifiedAndNotEmptyCondition.java',
                renameTo: () => `src/main/java/${packageFolder}/conditions/PropertySpecifiedAndNotEmptyCondition.java`,
              },
              {
                file: 'dynamiccode/src/main/java/genai/AIDataProvider.java',
                renameTo: () => `src/main/java/${packageFolder}/genai/AIDataProvider.java`,
              },
              {
                file: 'dynamiccode/src/main/java/genai/AIFunctionConfiguration.java',
                renameTo: () => `src/main/java/${packageFolder}/genai/AIFunctionConfiguration.java`,
              },
              {
                file: 'dynamiccode/src/main/java/genai/ChatAuthProperties.java',
                renameTo: () => `src/main/java/${packageFolder}/genai/ChatAuthProperties.java`,
              },
              {
                file: 'dynamiccode/src/main/java/genai/ChatConfiguration.java',
                renameTo: () => `src/main/java/${packageFolder}/genai/ChatConfiguration.java`,
              },
              {
                file: 'dynamiccode/src/main/java/genai/ChatOptionsProperties.java',
                renameTo: () => `src/main/java/${packageFolder}/genai/ChatOptionsProperties.java`,
              },
              {
                file: 'dynamiccode/src/main/java/genai/ModeledQuestionAnswerAdvisor.java',
                renameTo: () => `src/main/java/${packageFolder}/genai/ModeledQuestionAnswerAdvisor.java`,
              },
              {
                file: 'dynamiccode/src/main/java/genai/PetclinicChatClient.java',
                renameTo: () => `src/main/java/${packageFolder}/genai/PetclinicChatClient.java`,
              },
              {
                file: 'dynamiccode/src/main/java/genai/VectorStoreController.java',
                renameTo: () => `src/main/java/${packageFolder}/genai/VectorStoreController.java`,
              },
              {
                file: 'dynamiccode/src/main/java/model/BaseEntity.java',
                renameTo: () => `src/main/java/${packageFolder}/model/BaseEntity.java`,
              },
              {
                file: 'dynamiccode/src/main/java/model/NamedEntity.java',
                renameTo: () => `src/main/java/${packageFolder}/model/NamedEntity.java`,
              },
              {
                file: 'dynamiccode/src/main/java/model/package-info.java',
                renameTo: () => `src/main/java/${packageFolder}/model/package-info.java`,
              },
              {
                file: 'dynamiccode/src/main/java/model/Person.java',
                renameTo: () => `src/main/java/${packageFolder}/model/Person.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/Owner.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/Owner.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/OwnerController.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/OwnerController.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/OwnerRepository.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/OwnerRepository.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/Pet.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/Pet.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/PetController.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/PetController.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/PetType.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/PetType.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/PetTypeFormatter.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/PetTypeFormatter.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/PetValidator.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/PetValidator.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/Visit.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/Visit.java`,
              },
              {
                file: 'dynamiccode/src/main/java/owner/VisitController.java',
                renameTo: () => `src/main/java/${packageFolder}/owner/VisitController.java`,
              },
              {
                file: 'dynamiccode/src/main/java/system/CacheConfiguration.java',
                renameTo: () => `src/main/java/${packageFolder}/system/CacheConfiguration.java`,
              },
              {
                file: 'dynamiccode/src/main/java/system/CrashController.java',
                renameTo: () => `src/main/java/${packageFolder}/system/CrashController.java`,
              },
              {
                file: 'dynamiccode/src/main/java/system/WelcomeController.java',
                renameTo: () => `src/main/java/${packageFolder}/system/WelcomeController.java`,
              },
              {
                file: 'dynamiccode/src/main/java/vet/Specialty.java',
                renameTo: () => `src/main/java/${packageFolder}/vet/Specialty.java`,
              },
              {
                file: 'dynamiccode/src/main/java/vet/Vet.java',
                renameTo: () => `src/main/java/${packageFolder}/vet/Vet.java`,
              },
              {
                file: 'dynamiccode/src/main/java/vet/VetController.java',
                renameTo: () => `src/main/java/${packageFolder}/vet/VetController.java`,
              },
              {
                file: 'dynamiccode/src/main/java/vet/VetRepository.java',
                renameTo: () => `src/main/java/${packageFolder}/vet/VetRepository.java`,
              },
              {
                file: 'dynamiccode/src/main/java/vet/Vets.java',
                renameTo: () => `src/main/java/${packageFolder}/vet/Vets.java`,
              },
              {
                file: 'dynamiccode/src/main/java/PetClinicApplication.java',
                renameTo: () => `src/main/java/${packageFolder}/PetClinicApplication.java`,
              },
              {
                file: 'dynamiccode/src/main/java/PetClinicRuntimeHints.java',
                renameTo: () => `src/main/java/${packageFolder}/PetClinicRuntimeHints.java`,
              },
              {
                file: 'dynamiccode/src/test/jmeter/petclinic_test_plan.jmx',
                renameTo: () => `src/test/jmeter/petclinic_test_plan.jmx`,
              },
              {
                file: 'dynamiccode/src/test/model/ValidatorTests.java',
                renameTo: () => `src/test/java/${packageFolder}/model/ValidatorTests.java`,
              },
              {
                file: 'dynamiccode/src/test/owner/OwnerControllerTests.java',
                renameTo: () => `src/test/java/${packageFolder}/owner/OwnerControllerTests.java`,
              },
              {
                file: 'dynamiccode/src/test/owner/PetControllerTests.java',
                renameTo: () => `src/test/java/${packageFolder}/owner/PetControllerTests.java`,
              },
              {
                file: 'dynamiccode/src/test/owner/PetTypeFormatterTests.java',
                renameTo: () => `src/test/java/${packageFolder}/owner/PetTypeFormatterTests.java`,
              },
              {
                file: 'dynamiccode/src/test/owner/VisitControllerTests.java',
                renameTo: () => `src/test/java/${packageFolder}/owner/VisitControllerTests.java`,
              },
              {
                file: 'dynamiccode/src/test/service/ClinicServiceTests.java',
                renameTo: () => `src/test/java/${packageFolder}/service/ClinicServiceTests.java`,
              },
              {
                file: 'dynamiccode/src/test/service/EntityUtils.java',
                renameTo: () => `src/test/java/${packageFolder}/service/EntityUtils.java`,
              },
              {
                file: 'dynamiccode/src/test/system/CrashControllerIntegrationTests.java',
                renameTo: () => `src/test/java/${packageFolder}/system/CrashControllerIntegrationTests.java`,
              },
              {
                file: 'dynamiccode/src/test/system/CrashControllerTests.java',
                renameTo: () => `src/test/java/${packageFolder}/system/CrashControllerTests.java`,
              },
              {
                file: 'dynamiccode/src/test/vet/VetControllerTests.java',
                renameTo: () => `src/test/java/${packageFolder}/vet/VetControllerTests.java`,
              },
              {
                file: 'dynamiccode/src/test/vet/VetTests.java',
                renameTo: () => `src/test/java/${packageFolder}/vet/VetTests.java`,
              },
              {
                file: 'dynamiccode/src/test/BaseIntegrationTest.java',
                renameTo: () => `src/test/java/${packageFolder}/BaseIntegrationTest.java`,
              },
              {
                file: 'dynamiccode/src/test/MySqlIntegrationTests.java',
                renameTo: () => `src/test/java/${packageFolder}/MySqlIntegrationTests.java`,
              },
              {
                file: 'dynamiccode/src/test/MysqlTestApplication.java',
                renameTo: () => `src/test/java/${packageFolder}/MysqlTestApplication.java`,
              },
              {
                file: 'dynamiccode/src/test/PetClinicIntegrationTests.java',
                renameTo: () => `src/test/java/${packageFolder}/PetClinicIntegrationTests.java`,
              },
              {
                file: 'dynamiccode/src/test/PostgresIntegrationTests.java',
                renameTo: () => `src/test/java/${packageFolder}/PostgresIntegrationTests.java`,
              },
            ],
          },
        ];

        await this.writeFiles({
          sections: {
            base: [
              {
                templates: [
                  { file: '.editorconfig', noEjs: true },
                  { file: '.gitattributes', noEjs: true },
                  { file: '.gitignore', noEjs: false },
                  { file: '.gitpod.yml', noEjs: true },
                  { file: 'azure.yaml', noEjs: true },
                  { file: 'build.gradle', noEjs: true },
                  { file: 'docker-compose.yml', noEjs: true },
                  { file: 'gradlew', noEjs: true },
                  { file: 'gradlew.bat', noEjs: true },
                  { file: 'LICENSE.txt', noEjs: true },
                  { file: 'mvnw', noEjs: true },
                  { file: 'mvnw.cmd', noEjs: true },
                  { file: 'settings.gradle', noEjs: true },
                ],
              },
            ],
            api: apiFiles,
          },
          context: this.todoAIProps,
        });
      },
    };
  }

  get [BaseGenerator.END]() {
    return {
      ...super.end,
      afterRunHook() {
        this.log(`
          ${chalk.greenBright('The AI template has been created successfully! 🎉')}
        `);
      },
    };
  }
}
