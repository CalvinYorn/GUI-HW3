document.getElementById("table-form").addEventListener("submit", function(e) {
    e.preventDefault(); // stop form from refreshing page

    // get values from inputs
    let minRow = parseInt(document.getElementById("minRow").value);
    let maxRow = parseInt(document.getElementById("maxRow").value);
    let minCol = parseInt(document.getElementById("minCol").value);
    let maxCol = parseInt(document.getElementById("maxCol").value);

    // validate
    if (isNaN(minRow) || isNaN(maxRow) || isNaN(minCol) || isNaN(maxCol)) {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").textContent = "Please enter all four numbers.";
        return;
    }
    if (minRow > maxRow || minCol > maxCol) {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").textContent = "Min values must be less than or equal to Max values.";
        return;
    }
    document.getElementById("error-message").style.display = "none";

    // build table HTML
    let tableHtml = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-sm mx-auto w-auto text-center">
                <thead>
                    <tr>
                        <th>x</th>
                        ${Array.from({length: maxCol - minCol + 1}, (_, j) => `<th>${minCol + j}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${Array.from({length: maxRow - minRow + 1}, (_, i) => {
                        let rowNum = minRow + i;
                        return `
                            <tr>
                                <th>${rowNum}</th>
                                ${Array.from({length: maxCol - minCol + 1}, (_, j) => `<td>${rowNum * (minCol + j)}</td>`).join("")}
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        </div>
    `;

    // replace table-container content with new table
    document.getElementById("table-container").innerHTML = tableHtml;
});

