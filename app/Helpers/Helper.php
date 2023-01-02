<?php
function base_url(): string
{
    $secure_connection = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on';
    $protocol = $secure_connection ? 'https://' : 'http://';
//    $protocol = 'https://';
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

/**
 * Join filesystem path strings.
 *
 * @param * parts of the path
 *
 * @return string a full path
 */
function join_paths()
{
    $paths = array();
    foreach (func_get_args() as $arg) {
        if (preg_match('/http:\/\//i', $arg)) {
            throw new \Exception('Path contains http://! Use `join_url` instead. Error for '.implode('/', func_get_args()));
        }

        if ($arg !== '') {
            $paths[] = $arg;
        }
    }

    return preg_replace('#/+#', '/', implode('/', $paths));
}