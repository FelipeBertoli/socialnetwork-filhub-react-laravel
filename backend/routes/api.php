<?php

use App\Http\Controllers\{
    Course\FollowCourseController,
    Course\GetCourseController,
    Course\UnfollowCourseController,
    Course\VerifyFollowedCourseController,
    User\AuthController,
    User\CreateUserController,
    User\DeleteUserController,
    User\GetUserController,
    User\UpdateUserController,
    Relationship\GetUsersController,
    Relationship\RemoveFollowerController,
    Relationship\VerifyRelationshipController,
    Relationship\FollowUserController,
    Relationship\UnfollowUserController,
    Post\CreatePostController,
    Post\GetPostController,
    Post\UpdatePostController,
    Post\DeletePostController,
    PostLike\GetPostLikesController,
    PostLike\LikePostController,
    PostLike\UnlikePostController,
    PostComment\DeleteCommentController,
    PostComment\GetCommentController,
    PostComment\SetCommentController,
    PostFavorite\FavoritePostController,
    PostFavorite\UnfavoritePostController,
    CommentLike\GetCommentLikesController,
    CommentLike\LikeCommentController,
    CommentLike\UnlikeCommentController,
    CommentReply\GetReplyController,
    CommentReply\DeleteReplyController,
    CommentReply\SetReplyController
};

use App\Models\Course;
use Illuminate\Support\Facades\Route;

// Rotas protegidas
Route::group(['middleware' => ['auth:sanctum']], function () {

    // Rotas de Usu  rio
    Route::prefix('user')->group(function () {
        Route::get('/load', [GetUserController::class, 'getUser']);
        Route::get('/getUserById/{id}', [GetUserController::class, 'getUserById']);
        Route::put('/updateProfile', [UpdateUserController::class, 'updateProfile']);
        Route::post('/sendNewEmail', [UpdateUserController::class, 'sendNewEmail']);
        Route::put('/updatePassword', [UpdateUserController::class, 'updatePassword']);
        Route::put('/deleteUser', [DeleteUserController::class, 'deleteUser']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    // Rotas de Relacionamento
    Route::prefix('relationship')->group(function () {
        Route::get('/getFollowers', [GetUsersController::class, 'getFollowers']);
        Route::get('/getFollowed', [GetUsersController::class, 'getFollowed']);
        Route::get('/getFollowedCount', [GetUsersController::class, 'getFollowedCount']);
        Route::get('/getFollowersCount', [GetUsersController::class, 'getFollowersCount']);
        Route::get('/getSuggestUsers', [GetUsersController::class, 'getSuggestUsers']);
        Route::get('/getPendentFollowers', [GetUsersController::class, 'getPendentFollowers']);
        Route::get('/searchUsers', [GetUsersController::class, 'searchUsers']);
        Route::post('/verifyFollowership', [VerifyRelationshipController::class, 'verifyFollowership']);
        Route::post('/followUser', [FollowUserController::class, 'followUser']);
        Route::post('/unfollowUser', [UnfollowUserController::class, 'unfollowUser']);
        Route::post('/removeFollower', [RemoveFollowerController::class, 'removeFollower']);
    });

    // Rotas de Postagens
    Route::prefix('post')->group(function () {
        Route::get('/getProfilePosts', [GetPostController::class, 'getProfilePosts']);
        Route::get('/getTimeLinePosts', [GetPostController::class, 'getTimeLinePosts']);
        Route::get('/getCoursePosts', [GetPostController::class, 'getCoursePosts']);
        Route::get('/getFavoritePosts', [GetPostController::class, 'getFavoritePosts']);
        Route::post('/create', [CreatePostController::class, 'createPost']);
        Route::put('/update', [UpdatePostController::class, 'updatePost']);
        Route::post('/delete', [DeletePostController::class, 'deletePost']);
    });

    // Rotas de Cursos
    Route::prefix('course')->group(function () {
        Route::post('/verifyFollowed', [VerifyFollowedCourseController::class, 'verifyFollowedCourse']);
        Route::post('/follow', [FollowCourseController::class, 'followCourse']);
        Route::post('/unfollow', [UnfollowCourseController::class, 'unfollowCourse']);
        Route::post('/getFollowingCourses', [GetCourseController::class, 'getFollowingCourses']);
    });

    // Rotas de Curtidas de Publica    es
    Route::prefix('/postLike')->group(function () {
        Route::get('/getCount', [GetPostLikesController::class, 'getLikesCount']);
        Route::post('/set', [LikePostController::class, 'likePost']);
        Route::post('/unset', [UnlikePostController::class, 'unlikePost']);
    });

    // Rotas de Publicações Favoritas
    Route::prefix('/postFavorite')->group(function () {
        Route::post('/set', [FavoritePostController::class, 'favoritePost']);
        Route::post('/unset', [UnfavoritePostController::class, 'unfavoritePost']);
    });


    // Rotas de Coment  rios
    Route::prefix('/postComment')->group(function () {
        Route::get('/getPostComments', [GetCommentController::class, 'getPostComments']);
        Route::get('/getCommentsCount', [GetCommentController::class, 'getCommentsCount']);
        Route::post('/set', [SetCommentController::class, 'setComment']);
        Route::post('/delete', [DeleteCommentController::class, 'deleteComment']);
    });

    // Rotas de Curtidas de Coment  rios
    Route::prefix('/commentLike')->group(function () {
        Route::get('/getCount', [GetCommentLikesController::class, 'getLikesCount']);
        Route::post('/set', [LikeCommentController::class, 'likeComment']);
        Route::post('/unset', [UnlikeCommentController::class, 'unlikeComment']);
    });

    // Rotas de Respostas de Coment  rios
    Route::prefix('/commentReply')->group(function () {
        Route::get('/getCommentReplies', [GetReplyController::class, 'getReplies']);
        Route::post('/set', [SetReplyController::class, 'setReply']);
        Route::post('/delete', [DeleteReplyController::class, 'deleteReply']);
    });
});

// Rotas públicas
Route::prefix('user')->group(function () {
    Route::post('/register', [CreateUserController::class, 'registerUser']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/activate/{id}', [CreateUserController::class, 'activateUser'])->name('user.activate');
    Route::post('/sendNewPassword', [UpdateUserController::class, 'sendNewPassword']);
    Route::get('/changeEmail/{id}/{email}', [UpdateUserController::class, 'changeEmail'])->name('user.changeEmail');
    Route::get('/changePassword/{id}/{password}', [UpdateUserController::class, 'changePassword'])->name('user.changePassword');
});

// Rotas de Cursos Públicas
Route::get('/getCourses', function () {
    return Course::all();
});


