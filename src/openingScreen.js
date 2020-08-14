var myVar = setInterval(myTimer, 5000);
document.getElementById("demo").src ="/images/Listen.gif";

function myTimer() {
    if ( typeof myTimer.counter == 'undefined' ) {
        // It has not... perform the initilization
        myTimer.counter = 0;
    }
    if(myTimer.counter===0){
        document.getElementById("demo").src ="/images/Listen.gif";
        myTimer.counter = 1;
    }else{
        document.getElementById("demo").src ="/images/talk.gif";
        myTimer.counter = 0;

    }

}
