//require('isomorphic-fetch');



function formatDate(f) {
    var d = Date.parse(f);
    if (!isNaN(d)) {
        return new Date(d).toISOString().substring(0, 10)
    }
    throw new Error('not a date')
}
fetch('http://data.coderbunker.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: `
        {
            allOrganizations {
            edges {
              node {
                orgname
                since
                activity
                peopleCount
                projectCount
                totalGross
                lastRefresh
                lastUpdate
                totalEngMonths
                ongoingProjectCount
              }
            }
          }
        }
        ` }),
})
    .then(res => {
        return res.json().then(o => {
            console.log(o);
            Object.keys(o.data.allOrganizations.edges[0].node).map(k => {
                // console.log("K -->", k);
                // var holder;
                // try {
                //     holder = document.getElementById(k)
                //     console.log(holder);
                //     holder.innerHTML = o.data.allOrganizations.edges[0].node[k]
                // } catch (e) {
                //     console.log('ignoring ' + k)
                //     return;
                // }
            });
            const data = o.data.allOrganizations.edges[0].node

            const totalGrossBilled = document.getElementById('total-billed');
            const freelancersBillableHours = document.getElementById("fbh");
            const projectsOngoing = document.getElementById("number-ongoing top-number");
            const totalEngMonths = document.getElementById('tem');
            const totProjBillHours = document.getElementById("tpbh");
            const years = document.getElementById('years');
            const time = document.getElementById('time');
            const title = document.getElementById('cb-sh');
            const dayDataLastUpdated = document.getElementById("dlu-day");
            const dateDataLastUpdated = document.getElementById("dlu-date");
            const since = document.getElementById("since");
            const firstBillableHour = document.getElementById("fbhro");

            console.log(data.since.substring(0, 10));
            console.log(data.lastRefresh);
            console.log(data.lastUpdate);
            

            title.innerText = data.orgname;
            totalGrossBilled.innerText = data.totalGross;
            freelancersBillableHours.innerText = data.peopleCount;
            projectsOngoing.innerText = data.ongoingProjectCount;
            totalEngMonths.innerText = data.totalEngMonths;
            totProjBillHours.innerText = data.projectCount;
            years.innerText = data.activity.substr(0, 21);
            time.innerText = data.activity.substr(21);
            since.innerText = data.since.substring(8, 10);
            firstBillableHour.innerText = data.since.substring(0, 10);
            dayDataLastUpdated.innerText = data.lastUpdate.substring(8, 10);
            dateDataLastUpdated.innerText = data.lastUpdate.substring(0, 10);
            // ['lastUpdate', 'since'].map(i => {
            //     const e2 = document.getElementById(i)
            //     e2.innerText = formatDate(e2.innerText);
            // })
        });
    })
    .then(res => console.log(res.data))
    .catch(e => console.log(e));