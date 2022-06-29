export const filterGraphData = (graphData: Record<string, any>) => {
    let filteredData : Record<string, any>[] = [];

    graphData.list.forEach((item) => {
        const date = new Date(item.dt_txt);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();

        const timeString = `${hour}:00`;
        const dateString = `${day}-${month}-${year}`;
        const temperature = item.main.temp / 10;

        filteredData.push(
            {
                time: timeString,
                date: dateString,
                temperature: temperature.toFixed(0),
            }
        );
    });

    // console.log(filteredData);

    return filteredData;
}

export default filterGraphData;