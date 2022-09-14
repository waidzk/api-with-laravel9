<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kosan;
use App\Http\Resources\KosanResource;
use Validator;

class KosanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $allKosan = Kosan::with("place")->paginate(); 
        $KosanResources = KosanResource::collection($allKosan);

        return $this->sendResponse($KosanResources, "Successfully get all kosan");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $input = $request->all();

        $validator =  Validator::make($input, [
            "name" => "required|min:4",
            "description" => "required|min:10|max:300",
            "price" => "required"
        ]);

        if($validator->fails()){
            return $this->sendError("Validation Error", $validator->errors());
        };

        $kosan = Kosan::create($input);
        $findKosan = Kosan::with("place")->find($kosan->id);

        return $this->sendResponse(new KosanResource($findKosan), "New kosan created successfully");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $kosan = Kosan::with("place")->find($id);

        return $this->sendResponse(new KosanResource($kosan), "Book get successfully");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator =  Validator::make($input, [
            "name" => "required|min:4",
            "description" => "required|min:10|max:300",
            "price" => "required"
        ]);

        if($validator->fails()){
            return $this->sendError("Validation Error", $validator->errors());
        };

        $kosan = Kosan::find($id);

        $kosan->name = $input["name"];
        $kosan->description = $input["description"];
        $kosan->place_id = $input["place_id"];
        $kosan->price = $input["price"];
        $kosan->save();

        $findKosan = Kosan::with("place")->find($kosan->id);

        return $this->sendResponse(new KosanResource($findKosan), "Kosan updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $kosan = Kosan::find($id);

        $kosan->delete();

        return $this->sendResponse([], "Kosan deleted successfully");
    }
}
