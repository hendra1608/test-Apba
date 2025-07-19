package com.example.app.ui.userform

import android.app.Dialog
import android.os.Bundle
import android.view.LayoutInflater
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.DialogFragment
import com.example.app.databinding.DialogUserFormBinding
import com.example.app.model.User

class UserFormDialog(private val user: User? = null) : DialogFragment() {

    var onSave: ((User) -> Unit)? = null

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val binding = DialogUserFormBinding.inflate(LayoutInflater.from(context))

        if (user != null) {
            binding.usernameInput.setText(user.username)
            binding.passwordInput.setText(user.password)
            binding.nameInput.setText(user.name)
            binding.hakAksesInput.setText(user.hakakses)
            binding.kdKlinikInput.setText(user.kdklinik)
            binding.kdCabangInput.setText(user.kdcabang)
        }

        return AlertDialog.Builder(requireContext())
            .setTitle(if (user == null) "Add User" else "Edit User")
            .setView(binding.root)
            .setPositiveButton(if (user == null) "Save" else "Update") { _, _ ->
                val username = binding.usernameInput.text.toString()
                val password = binding.passwordInput.text.toString()
                val name = binding.nameInput.text.toString()
                val hakakses = binding.hakAksesInput.text.toString()
                val kdklinik = binding.kdKlinikInput.text.toString()
                val kdcabang = binding.kdCabangInput.text.toString()

                if (username.isBlank() || password.isBlank()) {
                    Toast.makeText(context, "Username & Password wajib diisi", Toast.LENGTH_SHORT).show()
                    return@setPositiveButton
                }

                val newUser = User(
                    kduser = user?.kduser,
                    username = username,
                    password = password,
                    name = name,
                    hakakses = hakakses,
                    kdklinik = kdklinik,
                    kdcabang = kdcabang
                )
                onSave?.invoke(newUser)
            }
            .setNegativeButton("Cancel", null)
            .create()
    }
}
