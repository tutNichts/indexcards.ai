<?php

namespace app\Http\Controllers\Api;

use App\Actions\CreateIndexCardSetAction;
use App\Actions\PersistUploadedFileAction;
use App\Http\Requests\SubmitIndexCardSetRequest;
use Illuminate\Http\JsonResponse;

class IndexCardSetController
{
    public function __construct(
        private readonly CreateIndexCardSetAction $createIndexCardSetAction,
        private PersistUploadedFileAction         $persistUploadedFileAction
    )
    {
    }

    public function submit(SubmitIndexCardSetRequest $request): JsonResponse
    {
        $this->persistUploadedFileAction->execute($request->file);
        $indexSet $this->createIndexCardSetAction->execute();
    }
}
