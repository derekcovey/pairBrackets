let brackets = [
    {open: '(', close: ')'},
    {open: '{', close: '}'},
    {open: '[', close: ']'}
]

const returnBracketPair = () => {
    if (getRandom(3) === 1) {
        return `${brackets[0].open}${brackets[0].close}`
    } else if(getRandom(4) !== 1 && getRandom(4) === 2){
        return `${brackets[1].open}${brackets[1].close}`
    } else {
        return `${brackets[2].open}${brackets[2].close}`
    }
}

const getRandom = (max) => {
    return Math.floor((Math.random() * max) +1)
}


let output = '';

const generateString = (n) => {
    if(output.length > n * 2 - 1) return output;

    if(output.length <= 0){
        output += returnBracketPair();
        return generateString(n);
    } else  {
        output = output.split('');
        output.splice(getRandom(output.length), 0, returnBracketPair());
        output = output.join('');
        return generateString(n)
    }
}




const checkString = (string) => {
    if (string === '') {
        return true;
    } else {
        let temp = string.split('');
        for (let i = 0; i < temp.length - 1; i++) {
            for (let bracket of brackets) {
                if (temp[i] === bracket.open) {
                    if (temp[i + 1] === bracket.close) {
                        temp.splice(i, 2);
                    } else {
                        for (let bracket2 of brackets) {
                            if (temp[i + 1] === bracket2.close) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        temp = temp.join('');
        return checkString(temp);
    }
}

for (let i = 0; i < 50; i++) {
    output = '';
    let huy = generateString(20);
    console.log(huy,'   ', checkString(huy));
    i++;
}