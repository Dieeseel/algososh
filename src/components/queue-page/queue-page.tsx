import React, { useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Queue } from "../../utils/queue";
import { TQueue } from "../../types";
import { TLetter } from "../../types";
import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState(new Queue<TLetter>(7))
  const [inputValue, setInputValue] = useState('')
  const [isAdding, setAdding] = useState(false)
  const [isRemoving, setRemoving] = useState(false)
  const [queueArray, setQueueArray] = useState<TQueue<TLetter>>({
    elements: Array(7).fill(null),
    head: 0,
    tail: 0
  })
  

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  } 

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const enqueueElement = async () => {
    setAdding(true)
    const value = String(inputValue)
    const newLetter: TLetter = {
      letter: value,
      state: ElementStates.Default
    }

    queue.enqueue(newLetter);
    setInputValue('');

    const elements = queue.getElements();
    const array = [...elements.elements]
    const tail = queueArray.tail
    array[tail] = {
      letter: value,
      state: ElementStates.Changing
    }

    setQueueArray({
      elements: array,
      head: elements.head,
      tail: elements.tail
    })
    
    await new Promise(resolve => setTimeout(resolve, 500));
    array[tail] = {
      letter: value,
      state: ElementStates.Default
    }

    setQueueArray({
      elements: array,
      head: elements.head,
      tail: elements.tail
    })
    setAdding(false)
  }

  
  const dequeueElement = async() => {
    setRemoving(true)
    let elements = queue.getElements();
    const array = [...elements.elements]
    const head = queueArray.head
    array[head] = {
      letter: array[head]?.letter,
      state: ElementStates.Changing
    }

    setQueueArray({
      elements: array,
      head: elements.head,
      tail: elements.tail
    });

    await new Promise(resolve => setTimeout(resolve, 500));
    queue.dequeue()
    elements = queue.getElements();
    setQueueArray({
      elements: [...elements.elements],
      head: elements.head,
      tail: elements.tail
    });
    
    setRemoving(false)
  }

  const clearQueue = () => {
    const newQueue = new Queue<TLetter>(7)
    queue.clear()
    setQueueArray({
      elements: Array(7).fill(null),
      tail: 0,
      head: 0
    })
    setQueue(newQueue)
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.main}>
          <form className={styles.form} onSubmit={onSubmit}>
            <Input type="text" 
                  maxLength={4} 
                  extraClass={styles.input} 
                  onChange={onChange} 
                  value={inputValue} 
            />
            <Button text="Добавить" 
                    onClick={() => enqueueElement()}
                    isLoader={isAdding}
                    disabled={inputValue.length > 0 ? false : true} 
            />
            <Button text="Удалить" 
                    onClick={() => dequeueElement()}
                    isLoader={isRemoving}
                    disabled={queue.getLength() > 0 ? false : true} 
                    />
            <Button text="Очистить"
                    extraClass={`ml-35`} 
                    onClick={() => clearQueue()}
                    disabled={queue.getLength() > 0 ? false : true} 
                    
            />
          </form>

          <ul className={styles.output}>
            {
              queueArray.elements.map((item, index) => {
                return <li key={index}>
                         <Circle head={index === queueArray.head && !queue.isEmpty() ? 'head' : ''}
                                 tail={index === queueArray.tail - 1 && !queue.isEmpty()  ? 'tail' : ''} 
                                 letter={item?.letter}
                                 state={item?.state}
                                 />
                       </li>
              })
            }
          </ul>
        </div>
    </SolutionLayout>
  );
};
