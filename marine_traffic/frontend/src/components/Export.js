const Export = (squares) => {
    if (!squares || squares.length === 0) {
        alert("Нет данных для экспорта.");
        return;
    }

    const headers = [
        "Номер",
        "Коор-ты центра (широта)",
        "Коор-ты центра (долгота)",
        "Выч. значение"
    ];

    const rows = squares.map((square, index) => [
        index+1,
        ((square.bounds[1][0] + square.bounds[0][0]) /2).toFixed(4), 
        ((square.bounds[1][1] + square.bounds[0][1]) /2).toFixed(4),
        (square.safety == -1) ? 0 : square.safety
    ]);

    const csv = [
        headers.join(";"),
        ...rows.map(row => row.join(";"))
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "grid.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export default Export;