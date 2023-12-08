"use strict";
// Перебор всех возможных комбинаций неизвестных чисел
// const c = 50;

// export default function brutForce(set, sum, diam) {
//   for (let i = 0; i <= c; i++) {
//     for (let j = 0; j <= c; j++) {
//       for (let k = 0; k <= c; k++) {
//         for (let l = 0; l <= c; l++) {
//           for (let m = 0; m <= c; m++) {
//             if (
//               i * set[0] + j * set[1] + k * set[2] + l * set[3] + m * set[4] ===
//               sum
//             ) {
//               return [
//                 [
//                   [diam[0], i, i * set[0]],
//                   [diam[1], j, j * set[1]],
//                   [diam[2], k, k * set[2]],
//                   [diam[3], l, l * set[3]],
//                   [diam[4], m, m * set[4]],
//                 ],
//                 i * set[0] + j * set[1] + k * set[2] + l * set[3] + m * set[4],
//               ];
//             }
//           }
//         }
//       }
//     }
//   }
//   return null;
// }

const c = 47;

export default function brutForce(set, sum, diam) {
  function recursiveSearch(index, currentValues) {
    if (index === set.length) {
      // Достигли конечного уровня вложенности, проверяем условие
      const total = currentValues.reduce(
        (acc, value, idx) => acc + value * set[idx],
        0
      );
      if (total === sum) {
        const result = diam.map((d, idx) => [
          d,
          currentValues[idx],
          currentValues[idx] * set[idx],
        ]);
        return [result, total];
      }
      return null;
    }

    // Рекурсивный вызов для следующего уровня
    for (let i = 0; i <= c; i++) {
      const updatedValues = [...currentValues, i];
      const found = recursiveSearch(index + 1, updatedValues);
      if (found) {
        return found;
      }
    }

    return null;
  }

  // Начинаем с индекса 0 и пустого массива currentValues
  return recursiveSearch(0, []);
}
