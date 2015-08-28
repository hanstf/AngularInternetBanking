<?php

header ('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');



if(1==1){
    $return = array ('userName' => 'hans');
    return json_encode($return);   
}
?>