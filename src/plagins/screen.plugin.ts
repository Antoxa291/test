import { App } from "vue";

export interface ScreenModule {
  setTypeScreen: () => void;
}

export default {
  install(app: App, px: number): void {
    // TO DO: Temporary implementation. Need extend functionality for all screens sizes
    const setTypeScreen = (): void => {
      switch (true) {
        case px <= window.innerWidth:
          app.config.globalProperties.$isMobile = false;
          break;
        case px >= window.innerWidth:
          app.config.globalProperties.$isMobile = true;
          break;
      }
    };
    window.addEventListener("resize", setTypeScreen);
    setTypeScreen();
  },
};

declare module "@vue/runtime-core" {
  //Bind to `this` keyword
  interface ComponentCustomProperties {
    $screen: ScreenModule;
  }
}
