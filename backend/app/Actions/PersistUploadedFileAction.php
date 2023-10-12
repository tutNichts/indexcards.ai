<?php

namespace App\Actions;

use App\Models\File;
use Illuminate\Http\UploadedFile;

class PersistUploadedFileAction
{
    public function execute(UploadedFile $file): File
    {
        $file = new File([
            'file_size_in_bytes' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'disk' => config('filesystems.default'),
            'path' => /* wip */ '',
            'file_name' => $file->getClientOriginalName()
        ]);

        $file->save();

        return $file;
    }
}
