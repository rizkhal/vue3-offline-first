export default {
  version: 0,
  description: "Contact schema",
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    name: {
      type: "string",
    },
    company_name: {
      type: "string",
    },
  },
};
