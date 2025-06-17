import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MERN Booking API",
            version: "1.0.0",
            description: "API documentation for MERN Booking App",
        },
        // servers: [
        //     {
        //         url: "http://localhost:8080/api",
        //     },
        // ],
    },
    apis: ["./src/modules/**/*.ts"], // Path to API docs
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
