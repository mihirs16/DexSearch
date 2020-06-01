function searchFunction() {
    query = document.getElementById("search-button").value
    if (query != '') {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var raw = {
            "query": query
        };

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
        };

        fetch("https://dexsearch.azurewebsites.net/search", requestOptions)
        .then(response => response.json())
        .then((result) => {
            // console.log(result);
            showSearchResults(result);
        })
        .catch(error => console.log('error', error));
    }

}

function showSearchResults(result) {
    console.log(result.length);
    var section = document.getElementsByClassName("showcase")[0];
    var clearThis = document.getElementsByClassName("container-fluid p-0")[0];
    clearThis.remove();
    
    var resultArea = document.createElement("div");
    resultArea.className = "container-fluid p-0";
    section.appendChild(resultArea)
    
    alt = false;
    len = (result.length%2==0) ? result.length : result.length-1
    for (i=0;i<len; i=i+2) {

        var row = document.createElement("div");
        row.className = "row no-gutters";


            var column = document.createElement("div");
            column.className = "col-lg-6 order-lg-1 my-0 showcase-text alt";
            column.className = column.className + (alt ? "" : "-one");

            var header = document.createElement("h2");
            var headerText = document.createTextNode(result[i]['title']);
            header.appendChild(headerText);

            var para = document.createElement("p");
            para.className = "lead mb-0"
            var bodyText = document.createTextNode(result[i]['desc']);
            para.appendChild(bodyText);

            var unord = document.createElement("ul");
            unord.className = "mt-3"

            for (j=0; j<result[i]['demo'].length; j++) {
                var ele = document.createElement("li")
                var eleText = document.createTextNode(result[i]['demo'][j])
                ele.appendChild(eleText);
                unord.appendChild(ele);
            }

            column.appendChild(header);
            column.appendChild(para);
            column.appendChild(unord);

        row.appendChild(column);
        console.log(result[i]['title'])

            var column = document.createElement("div");
            column.className = "col-lg-6 order-lg-1 my-0 showcase-text alt";
            column.className = column.className + (alt ? "-one" : "");

            var header = document.createElement("h2");
            var headerText = document.createTextNode(result[i+1]['title']);
            header.appendChild(headerText);

            var para = document.createElement("p");
            para.className = "lead mb-0"
            var bodyText = document.createTextNode(result[i+1]['desc']);
            para.appendChild(bodyText);

            var unord = document.createElement("ul");
            unord.className = "mt-3"

            for (j=0; j<result[i+1]['demo'].length; j++) {
                var ele = document.createElement("li")
                var eleText = document.createTextNode(result[i+1]['demo'][j])
                ele.appendChild(eleText);
                unord.appendChild(ele);
            }

            column.appendChild(header);
            column.appendChild(para);
            column.appendChild(unord);

        row.appendChild(column);
        console.log(result[i+1]['title']);

        resultArea.appendChild(row);
        alt = !alt;
    }

    if (len == result.length-1) {        
    
            var row = document.createElement("div");
            row.className = "row no-gutters";
    
            var column = document.createElement("div");
            column.className = "col-lg-6 order-lg-1 my-0 showcase-text alt";
            column.className = column.className + (alt ? "" : "-one");

            var header = document.createElement("h2");
            var headerText = document.createTextNode(result[i]['title']);
            header.appendChild(headerText);

            var para = document.createElement("p");
            para.className = "lead mb-0"
            var bodyText = document.createTextNode(result[i]['desc']);
            para.appendChild(bodyText);

            var unord = document.createElement("ul");
            unord.className = "mt-3"

            for (j=0; j<result[i]['demo'].length; j++) {
                var ele = document.createElement("li")
                var eleText = document.createTextNode(result[i]['demo'][j])
                ele.appendChild(eleText);
                unord.appendChild(ele);
            }

            column.appendChild(header);
            column.appendChild(para);
            column.appendChild(unord);
    
            row.appendChild(column);
            resultArea.appendChild(row)
    
    }
    
    section.scrollIntoView()
}