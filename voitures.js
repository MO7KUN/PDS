document.addEventListener("DOMContentLoaded", loaddata('ORDER BY "Total ganer" DESC'))
function loaddata(condition) {
  const base = 'https://docs.google.com/spreadsheets/d/1z2T9t1Y7RSeHwZwBsgGYGpigoLMxtdpNeNm6w_O_DYQ/gviz/tq?&sheet=voitures';
  const query = encodeURIComponent('Select A,B,C,D,E,F,G,H,I,J,K,L,M  '+condition+' ');
  const url = base + '&tq=' + query;
  fetch(url)
    .then(res => res.text())
    .then(rep => {
      const data = JSON.parse(rep.substr(47).slice(0, -2));
      console.log(data.table)
      var cars = ``
      for (let i = 0; i < data.table.rows.length; i++) {
        cars = cars + `
                    <div class="card col-3 text-center border border-1 column">
                      <img class="card-img-top" src="${data.table.rows[i].c[3].v}" alt="Photo du voiture">
                      <div class="card-body">
                        <h5 class="card-subtitle text-success">${data.table.rows[i].c[11].v}</h5>
                        <h4 class="card-title font-weight-bold text-black-50">${data.table.rows[i].c[1].v}</h4>
                        <p class="card-text">
                            ${data.table.rows[i].c[2].v}
                        </p>
                        <a href="Voiture.html" class="btn btn-secondary" onclick="SaveMat('${data.table.rows[i].c[1].v}')">Voire la voiture</a>
                      </div>
                    </div>`
      }
      document.getElementById("cars").innerHTML = cars
    });
}

