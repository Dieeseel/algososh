/// <reference types="cypress" />


describe('Функционал страницы String работает корректно', function() {
    beforeEach(function() {
        cy.visit('/recursion');
    });

    it('Кнопка добавления отключена при пустом инпуте', function() {
        if (cy.get('input').should('have.value', '')) {
            cy.get('[type="submit"]').should('have.attr', 'disabled');
        }
        cy.get('input').type('fact');
        cy.get('[type="submit"]').should('not.have.attr', 'disabled');
    });

    it('Функция разворота строки работает корректно', () => {
        cy.get('input').type('fact')
        cy.get('[type="submit"]').click()
        cy.get('[type="submit"]').find('img').should('have.attr', 'alt', 'Загрузка.');

        cy.get('[class^="circle_circle"]').each((element, index) => {
            if (index === 0) {
                cy.wrap(element).should('have.text', 'f')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_changing');
                    });
            }
            if (index === 1) {
                cy.wrap(element).should('have.text', 'a')
            }
            if (index === 2) {
                cy.wrap(element).should('have.text', 'c')
            }
            if (index === 3) {
                cy.wrap(element).should('have.text', 't')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_changing');
                    });
            }

        })
        
        cy.wait(1000)
        
        cy.get('[class^="circle_circle"]').each((element, index) => {
            if (index === 0) {
                cy.wrap(element).should('have.text', 't')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_modified');
                    });
            }
            if (index === 1) {
                cy.wrap(element).should('have.text', 'a')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_changing');
                    });
            }
            if (index === 2) {
                cy.wrap(element).should('have.text', 'c')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_changing');
                    });
            }
            if (index === 3) {
                cy.wrap(element).should('have.text', 'f')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_modified');
                    });
                
            }

        })

        cy.wait(1000)

        cy.get('[class^="circle_circle"]').each((element, index) => {
            if (index === 0) {
                cy.wrap(element).should('have.text', 't')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_modified');
                    });
            }
            if (index === 1) {
                cy.wrap(element).should('have.text', 'c')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_modified');
                    });
            }
            if (index === 2) {
                cy.wrap(element).should('have.text', 'a')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_modified');
                    });
            }
            if (index === 3) {
                cy.wrap(element).should('have.text', 'f')
                cy.wrap(element)
                    .invoke('attr', 'class')
                    .then(classAttribute => {
                        expect(classAttribute).to.contain('circle_modified');
                    });
            }

        })
    });
})