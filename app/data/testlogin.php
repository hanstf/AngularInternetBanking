<?php

header ('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$json = file_get_contents('php://input');
$obj = json_decode($json);

if($obj->userName === 'hans' && $obj->passWord === 'hans'){
    $return = array( 'stat' => 'success');
    $json = json_encode($return);
    echo  $json;
   
}else {
   $return = array( 'stat' => 'fail');
   $json = json_encode($return);
   echo  $json;
}
?>