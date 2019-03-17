<?php

namespace App\Http\Middleware;

use Closure;
use App\Profile;

class ProfileNotCreated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
      $id = $request->user()->id;
      if (Profile::find($id)) {
        return redirect('dashboard');
      }
        return $next($request);
    }
}
