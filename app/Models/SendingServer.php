<?php

namespace App\Models;

use App\Traits\WithUuid;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class SendingServer extends Model
{
    use WithUuid, HasFactory;

    public const DEVICE_STATUS_DISCONNECTED = 'disconnected';
    public const DEVICE_STATUS_CONNECTED = 'connected';
    protected $table = 'sending_servers';
    protected $fillable = [
        'name',
        'uuid',
        'number',
        'type',
        'webhook_url',
        'api_key',
        'status',
    ];

    public function send($message, $phone): array
    {
        $url = 'https://api.adminselvi.com/send-message';
//phone remove +
        $phone = str_replace('+', '', $phone);
        $data = [
            'api_key' => "awCnq3n2no7IWCiSYgE3xDbcQKTphd",
            'sender' => $this->number,
            'number' => $phone,
            'message' => $message,
        ];
        $sent = Http::withOptions(['verify' => false])->asForm()->post($url, $data);
        if ($sent->ok()) {
            //touch the server
            $this->touch();

            if ($sent) {
                return array(
                    'status' => 'sent',
                );
            }

            throw new Exception('Unknown Whatsapp error');

        }
        $body = $sent->json();
        //if body msg is 'Sender is disconnected' then set status to disconnected
        if ($body['msg'] === 'Sender is disconnected') {
            $this->status = self::DEVICE_STATUS_DISCONNECTED;
            $this->save();
        }

        return array(
            'status' => self::DEVICE_STATUS_DISCONNECTED,
        );
    }

    public static function getAllActive()
    {
        return self::where('status', 'connected')->get();
    }
}