import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name:'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis : ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/375px-Google_2015_logo.svg.png');
        }
    `,
    customSiteTitle: 'Documentación REST API Express / Typescript'
}

export default swaggerSpec
export {
    swaggerUiOptions
}