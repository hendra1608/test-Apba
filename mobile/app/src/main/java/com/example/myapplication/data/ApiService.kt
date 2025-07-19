interface ApiService {
    @POST("/login")
    suspend fun login(@Body credentials: Map<String, String>): Response<LoginResponse>

    @GET("/users")
    suspend fun getUsers(@Header("Authorization") token: String): Response<List<User>>

    @POST("/users")
    suspend fun addUser(@Header("Authorization") token: String, @Body user: User): Response<User>

    @PUT("/users/{id}")
    suspend fun updateUser(@Header("Authorization") token: String, @Path("id") id: String, @Body user: User): Response<User>

    @DELETE("/users/{id}")
    suspend fun deleteUser(@Header("Authorization") token: String, @Path("id") id: String): Response<Unit>
}
