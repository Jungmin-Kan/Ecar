
/*차트에 들어갈 데이터 */
let update_Data = new Array();
/*차트 x축 크기 */

// 서버에 파싱한 데이터를 요청하여 불러와 차트에 렌더링할 데이터를 삽입한다.
$(document).ready(function () {
    $.ajax({
        url: "/excel",
        async: false, // ★★★ 반드시 써줘야 바로 차트가 생성된다.(동기처리로 순차적으로 함수가 수행되게끔 해야함.)
        type: "get", //get post둘중하나
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
                                // https://www.chartjs.org/docs/latest/configuration/animations.html
                                // https://www.w3schools.com/colors/colors_picker.asp
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

