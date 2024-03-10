/// <reference types="cypress" />

describe('Функционал страницы Stack работает корректно', function() {
    beforeEach(function() {
        cy.visit('/stack');
    });

    it('Кнопка запуска отключена при пустом инпуте', function() {
        if (cy.get("[type='text']").should('have.value', '')) {
            cy.contains('Добавить').should('have.attr', 'disabled');
        }
        cy.get("[type='text']").type('5');
        cy.contains('Добавить').should('not.have.attr', 'disabled');
    });

    it('Функция добавления элемента в стэк работает корректно', function() {
        cy.get("[type='text']").as('input')
        cy.contains('Добавить').as('addButton')
        
        cy.get("@input").type('5')
        cy.get('@addButton').click()

        cy.get('@addButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.get('[class^="circle_content"]').should('have.length', 1)
        cy.get('[class^="circle_content"]').then((element) => {
            cy.wrap(element).find('[class*="circle_head"]').should('have.text', 'top')
            cy.wrap(element).find('[class*="circle_index"]').should('have.text', '0')
    
            cy.wrap(element).find('[class*="circle_circle"]').contains('5')
            cy.wrap(element)
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
            
            cy.wait(500)

            cy.wrap(element)
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_default');
                });
            cy.get('@addButton').find('img').should('not.exist')
        })


        cy.get("input").type('1')
        cy.get('@addButton').click()

        cy.get('@addButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.get('[class^="circle_content"]').should('have.length', 2)
        cy.get('[class^="circle_content"]').then((element) => {
            cy.wrap(element[1]).find('[class*="circle_head"]').should('have.text', 'top')
            cy.wrap(element[1]).find('[class*="circle_index"]').should('have.text', '1')
            cy.wrap(element[0]).find('[class*="circle_index"]').should('have.text', '0')
            

            cy.wrap(element[0]).find('[class*="circle_circle"]').contains('5')
            cy.wrap(element[1]).find('[class*="circle_circle"]').contains('1')
            cy.wrap(element[1])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
            
            cy.wait(500)

            cy.wrap(element[1])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_default');
                });
            cy.get('@addButton').find('img').should('not.exist')
        })
    })

    it('Функция удаления элемента стэка работает корректно', function() {
        cy.get("[type='text']").as('input')
        cy.contains('Добавить').as('addButton')
        cy.contains('Удалить').as('deleteButton')
        
        cy.get("@input").type('5')
        cy.get('@addButton').click()

        cy.get("@input").type('1')
        cy.get('@addButton').click()

        cy.get("@input").type('2')
        cy.get('@addButton').click()

        cy.get('[class^="circle_content"]').should('have.length', 3)
        cy.get('[class^="circle_content"]').then((element) => {
            cy.wrap(element[2]).find('[class*="circle_head"]').should('have.text', 'top')
        })

        cy.get('@deleteButton').click()
        cy.get('@deleteButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.get('[class^="circle_content"]').then((element) => {
            cy.wrap(element[2])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });    
        })

        cy.wait(500)

        cy.get('[class^="circle_content"]').should('have.length', 2)
        cy.get('[class^="circle_content"]').then((element) => {
            cy.wrap(element[1]).find('[class*="circle_head"]').should('have.text', 'top')
        })
        cy.get('@addButton').find('img').should('not.exist')
    });


    it('Кнопка очистки стэка работает корректно', function() {
        cy.get("[type='text']").as('input')
        cy.contains('Добавить').as('addButton')
        cy.contains('Очистить').as('removeButton')
        cy.get('@removeButton').should('have.attr', 'disabled')
        
        cy.get("@input").type('5')
        cy.get('@addButton').click()
        cy.get('@removeButton').should('not.have.attr', 'disabled')

        cy.get("@input").type('1')
        cy.get('@addButton').click()

        cy.get("@input").type('2')
        cy.get('@addButton').click()
        cy.get('[class^="circle_content"]').should('have.length', 3)

        cy.wait(500)
        cy.get('@removeButton').click()
        cy.get('[class^="circle_content"]').should('have.length', 0)
    })
})