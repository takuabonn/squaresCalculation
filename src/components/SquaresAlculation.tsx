import { useCallback, useMemo, useState } from "react";
import { AnswerMas } from "./AnswerMas";
import { useTimer } from "./hooks/useTimer";

export const SquaresAlculation = () => {
  const MAS_LENGTH = 10;
  const headerRow = useMemo(
    () =>
      [...Array(MAS_LENGTH)].map((_, __) => Math.floor(Math.random() * 1001)),
    []
  );
  const headerCol = useMemo(
    () =>
      [...Array(MAS_LENGTH)].map((_, __) => Math.floor(Math.random() * 1001)),
    []
  );

  const correctAnswerList = useMemo(() => {
    const result: number[][] = [];
    for (let i = 0; i < headerCol.length; i++) {
      const correctAnswerOnRowDir: number[] = [];
      for (let j = 0; j < headerRow.length; j++) {
        correctAnswerOnRowDir.push(headerCol[i] + headerRow[j]);
      }
      result.push(correctAnswerOnRowDir);
    }
    return result;
  }, [headerCol, headerRow]);

  const [startTimeCount, stopTimerCount, renderTimer] = useTimer();

  const [answerList, setAnswer] = useState<{ [key: string]: number }>({});

  const setAnswerFunc = useCallback(
    (hcIndex: number, hrIndex: number, answer: number) => {
      const key = `${hcIndex}-${hrIndex}`;
      setAnswer((preAnswerResult) => {
        if (
          Object.keys({ ...preAnswerResult, [key]: answer }).length ===
          MAS_LENGTH * MAS_LENGTH
        ) {
          stopTimerCount();
        }
        return { ...preAnswerResult, [key]: answer };
      });
    },
    [stopTimerCount]
  );

  return (
    <div className="m-auto mt-10 w-3/5 h-96">
      {renderTimer()}
      <table className="table-auto border-collapse border w-full h-full">
        <tbody>
          <tr>
            <th className="w-10 text-white bg-sky-200 border border-slate-300">
              +
            </th>
            {headerRow.map((hi, index) => (
              <th
                className="w-10 text-white bg-sky-200 border border-slate-300"
                key={index}
              >
                {hi}
              </th>
            ))}
          </tr>
          {headerCol.map((hc, hcIndex) => (
            <tr key={hcIndex}>
              <th className="w-10 text-white bg-sky-200 border border-slate-300">
                {hc}
              </th>
              {[...Array(MAS_LENGTH)].map((_, hrIndex) => (
                <td className="w-10 border border-slate-300">
                  <AnswerMas
                    key={hrIndex}
                    hcIndex={hcIndex}
                    hrIndex={hrIndex}
                    setAnswerFunc={setAnswerFunc}
                    correctAnswer={correctAnswerList[hcIndex][hrIndex]}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="text-white bg-sky-200 w-24 mt-5 drop-shadow-md"
        onClick={startTimeCount}
      >
        スタート
      </button>
    </div>
  );
};
