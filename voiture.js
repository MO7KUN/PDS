document.addEventListener("DOMContentLoaded", getData());
function getData() {
    let carMat = sessionStorage.getItem("matricule")
    let base = 'https://docs.google.com/spreadsheets/d/1z2T9t1Y7RSeHwZwBsgGYGpigoLMxtdpNeNm6w_O_DYQ/gviz/tq?&sheet=voitures';
    let query = encodeURIComponent('Select B,C,D,E,F,G,H,I,J,K,L,M WHERE B="' + carMat + '"');
    let url = base + '&tq=' + query;
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            const data = JSON.parse(rep.substr(47).slice(0, -2));
            document.getElementById("carName").innerHTML = data.table.rows[0].c[1].v;
            document.getElementById("carNameSpan").innerHTML = data.table.rows[0].c[1].v;
            document.getElementById("carNameHeader").innerHTML = data.table.rows[0].c[1].v;
            document.getElementById("carImg").src = data.table.rows[0].c[2].v;
            document.getElementById("matricule").innerHTML = data.table.rows[0].c[0].v;
            document.getElementById("matriculeSpan").innerHTML = data.table.rows[0].c[0].v;
            document.getElementById("carMark").innerHTML = data.table.rows[0].c[3].v;
            document.getElementById("carModel").innerHTML = data.table.rows[0].c[4].v;
            document.getElementById("carCarburant").innerHTML = data.table.rows[0].c[6].v;
            document.getElementById("carStatus").innerHTML = data.table.rows[0].c[9].v;
            document.getElementById("carService").innerHTML = data.table.rows[0].c[7].v;
            document.getElementById("carConversion").innerHTML = data.table.rows[0].c[8].v;
            document.getElementById("totalGaner").innerHTML = data.table.rows[0].c[10].v;
            document.getElementById("nbreJrs").innerHTML = data.table.rows[0].c[11].v;
        });
    getHistorique()
}
function getHistorique() {    
    let base = 'https://docs.google.com/spreadsheets/d/1z2T9t1Y7RSeHwZwBsgGYGpigoLMxtdpNeNm6w_O_DYQ/gviz/tq?&sheet=print';
    let query = encodeURIComponent('Select B,C,D,E,F,G,H,I,J');
    let url = base + '&tq=' + query;
    var Historiquedata = `
                <tr>
                  <th>Nom Prenom</th>
                  <th>Date début</th>
                  <th>Nbre Jours</th>
                  <th>Montant à payer</th>
                  <th>Montant fournis</th>
                  <th>Reste</th>
                  <th>Actions</th>
                </tr>
                
    `
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            let carMat = sessionStorage.getItem("matricule")
            const data = JSON.parse(rep.substr(47).slice(0, -2));
            for (let i = 0; i < data.table.rows.length; i++) {
                if (data.table.rows[i].c[4].v == carMat) {
                    Historiquedata =Historiquedata+ `
                    <tr>
                        <td>${data.table.rows[i].c[0].v}</td>
                        <td>${data.table.rows[i].c[1].f}</td>
                        <td>${data.table.rows[i].c[3].v}</td>
                        <td>${data.table.rows[i].c[5].v}</td>
                        <td>${data.table.rows[i].c[6].v}</td>
                        <td>${data.table.rows[i].c[5].v-data.table.rows[i].c[6].v}</td>
                        <td class="d-flex flex-row align-items-center justify-content-between">
                            <button class="bg-success marg w50">
                                Edit
                            </button>
                            <button class="bg-red w50">
                                Delete
                            </button>
                        </td>
                    </tr>
                    `
                }
            }
        document.getElementById("historique").innerHTML=Historiquedata
        });
}