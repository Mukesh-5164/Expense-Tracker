package com.example.expense_tracker.repository;

import com.example.expense_tracker.dto.CategorySummary;
import com.example.expense_tracker.entity.Expense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense,Long> {

    List<Expense> findByUserId(Long userId);

    @Query("""
        SELECT SUM(e.amount)
        FROM Expense e
        WHERE e.user.id=:userId
        AND MONTH(e.date)=:month
        AND YEAR(e.date)=:year
    """)
    Optional<Double> getMonthlyTotal(Long userId,int month,int year);

    @Query("""
        SELECT new com.example.expense_tracker.dto.CategorySummary(
            e.category,
            SUM(e.amount)
        )
        FROM Expense e
        WHERE e.user.id=:userId
        GROUP BY e.category
    """)
    List<CategorySummary> getCategorySummary(Long userId);
}