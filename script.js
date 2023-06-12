var app = angular.module('app', []);

app.controller('Controller1', function($scope, $timeout){
    var notas = [
        { nota: "mi3",  certa: "mi", errada1: "fa", errada2: "sol"},
        { nota: "fa3",  certa: "fa", errada1: "la", errada2: "si"},
        { nota: "sol3", certa: "sol", errada1: "do", errada2: "mi"},
        { nota: "la3",  certa: "la", errada1: "sol", errada2: "do"},
        { nota: "si3",  certa: "si", errada1: "fa", errada2: "re"},
        { nota: "do4",  certa: "do", errada1: "re", errada2: "mi"},
        { nota: "re4",  certa: "re", errada1: "sol", errada2: "si"},
        { nota: "mi4",  certa: "mi", errada1: "fa", errada2: "sol"},
        { nota: "fa4",  certa: "fa", errada1: "do", errada2: "si"},
    ];

    $scope.acertou = null;
    $scope.minutesLabel = document.getElementById("minutes");
    $scope.secondsLabel = document.getElementById("seconds");
    $scope.milisecondsLabel = document.getElementById("miliseconds");
    $scope.timer = 0;
    var intervaloTempo = null;

    function mostrarNotaRandom() {
        $scope.notaEscolhida = notas[Math.floor(Math.random() * notas.length)];
        const myTimeout = setTimeout(mostrarNotaRandom, 2000);
    }

    function novaRodada(){
        $scope.notaEscolhida = notas[Math.floor(Math.random() * notas.length)];
        // $timeout(novaRodada, 3000);

        $scope.options = [
            $scope.notaEscolhida["certa"],
            $scope.notaEscolhida["errada1"],
            $scope.notaEscolhida["errada2"]
        ];

        $scope.options.sort(() => Math.random() - 0.5);

        var startTime = Date.now();
        intervaloTempo = setInterval(function() {
            var elapsedTime = Date.now() - startTime;
            $scope.timer = (elapsedTime / 1000).toFixed(2)
            document.getElementById("timer").innerHTML = $scope.timer;
        }, 100);
    }

    $scope.validar = function(option){

        clearInterval(intervaloTempo);

        if(option == $scope.notaEscolhida["certa"]){
            $scope.acertou = true;
        }else{
            $scope.acertou = false;
        }

        $timeout(limparResultado, 2000);
        novaRodada();
    }

    function limparResultado(){
        $scope.acertou = null;
        
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

    novaRodada();
});





