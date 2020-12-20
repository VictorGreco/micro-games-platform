export const parseMsToTimeString = (time: number) => {
    const miliseconds = time % 1000;
    time = (time - miliseconds) / 1000;
    const seconds = time % 60;
    time = (time - seconds) / 60;
    const minutes = time % 60;
    const hours = (time - minutes) / 60;

    return `${hours !== 0 ? hours + 'hours' : ' '} ${minutes !== 0 ? minutes + 'minutes' : ' '} ${seconds} seconds`;
}