export type FixedSizeArray<N extends number, T, M extends string = '0'> = {
    readonly [k in M]: any;
} & { length: N } & ReadonlyArray<T>;

export const parseMsToTimeString = (time: number) => {
    const miliseconds = time % 1000;
    time = (time - miliseconds) / 1000;
    const seconds = time % 60;
    time = (time - seconds) / 60;
    const minutes = time % 60;
    const hours = (time - minutes) / 60;

    return `${hours !== 0 ? hours + 'hours' : ' '} ${minutes !== 0 ? minutes + 'minutes' : ' '} ${seconds} seconds`;
}

export const shuffleArray = (array: any[any]) => {
    let currentIndex: number = array.length,
        temporaryValue: any,
        randomIndex: number;
    
    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}