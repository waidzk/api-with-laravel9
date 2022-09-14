<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Place;
use App\Http\Resources\PlaceResource;


class PlaceController extends Controller
{
    public function index() {
        $places = Place::all(); 
        $PlaceResources = PlaceResource::collection($places);

        return $this->sendResponse($PlaceResources, "Successfully get places");
    }
}
