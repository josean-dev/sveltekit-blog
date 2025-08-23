// See https://kit.svelte.dev/docs/types#app

import type { Session, User } from "better-auth";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      session: Session;
      user: User;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
