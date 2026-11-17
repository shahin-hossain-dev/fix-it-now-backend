export default function (plop) {
  plop.setGenerator("module", {
    description: "Create an Express module",

    prompts: [
      {
        type: "input",
        name: "name",
        message: "Module name?",
      },
    ],

    actions: [
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/{{camelCase name}}.controller.ts",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/{{camelCase name}}.service.ts",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/{{camelCase name}}.routes.ts",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/{{camelCase name}}.interface.ts",
      },
      {
        type: "add",
        path: "src/modules/{{camelCase name}}/{{camelCase name}}.validation.ts",
      },
    ],
  });
}
