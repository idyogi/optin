<?php

namespace App\Traits;

use App\Models\JobMonitor;
use Illuminate\Contracts\Bus\Dispatcher;
use Exception;

trait Trackable
{
    public $monitor;
    public $eventAfterDispatched;
    public $eventAfterFinished;

    public function setMonitor(JobMonitor $monitor)
    {
        $this->monitor = $monitor;
    }

    public function afterDispatched($callback)
    {
        $this->eventAfterDispatched = $callback;
    }

    public function afterFinished($callback)
    {
        $this->eventAfterFinished = $callback;
    }
}
