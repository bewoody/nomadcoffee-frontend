module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      url: "https://nomadcoffeee-backend.herokuapp.com/graphql",
    },
  },
};
