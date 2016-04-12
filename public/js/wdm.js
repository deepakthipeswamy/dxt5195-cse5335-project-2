var my_delay = 500;
var count = 0;
var t;
var table;
var randomColor;
var newRow;

$(document).ready(function() {
    $('#myButton').on('click', function(event) {
        event.preventDefault();
		$('#dynamictable').append('<table id="myTable" border="1" style="width:100%;background: skyblue"></table>');
        table = $('#dynamictable').children();
    	table.append('<tr id=0 align="center"><th>Rank</th><th>Country</th><th>Population</th></tr>');
        callAjax(table)
        $('#myButton').hide();

    });
});

function callAjax(table){
    if(count<=100){
        count = count+1;
        t = setTimeout(function(){callAjax(table);}, my_delay );
    	$.ajax({
                    url: "https://dxt5195-cse5335-project-2.herokuapp.com/db",
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: {
                    	ranking:count
                    },
                    success: function(data) {
        				$.each(data, function(i, info) {
                            newRow = '<tr id='+info.ranking+' align="cent-er"><td>' + info.ranking + '</td><td>' + info.country + '</td><td>' + info.population + '</td></tr>';
                        });
                        
                    },
                });

        randomColor = Math.floor(Math.random()*16777215).toString(16);
        table.append(newRow);
        $('#'+(count-1))[0].bgColor = randomColor;
        $('#'+(count-1)).hide();

        if($('#myTable').children().children().length > 21){
            $('#myTable tr').eq(1).fadeOut(1000);
            $('#myTable tr').eq(1).hide();
            $('#myTable tr').eq(1).remove();
        } 
        $('#'+(count-1)).fadeIn(2000);
        
    } else{
        clearTimeout(t);
        return;
    }
}