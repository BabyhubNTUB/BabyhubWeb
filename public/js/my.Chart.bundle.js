var ctx = document.getElementById("myChart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["4/1", "4/15", "5/1", "5/15"],
        datasets: [{
            label: '身長(公分)',
            data: [40, 46, 48, 52],
            fill: false,
            backgroundColor: 'rgba(133, 167, 217, 1)',
            borderColor: 'rgba(133, 167, 217, 1)'
        }, 
        {
            label: '體重(公斤)',
            data: [3.8, 4.4, 4.9, 5.3],
            fill: false,
            backgroundColor: 'rgba(92, 132, 192, 1)',			
            borderColor: 'rgba(92, 132, 192, 1)'
        }, 
        {
            label: '喝奶量(毫升)',
            data: [300, 350, 350, 400],
            fill: false,
            backgroundColor: 'rgba(61, 104, 167, 1)',			
            borderColor: 'rgba(61, 104, 167, 1)'
        }]
        
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});