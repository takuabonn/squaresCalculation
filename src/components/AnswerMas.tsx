import { memo, useCallback, useState } from "react";

type AnswerMasProp = {
  hcIndex: number;
  hrIndex: number;
  setAnswerFunc: (hcIndex: number, hrIndex: number, answer: number) => void;
  correctAnswer: number;
};
export const AnswerMas = memo(
  ({ hcIndex, hrIndex, setAnswerFunc, correctAnswer }: AnswerMasProp) => {
    const [isCorrect, setCorrect] = useState("");
    const [isReadOnly, setReadOnly] = useState(false);

    const answerFunc = useCallback(
      (value: any) => {
        if (Number(value) !== correctAnswer) {
          setCorrect("bg-red-100");
        } else {
          setCorrect("");
          setReadOnly(true);
          setAnswerFunc(hcIndex, hrIndex, Number(value));
        }
      },
      [correctAnswer, hrIndex, hcIndex, setAnswerFunc]
    );

    return (
      <>
        <input
          readOnly={isReadOnly}
          type="number"
          className={`w-full text-center ${isCorrect}`}
          onChange={(e) => answerFunc(e.target.value)}
        />
      </>
    );
  }
);
