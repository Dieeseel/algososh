/// <reference types="cypress" />


describe('Функционал страницы String работает корректно', function() {
    beforeEach(function() {
        cy.visit('/fibonacci');
    });

    it('Кнопка запуска отключена при пустом инпуте', function() {
        if (cy.get("[type='number']").should('have.value', '')) {
            cy.get('[type="submit"]').should('have.attr', 'disabled');
        }
        cy.get("[type='number']").type('5');
        cy.get('[type="submit"]').should('not.have.attr', 'disabled');
    });

    it('Функция последовательности Фибоначчи работает корректно', () => {
        cy.get("[type='number']").type('5');
        cy.get('[type="submit"]').click()
        
        cy.get('[type="submit"]').find('img').should('have.attr', 'alt', 'Загрузка.');
        cy.get('[class^="circle_circle"]').each((element, index) => {
            if (index == 0) {
                cy.wrap(element).should('have.text', '1')
            }
        })

        cy.wait(500)

        cy.get('[class^="circle_circle"]').each((element, index) => {
            if (index == 0) {
                cy.wrap(element).should('have.text', '1')
            }
            if (index == 1) {
                cy.wrap(element).should('have.text', '1')
            }
        })

        cy.wait(500)

        cy.get('[class^="circle_circle"]').each((element, index) => {
            if (index == 0) {
                cy.wrap(element).should('have.text', '1')
            }
            if (index == 1) {
                cy.wrap(element).should('have.text', '1')
            }
            if (index == 2) {
                cy.wrap(element).should('have.text', '2')
            }
        })

        cy.wait(500)

        cy.get('[class^="circle_circle"]').each((element, index) => {
            if (index == 0) {
                cy.wrap(element).should('have.text', '1')
            }
            if (index == 1) {
                cy.wrap(element).should('have.text', '1')
            }
            if (index == 2) {
                cy.wrap(element).should('have.text', '2')
            }
            if (index == 3) {
                cy.wrap(element).should('have.text', '3')
            }
        })

        cy.wait(500)

        cy.get('[class^="circle_circle"]').each((element, index) => {
            if (index == 0) {
                cy.wrap(element).should('have.text', '1')
            }
            if (index == 1) {
                cy.wrap(element).should('have.text', '1')
            }
            if (index == 2) {
                cy.wrap(element).should('have.text', '2')
            }
            if (index == 3) {
                cy.wrap(element).should('have.text', '3')
            }
            if (index == 4) {
                cy.wrap(element).should('have.text', '5')
            }
        })
    });
})