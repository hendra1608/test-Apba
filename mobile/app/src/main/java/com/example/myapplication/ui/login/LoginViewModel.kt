class LoginViewModel(application: Application) : AndroidViewModel(application) {

    val loginResult = MutableLiveData<LoginResult>()

    fun login(username: String, password: String) {
        viewModelScope.launch {
            try {
                val response = ApiClient.apiService.login(mapOf("username" to username, "password" to password))
                if (response.isSuccessful) {
                    val loginResponse = response.body()
                    AuthManager.token = loginResponse?.token
                    loginResult.value = LoginResult(success = true)
                } else {
                    loginResult.value = LoginResult(success = false)
                }
            } catch (e: Exception) {
                loginResult.value = LoginResult(success = false)
            }
        }
    }
}

data class LoginResult(val success: Boolean)
