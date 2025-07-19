data class User(
    val kduser: String? = null,
    val username: String,
    val password: String,
    val name: String,
    val hakakses: String,
    val kdklinik: String?,
    val kdcabang: String?
)

data class LoginResponse(
    val message: String,
    val token: String,
    val user: User
)
