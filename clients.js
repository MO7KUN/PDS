document.addEventListener("DOMContentLoaded", loaddata(''))
function loaddata(condition) {
    const base = 'https://docs.google.com/spreadsheets/d/1z2T9t1Y7RSeHwZwBsgGYGpigoLMxtdpNeNm6w_O_DYQ/gviz/tq?&sheet=client';
    const query = encodeURIComponent('Select C,D,E ' + condition + '');
    const url = base + '&tq=' + query;
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            const data = JSON.parse(rep.substr(47).slice(0, -2));
            console.log(data.table)
            var clients = ``
            for (let i = 0; i < data.table.rows.length; i++) {
                clients = clients + `
                    <div class="card col-3 text-center border border-1 column">
                        <div class="card-body">
                            <h4 class="card-title font-weight-bold text-black-50">${data.table.rows[i].c[0].v}</h4>
                            <h5 class="card-subtitle text-success">${data.table.rows[i].c[1].v}</h5>
                            <p class="card-text">
                                ${data.table.rows[i].c[2].v}
                            </p>
                            <a href="tel:${data.table.rows[i].c[1].v}" class="btn btn-secondary">Contacter le client</a>
                        </div>
                    </div>
                    `
            }
            document.getElementById("clients").innerHTML = clients
        });
}
function salama() {
    var clientName = document.getElementById("srchClient").value
    if (clientName.length > 0) {
        loaddata('WHERE C LIKE"%' + clientName + '%" ');
    } else {
        loaddata('');
    }
}
