import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options = {
    definition : {
        openapi : '3.0.1',
        info: {
            title: 'FoodCrud TS',
            version: '1.0.0'
        },
        servers: [
            {
                url: '/api/v1'
            },
        ],
    },
    
    apis: ['src/utils/specification.yaml']
} 
const swaggerSpec = swaggerJsDoc(options);

export default (path:any, app:any) => app.use(path, swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));