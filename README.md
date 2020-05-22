# Image Filtering Microservice

It is a Node-Express application which runs a simple script to process images.

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`

2. Run the development server with `npm run dev`

### Creating a new endpoint in the server.ts file

Few helper functions to handle some of these work are imported at the top of the `./src/server.ts` file.

```typescript
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
```

### Endpoint Testing Postman

Root directory of project contains `image-filter.postman_collection.json` collection file. Import collection in Postman to test endpoint.

### Deploying Application on AWS Elastic BeanStalk

1. Setup ElasticBean CLI on your machine. ([Setup Instructions](https://github.com/aws/aws-elastic-beanstalk-cli-setup))
2. After installing CLI, use `eb init` command to initialize repository. After running the `eb init` command and following the guided setup will create a new directory in our project named `.elasticbeanstalk`.
3. Within this configuration file, there is a configuration file named `config.yml`. This is the set of instructions Elastic Beanstalk will follow when provisioning your AWS infrastructure and deploying your code. Add following configuration to `config.yml` file.

```
deploy:
    artifact: ./www/Archive.zip
```

4.  Create deployable Build Archive by using `npm run build` command.
5.  Create an environment running a sample application with the `eb create` command. This command creates a load-balanced environment with the default settings for the Node.js platform and provision resources.

### Screenshot

Navigate to `./deployment_screenshots` directory which contains screenshot of application and deployment on AWS Elastic Beanstalk.
