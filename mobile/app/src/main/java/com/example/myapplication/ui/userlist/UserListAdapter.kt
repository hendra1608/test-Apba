class UserListAdapter(
    private val onEdit: (User) -> Unit,
    private val onDelete: (User) -> Unit
) : RecyclerView.Adapter<UserListAdapter.UserViewHolder>() {

    private var userList: List<User> = listOf()

    fun submitList(users: List<User>) {
        userList = users
        notifyDataSetChanged()
    }

    class UserViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val username = itemView.findViewById<TextView>(R.id.usernameText)
        val name = itemView.findViewById<TextView>(R.id.nameText)
        val editBtn = itemView.findViewById<Button>(R.id.editButton)
        val deleteBtn = itemView.findViewById<Button>(R.id.deleteButton)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_user, parent, false)
        return UserViewHolder(view)
    }

    override fun getItemCount(): Int = userList.size

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        val user = userList[position]
        holder.username.text = user.username
        holder.name.text = user.name
        holder.editBtn.setOnClickListener { onEdit(user) }
        holder.deleteBtn.setOnClickListener { onDelete(user) }
    }
}
