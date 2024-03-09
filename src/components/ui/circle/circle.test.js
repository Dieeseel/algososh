import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { cleanup } from '@testing-library/react';
import { Circle } from './circle';


afterEach(cleanup);


describe('Тест рендера компонента Circle', () => {
  it('Рендер компонента Circle без буквы прошел без ошибок', () => {
    const circle = renderer
      .create(<Circle letter='' />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle с буквами прошел без ошибок', () => {
      const circle = renderer
        .create(<Circle letter='abc' />)
        .toJSON();
        expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle с head прошел без ошибок', () => {
      const circle = renderer
        .create(<Circle head='head' />)
        .toJSON();
        expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle с react-элементом в head; прошел без ошибок', () => {
      const circle = renderer
        .create(<Circle head={<Circle letter='a' isSmall={true} />} />)
        .toJSON();
        expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle с tail прошел без ошибок', () => {
    const circle = renderer
      .create(<Circle tail='tail' />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle с react-элементом в tail; прошел без ошибок', () => {
    const circle = renderer
      .create(<Circle tail={<Circle letter='a' isSmall={true} />} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle с index прошел без ошибок', () => {
    const circle = renderer
      .create(<Circle index={1} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle с пропcом isSmall === true прошел без ошибок', () => {
    const circle = renderer
      .create(<Circle isSmall={true} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle в состоянии default прошел без ошибок', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle в состоянии changing прошел без ошибок', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });

  it('Рендер компонента Circle в состоянии modified прошел без ошибок', () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
      expect(circle).toMatchSnapshot();
  });
})