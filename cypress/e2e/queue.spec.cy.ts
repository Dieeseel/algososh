/// <reference types="cypress" />


describe('Функционал страницы Queue работает корректно', function() {
    beforeEach(function() {
        cy.visit('/queue');
    });

    it('Кнопка запуска отключена при пустом инпуте', function() {
        if (cy.get("[type='text']").should('have.value', '')) {
            cy.contains('Добавить').should('have.attr', 'disabled');
        }
        cy.get("[type='text']").type('5');
        cy.contains('Добавить').should('not.have.attr', 'disabled');
    });

    it('Функция добавления элемента в очередь работает корректно', function() {
        cy.get("[type='text']").as('input')
        cy.get('[class*="circle_content"]').as('circles')
        cy.contains('Добавить').as('addButton')

        cy.get('@circles').should('have.length', 7)

        cy.get("@input").type('5')
        cy.get('@addButton').click()
        cy.get('@addButton').find('img').should('have.attr', 'alt', 'Загрузка.')

        cy.get('@circles').then((element) => {
            cy.wrap(element[0]).find('[class*="circle_head"]').should('have.text', 'head')
            cy.wrap(element[0]).find('[class*="circle_tail"]').should('have.text', 'tail')
            cy.wrap(element[0]).find('[class*="circle_circle"]').contains('5')

            cy.wrap(element[0])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
            
            cy.wait(500)

            cy.wrap(element[0])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_default');
                });
            cy.get('@addButton').find('img').should('not.exist')
        })

        cy.get("@input").type('2')
        cy.get('@addButton').click()
        cy.get('@addButton').find('img').should('have.attr', 'alt', 'Загрузка.')

        cy.get('@circles').then((element) => {
            cy.wrap(element[0]).find('[class*="circle_head"]').should('have.text', 'head')
            cy.wrap(element[1]).find('[class*="circle_tail"]').should('have.text', 'tail')
            cy.wrap(element[0]).find('[class*="circle_circle"]').contains('5')
            cy.wrap(element[1]).find('[class*="circle_circle"]').contains('2')

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

    it('Функция удаления элемента очереди работает корректно', function() {
        cy.get("[type='text']").as('input')
        cy.get('[class^="circle_content"]').as('circles')
        cy.contains('Добавить').as('addButton')
        cy.contains('Удалить').as('deleteButton')

        cy.get('@circles').should('have.length', 7)

        cy.get("@input").type('5')
        cy.get('@addButton').click()
        cy.get("@input").type('2')
        cy.get('@addButton').click()
        cy.get("@input").type('1')
        cy.get('@addButton').click()


        cy.get('@deleteButton').click()
        cy.get('@deleteButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.get('@circles').then((element) => {
            cy.wrap(element[0])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
        })

        cy.wait(500)

        cy.get('@circles').then((element) => {
            cy.wrap(element[1]).find('[class*="circle_head"]').should('have.text', 'head')
            cy.wrap(element[2]).find('[class*="circle_tail"]').should('have.text', 'tail')
        })
        cy.get('@addButton').find('img').should('not.exist')


        cy.get('@deleteButton').click()
        cy.get('@deleteButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.get('@circles').then((element) => {
            cy.wrap(element[1])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
        })

        cy.wait(500)

        cy.get('@circles').then((element) => {
            cy.wrap(element[2]).find('[class*="circle_head"]').should('have.text', 'head')
            cy.wrap(element[2]).find('[class*="circle_tail"]').should('have.text', 'tail')
        })
        cy.get('@addButton').find('img').should('not.exist')
    });

    it('Кнопка очистки стэка работает корректно', function() {
        cy.get("[type='text']").as('input')
        cy.get('[class^="circle_content"]').as('circles')
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

        cy.wait(500)
        cy.get('@removeButton').click()
        cy.get('@circles').each((element) => {
            cy.wrap(element).find('p').should('not.have.text');
            cy.wrap(element).find('[class*="circle_head"]').should('not.have.text')
            cy.wrap(element).find('[class*="circle_tail"]').should('not.have.text')
        })
    })
})
