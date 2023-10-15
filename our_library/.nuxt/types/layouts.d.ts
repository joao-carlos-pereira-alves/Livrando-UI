import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "navbar" | "book-component" | "chat-component" | "profile-header-component" | "profile-negociation-component" | "profile-review-component"
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}