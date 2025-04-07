// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('dragAndDrop', { prevSubject: 'element' }, (subject, targetSelector) => {
  cy.wrap(subject).trigger('dragstart')
  cy.get(targetSelector).trigger('drop')
  cy.wrap(subject).trigger('dragend')
})