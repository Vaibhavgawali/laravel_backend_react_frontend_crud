<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Auth;
use Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        $users=User::orderByDesc('id')->get();
        return Response(['status'=>true,'users'=>$users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
        ]);
        return Response(['message'=>'User created successfuly'],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::findOrFail($id);
            return response(['message' => "User fetched successfully", 'user' => $user], 200);
        } catch (ModelNotFoundException $e) {
            // Catch the exception and return a custom response for a user not found
            return response(['message' => "User not found"], 404);
        } catch (NotFoundHttpException $e) {
            // If somehow the exception is a NotFoundHttpException, handle it here
            return response(['message' => "User not found"], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator=Validator::make($request->all(),[
            'name' => ['required', 'string', 'max:255'],
            'email' => 'required|email|unique:users,email,'.$id 
        ]);

        if ($validator->fails()) {
            return Response(['errors' => $validator->errors()], 422);
        }

        try {
            $user = User::findOrFail($id);
            $user->update($request->all());
            return Response(['message'=>"User updated successfully"],200);
        } catch (ModelNotFoundException $e) {
            return response(['message' => "User not found"], 404);
        } catch (NotFoundHttpException $e) {
            return response(['message' => "User not found"], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $isDeleted=$user->delete();
            if($isDeleted){
                return Response(['message'=>"User deleted successfully"],200);
            }
            return Response(['message'=>"Something went wrong"],500);
        } catch (ModelNotFoundException $e) {
            return response(['message' => "User not found"], 404);
        } catch (NotFoundHttpException $e) {
            return response(['message' => "User not found"], 404);
        }
 
    }
}
