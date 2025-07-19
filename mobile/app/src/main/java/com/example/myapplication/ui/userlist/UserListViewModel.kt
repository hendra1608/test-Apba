class UserListViewModel : ViewModel() {

    val users = MutableLiveData<List<User>>()

    fun loadUsers() {
        viewModelScope.launch {
            try {
                val response = ApiClient.apiService.getUsers("Bearer ${AuthManager.token}")
                if (response.isSuccessful) {
                    users.value = response.body()
                } else {
                    Log.e("API", "Failed to load users")
                }
            } catch (e: Exception) {
                Log.e("API", "Error: ${e.localizedMessage}")
            }
        }
    }

    fun addUser(user: User) {
        viewModelScope.launch {
            try {
                val response = ApiClient.apiService.addUser("Bearer ${AuthManager.token}", user)
                if (response.isSuccessful) {
                    loadUsers()
                }
            } catch (e: Exception) {
                Log.e("API", "Add Error: ${e.localizedMessage}")
            }
        }
    }

    fun updateUser(id: String, user: User) {
        viewModelScope.launch {
            try {
                val response = ApiClient.apiService.updateUser("Bearer ${AuthManager.token}", id, user)
                if (response.isSuccessful) {
                    loadUsers()
                }
            } catch (e: Exception) {
                Log.e("API", "Update Error: ${e.localizedMessage}")
            }
        }
    }

    fun deleteUser(id: String) {
        viewModelScope.launch {
            try {
                val response = ApiClient.apiService.deleteUser("Bearer ${AuthManager.token}", id)
                if (response.isSuccessful) {
                    loadUsers()
                }
            } catch (e: Exception) {
                Log.e("API", "Delete Error: ${e.localizedMessage}")
            }
        }
    }
}
