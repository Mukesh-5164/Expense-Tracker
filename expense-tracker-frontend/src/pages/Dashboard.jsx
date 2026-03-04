import { useEffect, useState } from "react";
import API from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
    const navigate = useNavigate();

    const fetchExpenses = async () => {
        try {
            const response = await API.get("/expenses");
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            try {
                await API.delete(`/expenses/${id}`);
                fetchExpenses();
            } catch (error) {
                console.error("Error deleting expense", error);
                alert("Failed to delete expense");
            }
        }
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div className="container">
            <div className="dashboard-header">
                <div>
                    <h1>My Expenses</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your daily spending</p>
                </div>
                <button className="secondary" style={{ width: 'auto' }} onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                }}>
                    Logout
                </button>
            </div>

            <div className="card">
                <h3>{editingExpense ? "Edit Expense" : "Add New Expense"}</h3>
                <ExpenseForm
                    refresh={fetchExpenses}
                    editData={editingExpense}
                    onCancel={() => setEditingExpense(null)}
                />
            </div>

            <div className="card" style={{ padding: '1rem 0' }}>
                <ExpenseList
                    expenses={expenses}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </div>
        </div>
    );
}

export default Dashboard;
