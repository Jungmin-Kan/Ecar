
/*차트에 들어갈 데이터 */
let update_Data = new Array();

$(document).ready(function () {
    $.ajax({
        url: "/excel",
        async: false, 
        type: "get",
        data: {},
        success: function (data) {
            
                var ctx = document.getElementById("myChart");
                var myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ["휘발류", "경유", "LPG", "전기"],
                        responsive: true,
                        datasets: [{
                            label: 'Groups',
                            backgroundColor: [
                                'rgba(255, 51, 0, 0.8)',
                                'rgba(255, 153, 0, 0.8)',
                                'rgba(255, 255, 102, 0.8)',
                                'rgba(0, 204, 0, 0.8)'
                            ],
                            data: [data[0], data[1], data[2], data[3]]
                        }]
                    }
                });
        }
    });
});

