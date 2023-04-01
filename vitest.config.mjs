import { defineVitestConfig } from "nuxt-vitest/config";
export default defineVitestConfig({
  test: { include: ["./store/*test.ts"] },
});
