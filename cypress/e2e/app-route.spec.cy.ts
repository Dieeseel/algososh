/// <reference types="cypress" />

describe('Приложение работает корректно с роутами', function() {
    beforeEach(function() {
      cy.visit('/');
    });
  
    it('По умолчанию открывается стартовая страница', function() {
      cy.contains('МБОУ АЛГОСОШ');
    });
  
    it('Должна открыться страница String', function() {
      cy.get('a[href="/recursion"]').click()
      cy.contains('Строка');
    });

    it('Должна открыться страница Fibonacci', function() {
      cy.get('a[href="/fibonacci"]').click()
      cy.contains('Последовательность Фибоначчи');
    })

    it('Должна открыться страница Sorting', function() {
      cy.get('a[href="/sorting"]').click()
      cy.contains('Сортировка массива');
    })

    it('Должна открыться страница Stack', function() {
      cy.get('a[href="/stack"]').click()
      cy.contains('Стек');
    })

    it('Должна открыться страница Queue', function() {
      cy.get('a[href="/queue"]').click()
      cy.contains('Очередь');
    })

    it('Должна открыться страница List', function() {
      cy.get('a[href="/list"]').click()
      cy.contains('Связный список');
    })
});