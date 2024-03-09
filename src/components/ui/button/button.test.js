import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Button } from './button';


afterEach(cleanup);


describe('Тест рендера кнопки', () => {
  it('Рендер кнопки с текстом прошел без ошибок', () => {
    const button = renderer
      .create(<Button text='Текст'/>)
      .toJSON();
      expect(button).toMatchSnapshot();
  });

  it('Рендер кнопки без текста прошел без ошибок', () => {
      const button = renderer
        .create(<Button text='' />)
        .toJSON();
        expect(button).toMatchSnapshot();
  });

  it('Рендер заблокированной кнопки без ошибок', () => {
      const button = renderer
        .create(<Button disabled={true} />)
        .toJSON();
        expect(button).toMatchSnapshot();
  });

  it('Рендер кнопки с индикатором загрузки прошел без ошибок', () => {
      const button = renderer
        .create(<Button isLoader={true} />)
        .toJSON();
        expect(button).toMatchSnapshot();
  });

  it('Колбэк вызывается корректно при нажатии на кнопку', () => {
      const onClick = jest.fn()
      const { getByRole } = render(<Button onClick={onClick} />);

      const button = getByRole('button');
      fireEvent.click(button)
      expect(onClick).toHaveBeenCalled();
  });
})