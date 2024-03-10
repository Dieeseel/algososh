import renderer from 'react-test-renderer';
import { ElementStates } from '../../types/element-states';
import { reverseText } from '../../utils/utils';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);


describe('Тест корректного разворачивания строки', () => {
    it('Строка с чётным количеством символов разворачивается корректно', async () => {
        const inputTestArr = [
            { letter: 'a', state: ElementStates.Default },
            { letter: 'b', state: ElementStates.Default },
            { letter: 'c', state: ElementStates.Default },
            { letter: 'd', state: ElementStates.Default },
            { letter: 'e', state: ElementStates.Default },
            { letter: 'f', state: ElementStates.Default },
            { letter: 'g', state: ElementStates.Default },
            { letter: 'h', state: ElementStates.Default },
        ]

        const outputTestArr = [
            { letter: 'h', state: ElementStates.Modified },
            { letter: 'g', state: ElementStates.Modified },
            { letter: 'f', state: ElementStates.Modified },
            { letter: 'e', state: ElementStates.Modified },
            { letter: 'd', state: ElementStates.Modified },
            { letter: 'c', state: ElementStates.Modified },
            { letter: 'b', state: ElementStates.Modified },
            { letter: 'a', state: ElementStates.Modified },
        ]

        expect(await reverseText(inputTestArr, () => {}, () => {})).toEqual(outputTestArr)
    })

    it('Строка с нечетным количеством символов разворачивается корректно', async () => {
        const inputTestArr = [
            { letter: '1', state: ElementStates.Default },
            { letter: '2', state: ElementStates.Default },
            { letter: '3', state: ElementStates.Default },
            { letter: '4', state: ElementStates.Default },
            { letter: '5', state: ElementStates.Default },
        ]

        const outputTestArr = [
            { letter: '5', state: ElementStates.Modified },
            { letter: '4', state: ElementStates.Modified },
            { letter: '3', state: ElementStates.Modified },
            { letter: '2', state: ElementStates.Modified },
            { letter: '1', state: ElementStates.Modified },
        ]

        expect(await reverseText(inputTestArr, () => {}, () => {})).toEqual(outputTestArr)
    })

    it('Строка с одним символом разворачивается корректно', async () => {
        const inputTestArr = [
            { letter: 's', state: ElementStates.Default },
        ]

        const outputTestArr = [
            { letter: 's', state: ElementStates.Modified },
        ]

        expect(await reverseText(inputTestArr, () => {}, () => {})).toEqual(outputTestArr)
    })

    it('Пустая строка разворачивается корректно', async () => {
        const inputTestArr = []

        const outputTestArr = []

        expect(await reverseText(inputTestArr, () => {}, () => {})).toEqual(outputTestArr)
    })
})

