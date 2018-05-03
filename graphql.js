//require('isomorphic-fetch');
        function formatDate(f) {
            var d = Date.parse(f);
            if (!isNaN(d)) {
                return new Date(d).toISOString().substring(0, 10)
            }
            throw new Error('not a date')
        }
        fetch('/graphql', {
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
                        var holder;
                        try {
                            holder = document.getElementById(k)
                            holder.innerText = o.data.allOrganizations.edges[0].node[k]
                        } catch (e) {
                            console.log('ignoring ' + k)
                            return;
                        }
                    });
                    const e = document.getElementById('totalGross')
                    e.innerText = 'RMB' + e.innerText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                    ['lastUpdate', 'since'].map(i => {
                        const e2 = document.getElementById(i)
                        e2.innerText = formatDate(e2.innerText);
                    })
                });
            })
            .then(res => console.log(res.data))
            .catch(e => console.log(e));