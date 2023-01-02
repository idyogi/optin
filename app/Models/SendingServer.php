<?php

namespace App\Models;

use App\Traits\WithUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class SendingServer extends Model
{
    use WithUuid, HasFactory;

    public const DELIVERY_STATUS_SENT = 'sent';
    public const DELIVERY_STATUS_FAILED = 'failed';
    public const TYPE_SELVI_API = 'selvi';
    public const TYPE_STARSENDER_API = 'starsender';
    public const TYPE_DRIPSENDER_API = 'dripsender';
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
    // Supported server types
    public static $serverMapping = array(
        self::TYPE_SELVI_API => 'SendingServerSelvi',
    );

    public function send($message, $phone)
    {
        $url = 'https://api.adminselvi.com/send-message';

        $headers = [
            'api_key' => 'awCnq3n2no7IWCiSYgE3xDbcQKTphd',
        ];
        $data = [
            'sender' => $this->number,
            'number' => '082312225580',
            'message' => $message.' '.$phone,
        ];
        $sent = Http::withOptions(['verify' => false])->asForm()->post($url, $data);
        if ($sent->ok()) {
            //touch the server
            $this->touch();
            return array(
                'status' => self::DELIVERY_STATUS_SENT,
            );

        }
        $body = $sent->json();
        //if body msg is 'Sender is disconnected' then set status to disconnected
        if ($body['msg'] === 'Sender is disconnected') {
        $this->status = self::DELIVERY_STATUS_FAILED;
        $this->save();
        }

        return array(
            'status' => self::DELIVERY_STATUS_FAILED,
        );
    }
    static public function getAllActive()
    {
        return SendingServer::where('status', 'connected')->get();
    }
}