package com.example.expense_tracker.controller;

import com.example.expense_tracker.dto.CategorySummary;
import com.example.expense_tracker.entity.Expense;
import com.example.expense_tracker.service.ExpenseService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    @GetMapping
    public List<Expense> getExpenses() {
        return expenseService.getUserExpenses();
    }

    @GetMapping("/monthly-total")
    public Double monthlyTotal(
            @RequestParam int month,
            @RequestParam int year) {

        return expenseService.getMonthlyTotal(month, year);
    }

    @GetMapping("/category-summary")
    public List<CategorySummary> categorySummary() {
        return expenseService.getCategorySummary();
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }
}