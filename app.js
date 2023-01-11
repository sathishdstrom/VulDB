d3.csv("vuldb.csv").then(function (data) {
  // console.log(data);

  var vuldb = data;

  var button = d3.select("#button");

  var form = d3.select("#form");

  button.on("click", runEnter);
  form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("")
    d3.selectAll("p").classed('noresults', true).html("")
    d3.event.preventDefault();
    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    // console.log(inputValue.length);
    // console.log(vuldb);
    if (inputValue.length < 6){
      d3.select("p").classed('noresults2', true).html("<center><strong>Please try using more than 5 characters to avoid too many results!</strong>")
      inputValue = "Something to give no results"
    }
    var filteredData = vuldb.filter(vuldb => vuldb.vulnerability.toLowerCase().trim().includes(inputValue));
    // console.log(filteredData.length)
    if (filteredData.length === 0 && inputValue !== "Something to give no results"){
      d3.select("p").classed('noresults', true).html("<center><strong>No results. Please check your spelling!</strong>")
    }
    output = _.sortBy(filteredData, 'vulnerability')

    for (var i = 0; i < filteredData.length; i++) {
      // console.log(output[i]['original_title'])
      // console.log(output[i]['avg_vote'])
      // d3.select("tbody>tr>td").text(output[i]['original_title']);
      d3.select("tbody").insert("tr").attr("class","accordion-item").html("<td>"+[i+1]+"</td>"
									  +"<td class=\"d-flex justify-content-between flex-wrap\">"
									  +"<button class=\"btn btn-primary\" type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#"
									  +[i+1]+"ModalFullscreen\">"+(output[i]['vulnerability'])
									  +"</button>"
									  +"</td>"
									  +"<td>" +(output[i]['category'])+"</td>"
									  +"<td>" +(output[i]['severity'])+"</td>"
									  +"<td>" +(output[i]['database'])+"</td>"
									  +"<td>" +(output[i]['source'])+"</td>"
									  +"<td>"
									  +"<div id=\""+[i+1]+"ModalFullscreen\" class=\"modal fade\" aria-labelledby=\""+[i+1]
									  +"ModalFullscreenLabel\" aria-hidden=\"true\">"
									  +"<div class=\"modal-dialog modal-dialog-centered modal-dialog-scrollable\">"
									  +"<div class=\"modal-content\">"
									  +"<div class=\"modal-header\">"
									  +"<h5 class=\"modal-title h4\" id=\""+[i+1]+"ModalFullscreenLabel\">"+(output[i]['vulnerability'])
									  +"</h5>"+
									  "<button type=\"button\" class=\"btn-close\" data-bs-dismiss="modal" aria-label=\"Close\"></button>"
									  +"</div>"
									  +"<div class=\"modal-body\">"
									  +"<p><em><u><strong>Description:</strong></u></em>"+"<br>"+(output[i]['description'])+"</p>"
	      +"<p><em><u><strong>Impact:</strong></u></em>"+"<br>"+(output[i]['impact'])+"</p>"
	      +"<p><em><u><strong>Likelihood:</strong></u></em>"+"<br>"+(output[i]['likelihood'])+"</p>"
	      +"<p><em><u><strong>Remediation:</strong></u></em>"+"<br>"+(output[i]['remediation'])+"</p>"
	      +"<p><em><u><strong>Reference:</strong></u></em>"+"<br>"+(output[i]['reference'])+"</p>"
	      +"<p><em><u><strong>Severity:</strong></u></em>"+"<br>"+(output[i]['severity'])+"</p>"
	      +"<p><em><u><strong>Rating:</strong></u></em>"+"<br>"+(output[i]['rating'])+"</p>"
	      +"<p><em><u><strong>CVSS:</strong></u></em>"+"<br>"+(output[i]['cvss'])+"</p>"
	      +"<p><em><u><strong>Database:</strong></u></em>"+"<br>"+(output[i]['database'])+"</p>"
	      +"<p><em><u><strong>Source:</strong></u></em>"+"<br>"+(output[i]['source'])+"</p>"
	      +"</div>"
	      +"<div class=\"modal-footer\">"
	      +"<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>"
	      +"</div>"
	      +"</div>"
	      +"</div>"
	      +"</div>"
	      +"</td>")
    }  };
  window.resizeTo(screen.width,screen.height)


});
