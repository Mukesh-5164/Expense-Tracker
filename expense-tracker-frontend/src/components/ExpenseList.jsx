function ExpenseList({ expenses, onDelete, onEdit }) {
    return (
        <div className="expense-list">
            <h3 style={{ marginBottom: '1.5rem', padding: '0 1rem' }}>Recent Expenses</h3>
            {expenses.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No expenses yet. Add one above!</p>
            ) : (
                expenses.map((exp) => (
                    <div key={exp.id} className="expense-item">
                        <div className="expense-info">
                            <span className="expense-title">{exp.title}</span>
                            <span className="expense-category">{exp.category}</span>
                        </div>
                        <div className="expense-actions">
                            <span className="expense-amount">₹{exp.amount}</span>
                            <div className="action-buttons">
                                <button
                                    className="icon-btn edit-btn"
                                    onClick={() => onEdit(exp)}
                                    title="Edit"
                                >
                                    ✎
                                </button>
                                <button
                                    className="icon-btn delete-btn"
                                    onClick={() => onDelete(exp.id)}
                                    title="Delete"
                                >
                                    🗑
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ExpenseList;
