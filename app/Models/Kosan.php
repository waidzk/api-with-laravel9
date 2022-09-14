<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kosan extends Model
{
    use HasFactory;

    protected $table = "kosan";

    protected $fillable = ["name", "description", "price", "image", "place_id"];

    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
