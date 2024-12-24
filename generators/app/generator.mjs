import chalk from 'chalk';
import AppGenerator from 'generator-jhipster/generators/app';

export default class extends AppGenerator {
  constructor(args, opts, features) {
    super(args, opts, features);

    if (this.options.help) return;

    if (!this.jhipsterContext) {
      throw new Error(
        `This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints azure-container-apps')}`,
      );
    }
  }

  get [AppGenerator.PROMPTING]() {
    return {
      async promptingTemplateTask() {
        const prompts = [
          {
            type: 'list',
            name: 'azureApplicationType',
            message: 'Which application type do you want to create?',
            choices: ['AI', 'WEB'],
            default: 'AI',
          },
        ];

        const props = await this.prompt(prompts, this.config);
        this.azureApplicationProps = props;
      },
    };
  }

  get [AppGenerator.COMPOSING]() {
    return {
      async composeAzureContainerApps() {
        if (this.azureApplicationProps.azureApplicationType === 'AI') {
          await this.composeWithJHipster(`jhipster-azure-container-apps:createaiapp`, true);
        } else if (this.azureApplicationProps.azureApplicationType === 'WEB') {
          await this.composeWithJHipster(`jhipster-azure-container-apps:createtodoapp`, true);
        } else {
          return;
        }
      },
    };
  }
}
