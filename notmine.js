const getPairBracket = (pair) => {

  const pairList = [
    {
      open: '(',
      close: ')'
    },
    {
      open: '[',
      close: ']'
    },
    {
      open: '{',
      close: '}'
    }
  ];

  const getPairIndex = () => Math.floor(Math.random() * (pairList.length));
  const random = (min, max) => Math.floor(min + Math.random() * (max + 1));
  const addStringBetween = (what, where) => where.slice(0, where.length/2) + what + where.slice(where.length/2);

  let listBrackets = [];
  let depthPairList = [];
  // Случайная вложенность
  let depth = pair > 1 ? Math.floor(Math.random() * (pair + 1)) : 0;

  // Генерим список скобочных пар:
  /*for (let count = 0, index = 0; count < pair; ++count, ++index) {
    if (index === pairList.length) {
      index = 0;
    }
    listBrackets.push(pairList[index].open + pairList[index].close);
  }*/
  for (let count = 0; count < pair; ++count) {
    let rnd = getPairIndex();
    listBrackets.push(pairList[rnd].open + pairList[rnd].close);
  }

  if (depth !== 0) {
    let rnd;

    for (let i = 0; i < depth; ++i) {
      rnd = random(0, listBrackets.length - 1);
      depthPairList.push(listBrackets.splice(rnd, 1)[0]);
    }

    if (listBrackets.length !== 0) {
      rnd = random(0, listBrackets.length - 1);

      for (let i = 0; i < depthPairList.length; ++i) {
        //listBrackets[rnd] = listBrackets[rnd].slice(0, listBrackets[rnd].length/2) + depthPairList[i] + listBrackets[rnd].slice(listBrackets[rnd].length/2);
        listBrackets[rnd] = addStringBetween(depthPairList[i], listBrackets[rnd]);
      }
    } else {
      depthPairList.reduce((prev, pair) => addStringBetween(pair, prev), '');
    }
  }
  return listBrackets.join('');
};

const checkBracketPair = (string) => {
  let stringAsArray = [...string];
  let stackBracket = [];
  for (let bracket of stringAsArray) {
    if ('([{'.includes(bracket)) {
      stackBracket.push(bracket);
    } else if (')]}'.includes(bracket)) {
      if (stackBracket.length === 0) {
        return false;
      }
      let openBracket = stackBracket.pop();
      if (openBracket === '(' && bracket === ')') {
        continue;
      } else if (openBracket === '[' && bracket === ']') {
        continue;
      } else if (openBracket === '{' && bracket === '}') {
        continue;
      } else {
        return false;
      }
    }
  }
  return stackBracket.length === 0;
};

/*
function generateParens(remaining) {
  const set = [];
  if (remaining === 0) {
    set.push("");
  } else {
    let prev = generateParens(remaining - 1);
    for (let str of prev) {
      for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === '(') {
          let s = insertInside(str, i);
          if (!set.includes(s)) {
            set.push(s);
          }
        }
      }
      if (!set.includes("()" + str)) {
        set.push("()" + str);
      }
    }
  }
  return set;
}
function insertInside(str, leftIndex) {
  let left = str.substring(0, leftIndex + 1);
  let right = str.substring(leftIndex + 1, str.length);
  return left + "()" + right;
}
*/

/*
if (depth === 0) {
  return listBrackets.map((bracket) => bracket.open + bracket.close).join('');
} else if (depth === pair) {
  for (let i = 0; i < depth; i++) {
    stack.push(listBrackets[i].open);
  }
  for (let i = depth - 1; i >= 0; i--) {
    stack.push(listBrackets[i].close);
  }
  return stack.join('');
} else {
  result += stack.join('');
  for (let i = Math.floor(stack.length / 2); i < pair - depth; ++i) {
    result += listBrackets[i].open + listBrackets[i].close;
  }
}
// Для вставки вложенности
// str.slice(0, str.length/2) + '{}' + str.slice(str.length/2);
const brackets = (result = '', openBracket = 0, closeBracket = 0, depth = 0) => {
  if (openBracket + closeBracket === 2 * depth) {
    return result;
  }
  if (openBracket < depth) {
    return brackets(result += '(', openBracket += 1, closeBracket, depth);
  }
  if (closeBracket < openBracket) {
    return brackets(result += ')', openBracket, closeBracket += 1, depth);
  }
};
const depthPair = (depth, openBracket, closeBracket) => {
  const brackets = (result = '', openBracket = 0, closeBracket = 0) => {
    if (openBracket + closeBracket === 2 * depth) {
      return result;
    }
    if (openBracket < depth) {
      return brackets(result += '(', openBracket += 1, closeBracket);
    }
    if (closeBracket < openBracket) {
      return brackets(result += ')', openBracket, closeBracket += 1);
    }
  };
  return brackets();
};
*/