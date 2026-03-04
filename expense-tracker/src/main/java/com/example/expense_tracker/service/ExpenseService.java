package com.example.expense_tracker.service;

import com.example.expense_tracker.dto.CategorySummary;
import com.example.expense_tracker.entity.*;
import com.example.expense_tracker.repository.*;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email).orElseThrow();
    }

    public Expense addExpense(Expense expense) {

        User user = getCurrentUser();

        expense.setUser(user);

        return expenseRepository.save(expense);
    }

    public List<Expense> getUserExpenses() {

        User user = getCurrentUser();

        return expenseRepository.findByUserId(user.getId());
    }

    public Double getMonthlyTotal(int month, int year) {

        User user = getCurrentUser();

        return expenseRepository
                .getMonthlyTotal(user.getId(), month, year)
                .orElse(0.0);
    }

    public List<CategorySummary> getCategorySummary() {

        User user = getCurrentUser();

        return expenseRepository.getCategorySummary(user.getId());
    }

    public void deleteExpense(Long id) {
        User user = getCurrentUser();
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this expense");
        }

        expenseRepository.deleteById(id);
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {
        User user = getCurrentUser();
        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!existingExpense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this expense");
        }

        existingExpense.setTitle(updatedExpense.getTitle());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setDate(updatedExpense.getDate());
        existingExpense.setNotes(updatedExpense.getNotes());

        return expenseRepository.save(existingExpense);
    }
}