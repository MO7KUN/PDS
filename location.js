document.addEventListener("DOMContentLoaded",loaddata())
function loaddata() {
const base = 'https://docs.google.com/spreadsheets/d/1z2T9t1Y7RSeHwZwBsgGYGpigoLMxtdpNeNm6w_O_DYQ/gviz/tq?&sheet=print';
        const query = encodeURIComponent('Select A,B,C,D,E,F,G,H,I,J');
        const url = base + '&tq=' + query;
            fetch(url)
            .then(res => res.text())
            .then(rep =>{
                const data = JSON.parse(rep.substr(47).slice(0,-2));                
                console.log(data.table)
                var loactions =`
                    <tr>
                    <th>#</th>
                    <th>CIN</th>
                    <th>Nom Prenom</th>
                    <th>Date Debut</th>
                    <th>Date Fin</th>
                    <th>nbr Jour</th>
                    <th>Matricule voiture</th>
                    <th>Voiture</th>
                    <th>Montant à payer</th>
                    <th>Montant Fournis</th>
                    <th>Reste</th>
                    </tr>            
                `
                for (let i = 0; i < data.table.rows.length; i++) {
                    loactions=loactions+`
                        <tr>
                        <td>${i+1}</td>
                        <td>${data.table.rows[i].c[0].v}</td>
                        <td>${data.table.rows[i].c[1].v}</td>
                        <td>${data.table.rows[i].c[2].f}</td>
                        <td>${data.table.rows[i].c[3].f}</td>
                        <td>${data.table.rows[i].c[4].v}</td>
                        <td>${data.table.rows[i].c[5].v}</td>
                        <td>${data.table.rows[i].c[8].v}</td>
                        <td>${data.table.rows[i].c[6].v}</td>
                        <td>${data.table.rows[i].c[7].v}</td>
                        <td>${data.table.rows[i].c[6].v-data.table.rows[i].c[7].v}</td>
                        </tr>
                    `
                }
                document.getElementById("locations").innerHTML=loactions
            });
        }