import { ElementStates } from '../../types/element-states';
import { cleanup } from '@testing-library/react';
import { 
    selectionSortDesc, 
    selectionSortAsc, 
    bubbleSortAsc, 
    bubbleSortDesc 
} from "../../utils/utils"


afterEach(cleanup);


const emptyArray = []

const inputTestSingleArr = [{ number: 5, state: ElementStates.Default}]
const outputTestSingleArr = [{ number: 5, state: ElementStates.Modified}]

const inputTestArr = [
    { number: 2, state: ElementStates.Default },
    { number: 8, state: ElementStates.Default },
    { number: 3, state: ElementStates.Default },
    { number: 10, state: ElementStates.Default },
    { number: 1, state: ElementStates.Default },
]
const outputTestAscArr = [
    { number: 1, state: ElementStates.Modified },
    { number: 2, state: ElementStates.Modified },
    { number: 3, state: ElementStates.Modified },
    { number: 8, state: ElementStates.Modified },
    { number: 10, state: ElementStates.Modified },
]
const outputTestDescArr = [
    { number: 10, state: ElementStates.Modified },
    { number: 8, state: ElementStates.Modified },
    { number: 3, state: ElementStates.Modified },
    { number: 2, state: ElementStates.Modified },
    { number: 1, state: ElementStates.Modified },
]


describe('Тест корректной сортировки выбором', () => {
    it('Сортировка выбором по убыванию с пустым массивом прошла успешно', async () => {
        expect(await selectionSortDesc(emptyArray, () => {}, () => {})).toEqual(emptyArray)
    })  

    it('Сортировка выбором по возрастанию с пустым массивом прошла успешно', async () => {
        expect(await selectionSortAsc(emptyArray, () => {}, () => {})).toEqual(emptyArray)
    }) 

    it('Сортировка выбором по убыванию массива с одним элементом прошла успешно', async () => {
        expect(await selectionSortDesc(inputTestSingleArr, () => {}, () => {})).toEqual(outputTestSingleArr)
    })

    it('Сортировка выбором по возрастанию массива с одним элементом прошла успешно', async () => {
        expect(await selectionSortAsc(inputTestSingleArr, () => {}, () => {})).toEqual(outputTestSingleArr)
    })

    it('Сортировка выбором по убыванию массива с одним элементом прошла успешно', async () => {
        expect(await selectionSortDesc(inputTestArr, () => {}, () => {})).toEqual(outputTestDescArr)
    }, 5000)

    it('Сортировка выбором по возрастанию массива с одним элементом прошла успешно', async () => {
        expect(await selectionSortAsc(inputTestArr, () => {}, () => {})).toEqual(outputTestAscArr)
    }, 5000)
})


describe('Тест корректной сортировки пузырьком', () => {
    it('Сортировка пузырьком по убыванию с пустым массивом прошла успешно', async () => {
        expect(await bubbleSortDesc(emptyArray, () => {}, () => {})).toEqual(emptyArray)
    })  

    it('Сортировка пузырьком по возрастанию с пустым массивом прошла успешно', async () => {
        expect(await bubbleSortAsc(emptyArray, () => {}, () => {})).toEqual(emptyArray)
    }) 

    it('Сортировка пузырьком по убыванию массива с одним элементом прошла успешно', async () => {
        expect(await bubbleSortDesc(inputTestSingleArr, () => {}, () => {})).toEqual(outputTestSingleArr)
    })

    it('Сортировка пузырьком по возрастанию массива с одним элементом прошла успешно', async () => {
        expect(await bubbleSortAsc(inputTestSingleArr, () => {}, () => {})).toEqual(outputTestSingleArr)
    })

    it('Сортировка пузырьком по убыванию массива с одним элементом прошла успешно', async () => {
        expect(await bubbleSortDesc(inputTestArr, () => {}, () => {})).toEqual(outputTestDescArr)
    }, 5000)

    it('Сортировка пузырьком по возрастанию массива с одним элементом прошла успешно', async () => {
        expect(await bubbleSortAsc(inputTestArr, () => {}, () => {})).toEqual(outputTestAscArr)
    }, 5000)
})