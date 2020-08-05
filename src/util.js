export const sortData = (data) => {
    const sorteData = [...data];

    sorteData.sort((a,b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sorteData;
}