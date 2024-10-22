/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    openModal(): Chainable<void>;
    getModal(): Chainable<JQuery<HTMLElement>>
    getBun(): Chainable<JQuery<HTMLElement>>
    getMainIngredient(): Chainable<JQuery<HTMLElement>>
    getSauce(): Chainable<JQuery<HTMLElement>>
    getOverlay(): Chainable<JQuery<HTMLElement>>
    addCookie(): Chainable<void>;
    addRefreshToken(): Chainable<void>;
  }
}
