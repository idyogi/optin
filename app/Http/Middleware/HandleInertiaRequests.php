<?php

namespace App\Http\Middleware;

use App\Models\Language;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param \Illuminate\Http\Request $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'locale' => function () {
                return app()->getLocale();
            },
            'auth' => auth()->check() ? ['user' => auth()->user()->toArray()] : null,
            'config' => function () {
                return [
                    'app' => [
                        'name' => config('app.name'),
                        'url' => base_url(),
                        'env' => config('app.env'),
                        'debug' => config('app.debug'),
                    ],
                    'mail' => [
                        'driver' => config('mail.driver'),
                        'host' => config('mail.host'),
                        'port' => config('mail.port'),
                        'from' => config('mail.from'),
                    ],
                    'services' => [
                        'google' => [
                            'maps' => [
                                'key' => config('services.google.maps.key'),
                            ],
                        ],
                    ],
                ];
            },
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'error' => $request->session()->get('error'),
                ];
            },
            'errors' => function () use ($request) {
                return $request->session()->get('errors')
                    ? $request->session()->get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
        ]);
    }
}
