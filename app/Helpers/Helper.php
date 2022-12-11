<?php
function base_url(): string
{
    $protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']), 'https') === FALSE ? 'http://' : 'https://';
    return $protocol . $_SERVER['HTTP_HOST'];
}

function host_url(): string
{
    return strtoupper($_SERVER['HTTP_HOST']);
}
// Located in app/helpers.php
function translations($json)
{
    if(!file_exists($json)) {
        return [];
    }
    return json_decode(file_get_contents($json), true);
}
