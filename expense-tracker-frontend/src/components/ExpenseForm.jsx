import { useState, useEffect } from "react";
import API from "../services/api";

function ExpenseForm({ refresh, editData, onCancel }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("General");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setTitle(editData.title);
            setAmount(editData.amount);
            setCategory(editData.category || "General");
        } else {
            setTitle("");
            setAmount("");
            setCategory("General");
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const expenseData = {
            title,
            amount: parseFloat(amount),
            category,
            date: editData ? editData.date : new Date().toISOString().split("T")[0],
        };

        try {
            if (editData) {
                await API.put(`/expenses/${editData.id}`, expenseData);
                onCancel();
            } else {
                await API.post("/expenses", expenseData);
            }
            refresh();
            setTitle("");
            setAmount("");
            setCategory("General");
        } catch (error) {
            console.error("Failed to save expense", error);
            alert("Error saving expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <div className="form-group-row">
                <div className="form-group flex-2">
                    <label>Title</label>
                    <input
                        placeholder="e.g., Netflix Subscription"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group flex-1">
                    <label>Amount (₹)</label>
                    <input
                        placeholder="0.00"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="1"
                        step="0.01"
                    />
                </div>
                <div className="form-group flex-1">
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="custom-select"
                    >
                        <option value="General">General</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>
                </div>
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : (editData ? "Update Expense" : "Add Expense")}
                </button>
                {editData && (
                    <button type="button" className="secondary" onClick={onCancel} style={{ marginTop: 0 }}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default ExpenseForm;
