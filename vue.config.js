module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/index.scss";`,
        additionalData: `
          @import "@/assets/styles/_variables.scss";
        `,
      },
    },
  },
};
