
    /* функция добавления ведущих нулей */
    /* (если число меньше десяти, перед числом добавляем ноль) */
    function zero_first_format(value)
    {
        if (value < 10)
        {
            value='0'+value;
        }
        return value;
    }

    /* функция получения текущей даты и времени */
    function date_time()
    {
        var current_datetime = new Date();
        var day = zero_first_format(current_datetime.getDate());
        var month = zero_first_format(current_datetime.getMonth()+1);
        var year = current_datetime.getFullYear();
        var hours = zero_first_format(current_datetime.getHours());
        var minutes = zero_first_format(current_datetime.getMinutes());
        var seconds = zero_first_format(current_datetime.getSeconds());

        return day+"."+month+"."+year+" | "+hours+":"+minutes+":"+seconds;
    }

    /* выводим текущую дату и время на сайт в блок с id "current_date_time_block" */
    //    document.getElementById('current_date_time_block').innerHTML = date_time();
    setInterval(function () {
        document.getElementById('current_date_time_block').innerHTML = date_time();
    }, 1000);





        var Car = function (x, y) {
            this.x = x;
            this.y = y;    
        };
         
      
//        Car.prototype.draw = function () {
//            var carHtml = '<img src="123.png" width="120" height="120">';
//            this.carElement = $(carHtml);
//            this.carElement.css({
//                position: "absolute",
//                left: this.x,
//                top: this.y
//            
//            });
//           
//            $("body").append(this.carElement);
//            
//        };
        
 
// ------------------------------------------------------------draw------------------------------------       
        Car.prototype.draw = function () {
             
            var img = ['<img src="car2.png">', '<img src="car3.png">', '<img src="car1.png">', '<img  id="car4" src="car4.png">', '<img id="car5" src="car5.png">'];
            function imgRandom(arr) {
                return arr[Math.floor(Math.random() * img.length)];   
             } 
            var a = (imgRandom(img));
            this.carElement = $(a);
            this.carElement.css({
                position: "absolute",
                left: this.x,
                top: this.y
            });
            
            $("body").append(this.carElement);   
           
            };
     
    
        
        
// ------------------------------------------------------------tesla------------------------------------       
        Car.prototype.movePlusTesla = function () {
           
            if (this.x < 1480){
                this.x += 2;
              
                this.carElement.css({
                left: this.x,
                top: this.y    
            });
      
            }else {
                
                var car1 = document.getElementById('p1');
                var count = Number(car1.innerHTML);
                car1.innerHTML = count += 1;
                 this.x = 0;
            }
        };
        
        function goPlusTesla () { setInterval(function() {
            tesla.movePlusTesla();
        }, 10)};
        
        
   
        
        
        
      Car.prototype.moveMinusTesla = function () {
            if (this.x <= 1480){
                this.x -= 2;
             
                this.carElement.css({
                left: this.x,
                top: this.y
                });
        
            }else{
                
                var car1 = document.getElementById('p1');
                var count = Number(car1.innerHTML);
                car1.innerHTML = count += 1;
                this.x = 0; 
            }
         
        };
        
        function goMinusTesla () { setInterval(function() {
            tesla.moveMinusTesla();  
        }, 20)};        
        
        
//        function stopTesla () { clearInterval(function() {
//            tesla.movePlusTesla();
//            
//        });
    
//        function stopTesla () {   
//            $(Car).ready(function(){
//            $(".btnStop").click(function(){
//                location.reload(true);
//            });
//            });      
//        };
        
//        Car.prototype.moveMinusTesla = function () {
//            if (this.x < 1600){ 
//                this.x -= 5;
//                this.carElement.css({
//                left: this.x,
//                top: this.y
//            });
//            }else{
//                car1.innerHTML = count += 1
//                this.x = 0;
//            }
//        };
//        
//          function goMinusTesla () { setInterval(function() {
//            tesla.moveMinusTesla();  
//        }, 10)};
        
// ------------------------------------------------------------Mustang----------------------------------------------------//          
        
        Car.prototype.movePlusMustang = function () {
            if (this.x < 1480){
                this.x += 2;
                this.carElement.css({
                left: this.x,
                top: this.y
            }); 
                
            }else {
               
                var car2 = document.getElementById('p2');
                var count = Number(car2.innerHTML);
                car2.innerHTML = count += 1;
                this.x = 0;    
            }       
        };
        
        function goPlusMustang () { setInterval(function() {
            mustang.movePlusMustang(); 
        }, 10)};
        
        
        
        
        
        Car.prototype.moveMinusMustang = function () {
            if (this.x < 1480){
                this.x -= 2;
                this.carElement.css({
                left: this.x,
                top: this.y
            });
                   
            }else {
                
                var car2 = document.getElementById('p2');
                var count = Number(car2.innerHTML);
                car2.innerHTML = count += 1;
                this.x = 0;
            }     
               
        };
        
        function goMinusMustang () { setInterval(function() {
            mustang.moveMinusMustang();  
        }, 20)};
        



            function stopMustang () {   
            $(document).ready(function(){
            $(".btnStop").click(function(){
                location.reload(true);
            });
            });      
        };


              function stopTesla () {   
            $(document).ready(function(){
            $(".btnStop").click(function(){
                location.reload(true);
            });
            });      
        };
    



        function startGame () {
            goPlusTesla();
            goPlusMustang();
            
        };  
    

      function stopGame () {   
      $(document).ready(function(){
            $("#btnStop").click(function(){
                location.reload(true);
            });
        });      
      };
      
      


        var tesla = new Car(20, 150);
        tesla.draw();

        var mustang = new Car(20, 600);   
        mustang.draw();
