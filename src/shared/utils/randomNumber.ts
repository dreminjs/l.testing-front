export const randomNumber = (firstNumber: number, secondNumber: number): number => {
    return Math.floor(Math.random() * (secondNumber - firstNumber + 1)) + firstNumber;
  };
                                        