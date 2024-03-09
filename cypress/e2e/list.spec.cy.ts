/// <reference types="cypress" />


describe('Функционал страницы List работает корректно', function() {
    beforeEach(function() {
        cy.visit('/list');
    });

    it('Кнопки добавления отключены при пустом инпуте', function() {
        if (cy.get("#add").should('have.value', '')) {
            cy.contains('Добавить в head').should('have.attr', 'disabled');
            cy.contains('Добавить в tail').should('have.attr', 'disabled');
        }

        if (cy.get("#addByIndex").should('have.value', '') && cy.get("#add").should('have.value', '')) {
            cy.contains('Добавить по индексу').should('have.attr', 'disabled');
            cy.contains('Удалить по индексу').should('have.attr', 'disabled');
        }
    })

    it('Список генерируется корректно', function() {
        cy.get('[class*="circle_content"]').as('circles')

        cy.get('@circles').then((elements) => {
            length = elements.length
        })
        cy.get('@circles').each((element, index) => {
            if (index === 0) {
                cy.wrap(element).find('[class*="circle_head"]').should('have.text', 'head')
            }
            if (index === length - 1) {
                cy.wrap(element).find('[class*="circle_tail"]').should('have.text', 'tail')
            }
            cy.wrap(element).find('[class*="circle_index"]').should('have.text', index)
        })
    })

    it('Добавление элемента в head работает корректно', function() {
        cy.get("#add").as('input')
        cy.contains('Добавить в head').as('addButton')
        cy.get('[class*="listItem"]').as('circles')

        cy.get('@input').type('5')
        cy.get('@addButton').click()
        cy.get('@addButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.contains('Добавить в tail').should('have.attr', 'disabled');
        cy.contains('Удалить из head').should('have.attr', 'disabled');
        cy.contains('Удалить из tail').should('have.attr', 'disabled');

        cy.get('@circles').then((elements) => {
            cy.wrap(elements[0]).find('[class*="circle_small"]').contains('5')
            cy.wrap(elements[0])
                .find('[class*="circle_small"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
        })

        cy.wait(600)

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[0]).find('[class*="circle_head"]').should('have.text', 'head')
            cy.wrap(elements[0]).find('[class*="circle_circle"]').contains('5')
            cy.wrap(elements[0])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_modified');
                });
        })

        cy.wait(600)

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[0])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_default');
                });
        })
        cy.get('@addButton').find('img').should('not.exist')
    })


    it('Добавление элемента в tail работает корректно', function() {
        cy.get("#add").as('input')
        cy.contains('Добавить в tail').as('addButton')
        cy.get('[class*="listItem"]').as('circles')

        cy.get('@input').type('5')
        cy.get('@addButton').click()
        cy.get('@addButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.contains('Добавить в head').should('have.attr', 'disabled');
        cy.contains('Удалить из head').should('have.attr', 'disabled');
        cy.contains('Удалить из tail').should('have.attr', 'disabled');

        cy.get('@circles').then((elements) => {
            cy.wrap(elements).last().find('[class*="circle_small"]').contains('5')
            cy.wrap(elements)
                .last()
                .find('[class*="circle_small"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
        })

        cy.wait(600)

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements).last().find('[class*="circle_circle"]').contains('5')  
            cy.wrap(elements)
                .last()
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_modified');
                });
        })

        cy.wait(600)

        cy.get('[class*="listItem"]').then((elements) => { 
            cy.wrap(elements)
                .last()
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_default');
                });
        })
        cy.get('@addButton').find('img').should('not.exist')
    })


    it('Добавление элемента по индексу работает корректно', function() {
        cy.get("#add").as('addInput')
        cy.get("#addByIndex").as('indexInput')
        cy.contains('Добавить по индексу').as('addButton')

        cy.get('@addInput').type('5')
        cy.get('@indexInput').type('1')
        cy.get('@addButton').click()

        cy.get('@addButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.contains('Добавить в tail').should('have.attr', 'disabled');
        cy.contains('Добавить в head').should('have.attr', 'disabled');
        cy.contains('Удалить из head').should('have.attr', 'disabled');
        cy.contains('Удалить из tail').should('have.attr', 'disabled');
        cy.contains('Удалить по индексу').should('have.attr', 'disabled');

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[0]).find('[class*="circle_small"]').contains('5')
            cy.wrap(elements[0])
                .find('[class*="circle_small"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });

            cy.wait(600)
            
            cy.wrap(elements[1]).find('[class*="circle_small"]').contains('5')
            cy.wrap(elements[0])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
            cy.wrap(elements[1])
                .find('[class*="circle_small"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
        })

        cy.wait(600)

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[1]).find('[class*="circle_circle"]').contains('5')
            cy.wrap(elements[1])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_modified');
                });
        })
        cy.get('@addButton').find('img').should('not.exist')
        cy.contains('Удалить из head').should('not.have.attr', 'disabled');
        cy.contains('Удалить из tail').should('not.have.attr', 'disabled');
    })


    it('Удаление элемента из head работает корректно', function() {
        let deleteNumber = ''
        let nextNumber = ''
        cy.contains('Удалить из head').as('deleteButton')
        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[0])
                .find('[class*="circle_circle"]')
                .invoke('text').then(text => {
                    deleteNumber = text; 
                })

            cy.wrap(elements[1])
                .find('[class*="circle_circle"]')
                .invoke('text').then(text => {
                    nextNumber = text; 
                })
        })
        cy.get('@deleteButton').click()

        cy.get('@deleteButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.contains('Удалить из tail').should('have.attr', 'disabled');

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[0]).find('[class*="circle_circle"]').should('not.have.text')
            cy.wrap(elements[0]).find('[class*="circle_small"]').contains(deleteNumber)
            cy.wrap(elements[0])
                .find('[class*="circle_small"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
        })

        cy.wait(600)

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[0]).find('[class*="circle_circle"]').contains(nextNumber)
            cy.wrap(elements[0]).find('[class*="circle_head"]').should('have.text', 'head')
        })
    })


    it('Удаление элемента из tail работает корректно', function() {
        let length = 0
        let deleteNumber = ''
        let prependNumber = ''
        cy.contains('Удалить из tail').as('deleteButton')
        cy.get('[class*="listItem"]').then((elements) => {
            length = elements.length
        })
        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[length - 1])
                .find('[class*="circle_circle"]')
                .invoke('text').then(text => {
                    deleteNumber = text; 
                })

            cy.wrap(elements[length - 2])
                .find('[class*="circle_circle"]')
                .invoke('text').then(text => {
                    prependNumber = text; 
                })
        })

        cy.get('@deleteButton').click()
        cy.get('@deleteButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.contains('Удалить из head').should('have.attr', 'disabled');

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[length - 1]).find('[class*="circle_circle"]').should('not.have.text')
            cy.wrap(elements[length - 1]).find('[class*="circle_small"]').contains(deleteNumber)
            cy.wrap(elements[length - 1])
                .find('[class*="circle_small"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
        })

        cy.wait(600)

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[length - 2]).find('[class*="circle_circle"]').contains(prependNumber)
            cy.wrap(elements[length - 2]).find('[class*="circle_tail"]').should('have.text', 'tail')
        }) 
    })


    it('Удаление элемента по индексу работает корректно', function() {
        let deleteNumber = ''
        let nextNumber = ''
        cy.get("#addByIndex").as('indexInput')
        cy.contains('Удалить по индексу').as('removeButton')
        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[1])
                .find('[class*="circle_circle"]')
                .invoke('text').then(text => {
                    deleteNumber = text; 
                })
            
            cy.wrap(elements[2])
                .find('[class*="circle_circle"]')
                .invoke('text').then(text => {
                    nextNumber = text; 
                })
        })

        cy.get('@indexInput').type('1')
        cy.get('@removeButton').click()

        cy.get('@removeButton').find('img').should('have.attr', 'alt', 'Загрузка.')
        cy.contains('Добавить в tail').should('have.attr', 'disabled');
        cy.contains('Добавить в head').should('have.attr', 'disabled');
        cy.contains('Удалить из head').should('have.attr', 'disabled');
        cy.contains('Удалить из tail').should('have.attr', 'disabled');
        cy.contains('Добавить по индексу').should('have.attr', 'disabled');

        cy.get('[class*="listItem"]').then((elements) => {
            cy.wrap(elements[0])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });

            cy.wait(600)

            cy.wrap(elements[1])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_changing');
                });
            
            cy.wait(600)

            cy.wrap(elements[1]).find('[class*="circle_circle"]').should('not.have.text')
            cy.wrap(elements[1])
                .find('[class*="circle_circle"]')
                .invoke('attr', 'class')
                .then(classAttribute => {
                    expect(classAttribute).to.contain('circle_default');
                });
            cy.wrap(elements[1]).find('[class*="circle_small"]').contains(deleteNumber)

            cy.wait(600)

            cy.wrap(elements[1]).find('[class*="circle_circle"]').contains(nextNumber)
        })
        cy.get('@removeButton').find('img').should('not.exist')
        cy.contains('Удалить из head').should('not.have.attr', 'disabled');
        cy.contains('Удалить из tail').should('not.have.attr', 'disabled');
    })
})