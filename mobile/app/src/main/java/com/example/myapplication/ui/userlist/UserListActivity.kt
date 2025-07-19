class UserListActivity : AppCompatActivity() {

    private lateinit var viewModel: UserListViewModel
    private lateinit var adapter: UserListAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user_list)

        val recyclerView = findViewById<RecyclerView>(R.id.userRecyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = UserListAdapter(
            onEdit = { user -> openEditDialog(user) },
            onDelete = { user -> viewModel.deleteUser(user.kduser ?: "") }
        )
        recyclerView.adapter = adapter

        viewModel = ViewModelProvider(this).get(UserListViewModel::class.java)

        viewModel.users.observe(this) { users ->
            adapter.submitList(users)
        }

        viewModel.loadUsers()

        // Logout
        findViewById<Button>(R.id.logoutButton).setOnClickListener {
            AuthManager.token = null
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }

        // Add User
        findViewById<Button>(R.id.addButton).setOnClickListener {
            openAddDialog()
        }
    }

    private fun openAddDialog() {
        val dialog = UserFormDialog()
        dialog.onSave = { user ->
            viewModel.addUser(user)
        }
        dialog.show(supportFragmentManager, "AddUser")
    }

    private fun openEditDialog(user: User) {
        val dialog = UserFormDialog(user)
        dialog.onSave = { updatedUser ->
            viewModel.updateUser(user.kduser ?: "", updatedUser)
        }
        dialog.show(supportFragmentManager, "EditUser")
    }
}
